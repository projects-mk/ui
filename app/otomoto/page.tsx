"use client";
import React, { useState, useEffect } from 'react';
import { Tabs, Stack, Button, Text, Space, Select, Notification, TextInput } from '@mantine/core';
import axios from 'axios';
import Description from './description';
async function fetchData(url: string): Promise<[boolean, any]> {
  try {
    const response = await axios.get(url);
    return [false, response.data];
  } catch (error) {
    console.error('Error fetching data:', error);
    return [true, {}];
  }
}

function createLabel(value: string): string {
  let upper = value.charAt(0).toUpperCase() + value.slice(1)
  return upper.split('_').join(' ');
}

export default function Home() {
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [data, setData] = useState<any>(null);
  const [dynamicSelectData, setDynamicSelectData] = useState<any>(null);
  const [selectedValues, setSelectedValues] = useState<{ [key: string]: string }>({});
  const [inputValues, setInputValues] = useState({
    rok_produkcji: '',
    przebieg: '',
    pojemnosc_skokowa: '',
    spalanie_w_miescie: '',
    moc: '',
    liczba_drzwi: '',
    liczba_miejsc: ''
  });
  const [predictionResponse, setPredictionResponse] = useState<number | null>(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const [errorOccurred, responseData] = await fetchData('http://10.147.18.236:40071/api/v1/otomoto/');
      if (errorOccurred) {
        setNotificationVisible(true);
        setTimeout(() => setNotificationVisible(false), 3000); // Hide after 3 seconds
      } else {
        setData(responseData);
      }
    };

    fetchDataAsync();
  }, []);

  const handleSelectChange = async (value: string, key: string) => {
    setSelectedValues((prevValues) => ({ ...prevValues, [key]: value }));
    const remaining_data = `http://10.147.18.236:40071/api/v1/otomoto/${value}`;
    const [errorOccurred, responseData] = await fetchData(remaining_data);
    if (errorOccurred) {
      setNotificationVisible(true);
      setTimeout(() => setNotificationVisible(false), 3000); // Hide after 3 seconds
    } else {
      setDynamicSelectData(responseData.response);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async () => {
    const requestBody = { ...selectedValues, ...inputValues };
    try {
      const response = await axios.post('http://10.147.18.236:40071/api/v1/otomoto/predict', requestBody);
      console.log('Prediction response:', response.data);
      setPredictionResponse(response.data.response);
    } catch (error) {
      console.error('Error sending prediction request:', error);
      setNotificationVisible(true);
      setTimeout(() => setNotificationVisible(false), 3000); // Hide after 3 seconds
    }
  };

  return (
    <>
      <Tabs defaultValue="description">
      <Tabs.List>
        <Tabs.Tab value="description">
          Description
        </Tabs.Tab>
        <Tabs.Tab value="implementation">
          Implementation
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="description">
        <Description />
      </Tabs.Panel>

      <Tabs.Panel value="implementation">
      <Stack
        h="auto"
        bg="var(--mantine-color-body)"
        align="center"
        justify="flex-start"
        gap="sm"
        style={{ width: '100%', marginTop: '10px', padding: '10px' }}
      >
        <Select
          label="Producent"
          key="marka"
          placeholder="Pick value"
          data={data ? data["response"] : []}
          nothingFoundMessage="Nothing found..."
          searchable
          onChange={(value) => handleSelectChange(value, 'marka')}
          style={{ width: '40%' }}
        />
        {dynamicSelectData && Object.keys(dynamicSelectData).map((key) => (
          <Select
            key={key}
            label={createLabel(key)}
            placeholder={`Pick a value for ${key}`}
            data={dynamicSelectData[key].map((item: any) => ({ value: item, label: item.toString() }))}
            nothingFoundMessage="Nothing found..."
            searchable
            onChange={(value) => handleSelectChange(value, key)}
            style={{ width: '40%' }}
          />
        ))}
        <TextInput
          label="Rok produkcji"
          name="rok_produkcji"
          value={inputValues.rok_produkcji}
          onChange={handleInputChange}
          style={{ width: '40%' }}
        />
        <TextInput
          label="Przebieg"
          name="przebieg"
          value={inputValues.przebieg}
          onChange={handleInputChange}
          style={{ width: '40%' }}
        />
        <TextInput
          label="Pojemność skokowa"
          name="pojemnosc_skokowa"
          value={inputValues.pojemnosc_skokowa}
          onChange={handleInputChange}
          style={{ width: '40%' }}
        />
        <TextInput
          label="Spalanie w mieście"
          name="spalanie_w_miescie"
          value={inputValues.spalanie_w_miescie}
          onChange={handleInputChange}
          style={{ width: '40%' }}
        />
        <TextInput
          label="Moc"
          name="moc"
          value={inputValues.moc}
          onChange={handleInputChange}
          style={{ width: '40%' }}
        />
        <TextInput
          label="Liczba drzwi"
          name="liczba_drzwi"
          value={inputValues.liczba_drzwi}
          onChange={handleInputChange}
          style={{ width: '40%' }}
        />
        <TextInput
          label="Liczba miejsc"
          name="liczba_miejsc"
          value={inputValues.liczba_miejsc}
          onChange={handleInputChange}
          style={{ width: '40%' }}
        />
        <Button variant="secondary"
                onClick={handleSubmit} 
                style={{ marginTop: '20px', 
                  width: '40%', 
                  backgroundColor: 'var(--mantine-color-gray-6)' }}
                >Submit</Button>
        {predictionResponse !== null && (
          <Text style={{ marginTop: '20px' }}>
            Car with such parameters should be worth {predictionResponse.toFixed(2)} PLN
          </Text>
        )}
      </Stack>
      </Tabs.Panel>
      <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
        {notificationVisible && (
          <Notification
            onClose={() => setNotificationVisible(false)}
            title="Error"
            color="orange"
          >
            An error occurred while fetching data.
          </Notification>
        )}
      </div>
      </Tabs>
    </>
  );
}