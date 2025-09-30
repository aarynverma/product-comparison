import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders Product Comparison Hub heading', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', { name: /Product Comparison Hub/i, level: 1 });
  expect(headingElement).toBeInTheDocument();
});

test('renders products grid', () => {
  render(<App />);
  const productsText = screen.getByText(/Products \(\d+\)/i);
  expect(productsText).toBeInTheDocument();
});

test('renders search input', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText(/Search products, brands, or features/i);
  expect(searchInput).toBeInTheDocument();
});

test('renders theme toggle', () => {
  render(<App />);
  const themeToggle = screen.getByRole('button', { name: /Switch to (light|dark) mode/i });
  expect(themeToggle).toBeInTheDocument();
});