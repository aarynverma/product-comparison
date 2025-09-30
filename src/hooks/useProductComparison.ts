import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types';
import { 
  validateComparisonList, 
  sanitizeLocalStorageData, 
  ValidationError 
} from '../utils/validation';
import { STORAGE_KEYS, MAX_COMPARISON_PRODUCTS } from '../constants';


export const useProductComparison = (
  onSuccess: (message: string) => void,
  onError: (message: string) => void,
  onWarning: (message: string) => void
) => {
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [showComparison, setShowComparison] = useState<boolean>(false);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

  useEffect(() => {
    const loadComparisonData = async (): Promise<void> => {
      try {
        const savedData = localStorage.getItem(STORAGE_KEYS.COMPARISON_LIST);
        
        if (savedData) {
          const parsedData = sanitizeLocalStorageData(savedData);
          
          if (Array.isArray(parsedData)) {
            const validProducts: Product[] = [];
            
            for (const item of parsedData) {
              try {
                validProducts.push(item);
              } catch (validationError) {
                console.warn('Invalid product in saved comparison:', validationError);
              }
            }
            
            validateComparisonList(validProducts);
            setCompareList(validProducts);
            
            if (validProducts.length >= 2) {
              setShowComparison(true);
            }
            
            if (validProducts.length !== parsedData.length) {
              onWarning('Some invalid products were removed from your comparison list.');
            }
          }
        }
      } catch (error) {
        console.error('Failed to load comparison data:', error);
        onError('Failed to load saved comparison list. Starting fresh.');
        localStorage.removeItem(STORAGE_KEYS.COMPARISON_LIST);
      } finally {
        setIsDataLoaded(true);
      }
    };

    loadComparisonData();
  }, [onError, onWarning]);

  useEffect(() => {
    if (isDataLoaded) {
      try {
        localStorage.setItem(STORAGE_KEYS.COMPARISON_LIST, JSON.stringify(compareList));
      } catch (error) {
        console.error('Failed to save comparison data:', error);
        onError('Failed to save comparison list to storage.');
      }
    }
  }, [compareList, isDataLoaded, onError]);

  const addToComparison = useCallback((product: Product): void => {
    try {
      if (compareList.length >= MAX_COMPARISON_PRODUCTS) {
        onWarning(`Cannot add more products. Maximum ${MAX_COMPARISON_PRODUCTS} products can be compared at once.`);
        return;
      }

      if (compareList.find(item => item.id === product.id)) {
        onWarning(`${product.name} is already in your comparison list.`);
        return;
      }

      const newList = [...compareList, product];
      validateComparisonList(newList);
      
      setCompareList(newList);
      onSuccess(`${product.name} added to comparison. ${newList.length} of ${MAX_COMPARISON_PRODUCTS} products selected.`);

      if (newList.length >= 2) {
        setShowComparison(true);
      }
    } catch (error) {
      console.error('Failed to add product to comparison:', error);
      const message = error instanceof ValidationError 
        ? `Cannot add product: ${error.message}`
        : 'Failed to add product to comparison. Please try again.';
      onError(message);
    }
  }, [compareList, onSuccess, onWarning, onError]);

  const removeFromComparison = useCallback((productId: number): void => {
    try {
      const product = compareList.find(item => item.id === productId);
      if (!product) {
        onWarning('Product not found in comparison list.');
        return;
      }

      const newList = compareList.filter(item => item.id !== productId);
      validateComparisonList(newList);
      
      setCompareList(newList);
      onSuccess(`${product.name} removed from comparison. ${newList.length} products remaining.`);

      if (newList.length < 2) {
        setShowComparison(false);
      }
    } catch (error) {
      console.error('Failed to remove product from comparison:', error);
      const message = error instanceof ValidationError 
        ? `Cannot remove product: ${error.message}`
        : 'Failed to remove product from comparison. Please try again.';
      onError(message);
    }
  }, [compareList, onSuccess, onWarning, onError]);

  const clearComparison = useCallback((): void => {
    try {
      const count = compareList.length;
      setCompareList([]);
      setShowComparison(false);
      onSuccess(`Comparison cleared. ${count} products removed from comparison.`);
    } catch (error) {
      console.error('Failed to clear comparison:', error);
      onError('Failed to clear comparison. Please refresh the page.');
    }
  }, [compareList.length, onSuccess, onError]);

  const canAddProduct = useCallback((productId: number): boolean => {
    return compareList.length < MAX_COMPARISON_PRODUCTS && 
           !compareList.find(item => item.id === productId);
  }, [compareList]);

  const isInComparison = useCallback((productId: number): boolean => {
    return compareList.some(item => item.id === productId);
  }, [compareList]);

  return {
    compareList,
    showComparison,
    setShowComparison,
    addToComparison,
    removeFromComparison,
    clearComparison,
    canAddProduct,
    isInComparison,
    isDataLoaded
  };
};