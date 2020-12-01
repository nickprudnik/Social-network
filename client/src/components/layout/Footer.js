import React from 'react';
import './index.css';

export default () => (
  <footer className="p-4 text-center main-footer">
    Copyright &copy;
    {' '}
    {new Date().getFullYear()}
    {' '}
    Itech-feed
  </footer>
);
