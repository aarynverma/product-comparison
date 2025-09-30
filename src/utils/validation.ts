import { Product } from '../types';

export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const validateProduct = (product: any): product is Product => {
  if (!product || typeof product !== 'object') {
    throw new ValidationError('Product must be an object');
  }

  if (typeof product.id !== 'number' || product.id <= 0) {
    throw new ValidationError('Product ID must be a positive number', 'id');
  }

  if (!product.name || typeof product.name !== 'string' || product.name.trim().length === 0) {
    throw new ValidationError('Product name is required and must be a non-empty string', 'name');
  }

  if (!product.brand || typeof product.brand !== 'string' || product.brand.trim().length === 0) {
    throw new ValidationError('Product brand is required and must be a non-empty string', 'brand');
  }

  if (!product.image || typeof product.image !== 'string' || !isValidUrl(product.image)) {
    throw new ValidationError('Product image must be a valid URL', 'image');
  }

  if (typeof product.price !== 'number' || product.price < 0) {
    throw new ValidationError('Product price must be a non-negative number', 'price');
  }

  if (!Array.isArray(product.features) || product.features.length === 0) {
    throw new ValidationError('Product features must be a non-empty array', 'features');
  }

  if (product.features.some((feature: any) => typeof feature !== 'string' || feature.trim().length === 0)) {
    throw new ValidationError('All product features must be non-empty strings', 'features');
  }

  if (!product.specs || typeof product.specs !== 'object') {
    throw new ValidationError('Product specs must be an object', 'specs');
  }

  return true;
};

export const validateSearchTerm = (searchTerm: string): string => {
  if (typeof searchTerm !== 'string') {
    throw new ValidationError('Search term must be a string');
  }

  const sanitized = searchTerm.replace(/[<>"';&()]/g, '').trim();
  
  if (sanitized.length > 100) {
    throw new ValidationError('Search term is too long (maximum 100 characters)');
  }  return sanitized;
};

export const validateBrand = (brand: string, availableBrands: string[]): string => {
  if (typeof brand !== 'string') {
    throw new ValidationError('Brand must be a string');
  }

  const sanitized = brand.trim();

  if (sanitized && !availableBrands.includes(sanitized)) {
    throw new ValidationError('Selected brand is not available');
  }

  return sanitized;
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateComparisonList = (products: Product[]): boolean => {
  if (!Array.isArray(products)) {
    throw new ValidationError('Comparison list must be an array');
  }

  if (products.length > 3) {
    throw new ValidationError('Cannot compare more than 3 products');
  }

  const ids = new Set();
  for (const product of products) {
    if (ids.has(product.id)) {
      throw new ValidationError('Duplicate products in comparison list');
    }
    ids.add(product.id);
    validateProduct(product);
  }

  return true;
};

export const sanitizeLocalStorageData = (data: string): any => {
  try {
    const parsed = JSON.parse(data);
    return parsed;
  } catch (error) {
    throw new ValidationError('Invalid JSON data in localStorage');
  }
};