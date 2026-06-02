// react imports
import { FaCreditCard, FaBook, FaBriefcase } from 'react-icons/fa';
import React from 'react';

const sublinks = [
  {
    page: 'products',
    links: [
      {
        label: 'payment',
        icon: <FaCreditCard />,
        url: 'https://stripe.com/payments',
      },
      {
        label: 'terminal',
        icon: <FaCreditCard />,
        url: 'https://stripe.com/terminal',
      },
      {
        label: 'connect',
        icon: <FaCreditCard />,
        url: 'https://stripe.com/connect',
      },
    ],
  },
  {
    page: 'developers',
    links: [
      {
        label: 'plugins',
        icon: <FaBook />,
        url: 'https://stripe.com/docs/plugins',
      },
      {
        label: 'libraries',
        icon: <FaBook />,
        url: 'https://stripe.com/docs/development',
      },
      {
        label: 'help',
        icon: <FaBook />,
        url: 'https://stripe.com/docs/development',
      },
      {
        label: 'billing',
        icon: <FaBook />,
        url: 'https://stripe.com/billing',
      },
    ],
  },
  {
    page: 'company',
    links: [
      {
        label: 'about',
        icon: <FaBriefcase />,
        url: 'https://stripe.com/blog',
      },
      {
        label: 'customers',
        icon: <FaBriefcase />,
        url: 'https://stripe.com/customers',
      },
    ],
  },
];

export default sublinks;
