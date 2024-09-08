"use client"
import { useState } from 'react';
import { Group, Code } from '@mantine/core';
import {
  IconUserFilled,
  IconCornerDownRight,
} from '@tabler/icons-react';
import Link from "next/link";

import classes from './Sidebar.module.css';

const data = [
  { link: '/', label: 'About', icon: IconUserFilled },
  { link: '/otomoto', label: 'Car valuation', icon: IconCornerDownRight },
  { link: '/otodom', label: 'Home valuation', icon: IconCornerDownRight },
  { link: '/gpw', label: 'GPW Stock Analysis', icon: IconCornerDownRight },
];

export function Sidebar() {
  const [active, setActive] = useState('');

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        if (!item.link) {
          event.preventDefault();
        }
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      {links}
    </nav>
  );
}