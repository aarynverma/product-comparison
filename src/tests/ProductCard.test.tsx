import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

const mockProduct: Product = {
  id: 1,
  name: 'Test Product',
  brand: 'Test Brand',
  image: 'https://example.com/test.jpg',
  price: 999,
  features: ['Feature 1', 'Feature 2', 'Feature 3'],
  specs: {
    storage: '128GB',
    battery: '4000 mAh',
    camera: '50MP',
    display: '6.1 inch',
    os: 'Test OS',
    weight: '200g'
  }
};

describe('ProductCard Component', () => {
  const mockOnAddToCompare = jest.fn();
  const mockOnRemoveFromCompare = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders product information correctly', () => {
    render(
      <ProductCard
        product={mockProduct}
        isInCompare={false}
        onAddToCompare={mockOnAddToCompare}
        onRemoveFromCompare={mockOnRemoveFromCompare}
        canAdd={true}
      />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Brand')).toBeInTheDocument();
    expect(screen.getByText('999')).toBeInTheDocument();
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
    expect(screen.getByText('Feature 3')).toBeInTheDocument();
  });

  test('shows "Add to Compare" button when not in compare list', () => {
    render(
      <ProductCard
        product={mockProduct}
        isInCompare={false}
        onAddToCompare={mockOnAddToCompare}
        onRemoveFromCompare={mockOnRemoveFromCompare}
        canAdd={true}
      />
    );

    const addButton = screen.getByText('Add to Compare');
    expect(addButton).toBeInTheDocument();
  });

  test('shows "Remove from Compare" button when in compare list', () => {
    render(
      <ProductCard
        product={mockProduct}
        isInCompare={true}
        onAddToCompare={mockOnAddToCompare}
        onRemoveFromCompare={mockOnRemoveFromCompare}
        canAdd={true}
      />
    );

    const removeButton = screen.getByText('Remove from Compare');
    expect(removeButton).toBeInTheDocument();
  });

  test('calls onAddToCompare when Add button is clicked', () => {
    render(
      <ProductCard
        product={mockProduct}
        isInCompare={false}
        onAddToCompare={mockOnAddToCompare}
        onRemoveFromCompare={mockOnRemoveFromCompare}
        canAdd={true}
      />
    );

    const addButton = screen.getByText('Add to Compare');
    fireEvent.click(addButton);

    expect(mockOnAddToCompare).toHaveBeenCalledTimes(1);
    expect(mockOnAddToCompare).toHaveBeenCalledWith(mockProduct);
  });

  test('calls onRemoveFromCompare when Remove button is clicked', () => {
    render(
      <ProductCard
        product={mockProduct}
        isInCompare={true}
        onAddToCompare={mockOnAddToCompare}
        onRemoveFromCompare={mockOnRemoveFromCompare}
        canAdd={true}
      />
    );

    const removeButton = screen.getByText('Remove from Compare');
    fireEvent.click(removeButton);

    expect(mockOnRemoveFromCompare).toHaveBeenCalledTimes(1);
    expect(mockOnRemoveFromCompare).toHaveBeenCalledWith(mockProduct.id);
  });

  test('disables add button when canAdd is false', () => {
    render(
      <ProductCard
        product={mockProduct}
        isInCompare={false}
        onAddToCompare={mockOnAddToCompare}
        onRemoveFromCompare={mockOnRemoveFromCompare}
        canAdd={false}
      />
    );

    const addButton = screen.getByText('Compare Full (3/3)');
    expect(addButton).toBeDisabled();
  });

  test('shows compare indicator when product is in compare list', () => {
    render(
      <ProductCard
        product={mockProduct}
        isInCompare={true}
        onAddToCompare={mockOnAddToCompare}
        onRemoveFromCompare={mockOnRemoveFromCompare}
        canAdd={true}
      />
    );

    const indicator = screen.getByLabelText('Product selected for comparison');
    expect(indicator).toBeInTheDocument();
  });

  test('handles keyboard navigation correctly', () => {
    render(
      <ProductCard
        product={mockProduct}
        isInCompare={false}
        onAddToCompare={mockOnAddToCompare}
        onRemoveFromCompare={mockOnRemoveFromCompare}
        canAdd={true}
      />
    );

    const addButton = screen.getByText('Add to Compare');
    
    fireEvent.keyDown(addButton, { key: 'Enter' });
    expect(mockOnAddToCompare).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(addButton, { key: ' ' });
    expect(mockOnAddToCompare).toHaveBeenCalledTimes(2);
  });
});