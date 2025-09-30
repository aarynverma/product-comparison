import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, AppBar, Toolbar, Typography, Box, Paper, Button, GlobalStyles } from '@mui/material';
import { Lightbulb } from '@mui/icons-material';
import ProductGrid from './components/ProductGrid';
import ComparisonPanel from './components/ComparisonPanel';
import SearchFilter from './components/SearchFilter';
import ThemeToggle from './components/ThemeToggle';
import ErrorBoundary from './components/ErrorBoundary';
import { productsData } from './data/productsData';
import { Product } from './types';
import { lightTheme, darkTheme } from './theme/theme';
import { NotificationProvider, useNotification } from './contexts/NotificationContext';
import { 
  validateProduct, 
  validateSearchTerm, 
  validateBrand, 
  validateComparisonList,
  sanitizeLocalStorageData,
  ValidationError 
} from './utils/validation';


const AppContent: React.FC = () => {
  const [products] = useState<Product[]>(() => {
    try {
      productsData.forEach(validateProduct);
      return productsData;
    } catch (error) {
      console.error('Product data validation failed:', error);
      throw new Error('Application data is corrupted. Please contact support.');
    }
  });

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(productsData);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [showComparison, setShowComparison] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [announceText, setAnnounceText] = useState<string>('');
  
  const { showError, showSuccess, showWarning } = useNotification();

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const savedCompareList = localStorage.getItem('compareList');
        const savedDarkMode = localStorage.getItem('darkMode');
        
        if (savedCompareList) {
          try {
            const parsedList = sanitizeLocalStorageData(savedCompareList);
            
            if (Array.isArray(parsedList)) {
              const validatedList: Product[] = [];
              for (const item of parsedList) {
                try {
                  validateProduct(item);
                  validatedList.push(item);
                } catch (validationError) {
                  console.warn('Invalid product in saved comparison list:', validationError);
                }
              }
              
              validateComparisonList(validatedList);
              setCompareList(validatedList);
              
              if (validatedList.length >= 2) {
                setShowComparison(true);
              }
              
              if (validatedList.length !== parsedList.length) {
                showWarning('Some invalid products were removed from your comparison list.');
              }
            }
          } catch (error) {
            console.error('Error parsing saved compare list:', error);
            showError('Failed to load saved comparison list. Starting fresh.');
            localStorage.removeItem('compareList');
          }
        }

        if (savedDarkMode) {
          try {
            const darkModeValue = sanitizeLocalStorageData(savedDarkMode);
            if (typeof darkModeValue === 'boolean') {
              setDarkMode(darkModeValue);
            }
          } catch (error) {
            console.error('Error parsing saved dark mode preference:', error);
            showWarning('Failed to load theme preference. Using default theme.');
            localStorage.removeItem('darkMode');
          }
        }
        
        setIsDataLoaded(true);
      } catch (error) {
        console.error('Critical error loading stored data:', error);
        showError('Failed to load application data. Some features may not work correctly.');
        setIsDataLoaded(true);
      }
    };

    loadStoredData();
  }, [showError, showWarning]);

  useEffect(() => {
    if (announceText) {
      const timer = setTimeout(() => {
        setAnnounceText('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [announceText]);

  useEffect(() => {
    if (isDataLoaded) {
      try {
        validateComparisonList(compareList);
        localStorage.setItem('compareList', JSON.stringify(compareList));
      } catch (error) {
        console.error('Error saving comparison list:', error);
        showError('Failed to save comparison list to storage.');
      }
    }
  }, [compareList, isDataLoaded, showError]);

  useEffect(() => {
    if (isDataLoaded) {
      try {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
      } catch (error) {
        console.error('Error saving dark mode preference:', error);
        showWarning('Failed to save theme preference.');
      }
    }
  }, [darkMode, isDataLoaded, showWarning]);

  useEffect(() => {
    try {
      let filtered: Product[] = products;

      if (searchTerm) {
        const sanitizedSearchTerm = validateSearchTerm(searchTerm);
        if (sanitizedSearchTerm) {
          filtered = filtered.filter((product: Product) =>
            product.name.toLowerCase().includes(sanitizedSearchTerm.toLowerCase()) ||
            product.brand.toLowerCase().includes(sanitizedSearchTerm.toLowerCase()) ||
            product.features.some((feature: string) => 
              feature.toLowerCase().includes(sanitizedSearchTerm.toLowerCase())
            )
          );
        }
      }

      if (selectedBrand) {
        const uniqueBrands = [...new Set(products.map((product: Product) => product.brand))];
        const sanitizedBrand = validateBrand(selectedBrand, uniqueBrands);
        if (sanitizedBrand) {
          filtered = filtered.filter((product: Product) => product.brand === sanitizedBrand);
        }
      }

      setFilteredProducts(filtered);
    } catch (error) {
      console.error('Error filtering products:', error);
      if (error instanceof ValidationError) {
        showError(`Filter error: ${error.message}`);
        if (error.message.includes('Search term')) {
          setSearchTerm('');
        }
        if (error.message.includes('brand')) {
          setSelectedBrand('');
        }
      } else {
        showError('An error occurred while filtering products.');
      }
      setFilteredProducts(products);
    }
  }, [searchTerm, selectedBrand, products, showError]);

  const handleAddToCompare = (product: Product): void => {
    try {
      validateProduct(product);

      if (compareList.length >= 3) {
        const message = 'Cannot add more products. Maximum 3 products can be compared at once.';
        setAnnounceText(message);
        showWarning(message);
        return;
      }

      if (compareList.find((item: Product) => item.id === product.id)) {
        const message = `${product.name} is already in your comparison list.`;
        setAnnounceText(message);
        showWarning(message);
        return;
      }

      const newCompareList: Product[] = [...compareList, product];
      
      validateComparisonList(newCompareList);
      
      setCompareList(newCompareList);
      const message = `${product.name} added to comparison. ${newCompareList.length} of 3 products selected.`;
      setAnnounceText(message);
      showSuccess(message);

      if (newCompareList.length >= 2) {
        setShowComparison(true);
      }
    } catch (error) {
      console.error('Error adding product to comparison:', error);
      const message = error instanceof ValidationError 
        ? `Cannot add product: ${error.message}`
        : 'Failed to add product to comparison. Please try again.';
      setAnnounceText(message);
      showError(message);
    }
  };

  const handleRemoveFromCompare = (productId: number): void => {
    try {
      if (typeof productId !== 'number' || productId <= 0) {
        throw new ValidationError('Invalid product ID');
      }

      const product = compareList.find((item: Product) => item.id === productId);
      if (!product) {
        const message = 'Product not found in comparison list.';
        showWarning(message);
        return;
      }

      const newCompareList: Product[] = compareList.filter((item: Product) => item.id !== productId);
      validateComparisonList(newCompareList);
      
      setCompareList(newCompareList);
      
      const message = `${product.name} removed from comparison. ${newCompareList.length} products remaining.`;
      setAnnounceText(message);
      showSuccess(message);

      if (newCompareList.length < 2) {
        setShowComparison(false);
      }
    } catch (error) {
      console.error('Error removing product from comparison:', error);
      const message = error instanceof ValidationError 
        ? `Cannot remove product: ${error.message}`
        : 'Failed to remove product from comparison. Please try again.';
      setAnnounceText(message);
      showError(message);
    }
  };

  const handleClearComparison = (): void => {
    try {
      const count = compareList.length;
      setCompareList([]);
      setShowComparison(false);
      const message = `Comparison cleared. ${count} products removed from comparison.`;
      setAnnounceText(message);
      showSuccess(message);
    } catch (error) {
      console.error('Error clearing comparison:', error);
      const message = 'Failed to clear comparison. Please refresh the page.';
      setAnnounceText(message);
      showError(message);
    }
  };

  const uniqueBrands: string[] = [...new Set(products.map((product: Product) => product.brand))];

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          html: {
            scrollbarGutter: 'stable',
          },
          body: {
            scrollbarGutter: 'stable',
          },
          '.MuiModal-root': {
            scrollbarGutter: 'stable',
          }
        }}
      />
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh'
        }}
      >
        <AppBar position="sticky" elevation={0}>
          <Toolbar sx={{ minHeight: { xs: '56px', sm: '60px' } }}>
            <Typography 
              variant="h1" 
              component="h1" 
              sx={{ 
                flexGrow: 1, 
                fontSize: { xs: '1rem', sm: '1.125rem' },
                fontWeight: 400,
                color: '#ffffff'
              }}
            >
              Product Comparison
            </Typography>
            <ThemeToggle darkMode={darkMode} onToggle={setDarkMode} />
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ 
          flex: 1, 
          py: { xs: 2, sm: 3 }, 
          px: { xs: 2, sm: 3 } 
        }}>
          <Box 
            component="a" 
            href="#main-content"
            sx={{
              position: 'absolute',
              left: '-9999px',
              top: 0,
              padding: '8px 16px',
              backgroundColor: 'primary.main',
              color: 'white',
              textDecoration: 'none',
              fontSize: '0.875rem',
              borderRadius: '0 0 4px 4px',
              '&:focus': {
                left: '16px',
                zIndex: 9999,
              }
            }}
          >
            Skip to main content
          </Box>

          <Box
            role="status"
            aria-live="polite"
            aria-atomic="true"
            sx={{
              position: 'absolute',
              left: '-9999px',
              width: '1px',
              height: '1px',
              overflow: 'hidden',
            }}
          >
            {announceText}
          </Box>

          <Box sx={{ 
            background: (theme) => theme.palette.mode === 'dark' 
              ? 'linear-gradient(135deg, #4F46E5 0%, #6366F1 50%, #8B5CF6 100%)'
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: { xs: 2, sm: 3 },
            p: { xs: 2, sm: 3, md: 4 },
            mb: { xs: 2, sm: 3, md: 4 },
            color: 'white',
            textAlign: 'center',
            boxShadow: (theme) => theme.palette.mode === 'dark'
              ? '0 20px 25px -5px rgba(0, 0, 0, 0.4)'
              : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}>
            <Typography 
              variant="h1" 
              sx={{ 
                mb: { xs: 1, sm: 2 }, 
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, 
                fontWeight: 700, 
                color: '#ffffff',
                lineHeight: 1.2
              }}
            >
              Premium Product Collection
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                opacity: 0.9, 
                fontWeight: 400, 
                color: '#ffffff',
                fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                mb: { xs: 1, sm: 0 }
              }}
            >
              Compare and discover the best products for your needs
            </Typography>
            
            <Box 
              sx={{ 
                mt: { xs: 1, sm: 2 }, 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                padding: { xs: '6px 12px', sm: '8px 16px' },
                borderRadius: 2,
                maxWidth: 'fit-content',
                margin: { xs: '8px auto 0 auto', sm: '16px auto 0 auto' }
              }}
            >
              <Lightbulb sx={{ 
                fontSize: { xs: '1rem', sm: '1.125rem' }, 
                color: '#FEF08A' 
              }} />
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.9)', 
                  fontSize: { xs: '0.75rem', sm: '0.875rem' }
                }}
              >
                Tip: Use Tab to navigate, Enter/Space to select products
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
            <SearchFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedBrand={selectedBrand}
              onBrandChange={setSelectedBrand}
              brands={uniqueBrands}
            />
          </Box>

          {compareList.length > 0 && (
            <Box sx={{ 
              backgroundColor: 'background.paper',
              border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? '#334155' : '#E2E8F0'}`,
              borderRadius: { xs: 2, sm: 3 },
              p: { xs: 2, sm: 3 },
              mb: { xs: 2, sm: 3 },
              boxShadow: (theme) => theme.palette.mode === 'dark'
                ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
                : '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
            }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: { xs: 'flex-start', sm: 'center' },
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 2, sm: 0 }
              }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'primary.main', 
                    fontWeight: 600,
                    fontSize: { xs: '1rem', sm: '1.25rem' }
                  }}
                >
                  Compare Products ({compareList.length})
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  gap: { xs: 1, sm: 2 },
                  flexDirection: { xs: 'column', sm: 'row' },
                  width: { xs: '100%', sm: 'auto' }
                }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleClearComparison}
                    sx={{ 
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      minWidth: { xs: '100%', sm: 'auto' }
                    }}
                  >
                    Clear All
                  </Button>
                  {compareList.length >= 2 && (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => setShowComparison(!showComparison)}
                      sx={{ 
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        minWidth: { xs: '100%', sm: 'auto' }
                      }}
                    >
                      {showComparison ? 'Hide' : 'Show'} Comparison
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          )}

          <Box id="main-content" role="main">
              {showComparison && compareList.length >= 2 && (
                <Box sx={{ mb: 3 }}>
                  <ComparisonPanel
                    products={compareList}
                    onRemoveProduct={handleRemoveFromCompare}
                    onClearComparison={handleClearComparison}
                  />
                </Box>
              )}

              <ProductGrid
                products={filteredProducts}
                compareList={compareList}
                onAddToCompare={handleAddToCompare}
                onRemoveFromCompare={handleRemoveFromCompare}
              />

              {filteredProducts.length === 0 && (
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 6, 
                    textAlign: 'center',
                    backgroundColor: 'background.paper',
                    borderRadius: 3,
                    border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? '#334155' : '#E2E8F0'}`,
                    boxShadow: (theme) => theme.palette.mode === 'dark'
                      ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
                      : '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <Typography variant="h3" gutterBottom color="text.primary" sx={{ fontSize: '1.5rem' }}>
                    No products found
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Try adjusting your search criteria or clear the filters.
                  </Typography>
                </Paper>
              )}
            </Box>
        </Container>

        <Paper 
          component="footer" 
          elevation={1} 
          sx={{ 
            mt: 'auto',
            py: 2,
            backgroundColor: 'background.paper',
            borderRadius: 0
          }}
        >
          <Container maxWidth="xl">
            <Typography variant="body2" align="center" color="text.secondary">
              &copy; 2025 Product Comparison Hub. Built with React, TypeScript, and Material-UI.
            </Typography>
          </Container>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </ErrorBoundary>
  );
};

export default App;