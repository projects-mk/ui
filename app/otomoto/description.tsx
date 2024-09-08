import React from 'react';

export default function Description() {
  return (
    <div>
      <h1>Overview</h1>
      <p>
        Application created to generate predictions for users regarding current car prices based on several features.
      </p>
      <p>
        ML models are constantly retrained in order to be kept up to date.
      </p>

      <h2>Architecture</h2>
      <p>
        Below diagram shows current architecture of the whole application (it consists of several parts). Each of those are self-hosted on VMs.
      </p>
      <img src="architecture.png" alt="Architecture Diagram" />

      <h2>Connected projects</h2>
      <ul>
        <li><a href="https://github.com/projects-mk/data-collectors">Data Collectors</a></li>
        <li><a href="https://github.com/projects-mk/airflow-data-pipelines">Airflow Pipelines</a></li>
      </ul>
    </div>
  );
}