import React, { useCallback } from 'react';
import { 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button, 
  Box, 
  Chip, 
  Typography, 
  InputAdornment,
  IconButton
} from '@mui/material';
import { Search, Clear, FilterList } from '@mui/icons-material';
import { SearchFilterProps } from '../types';
import { validateSearchTerm, ValidationError } from '../utils/validation';



const SearchFilter: React.FC<SearchFilterProps> = ({ 
  searchTerm, 
  onSearchChange, 
  selectedBrand, 
  onBrandChange, 
  brands 
}) => {
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    const rawValue = e.target.value;
    
    try {
      const cleanValue = validateSearchTerm(rawValue);
      onSearchChange(cleanValue);
    } catch (error) {
      if (error instanceof ValidationError) {
        console.warn('Search validation warning:', error.message);
        const fallbackValue = rawValue
          .replace(/[<>\"';&()]/g, '')
          .substring(0, 100);
        onSearchChange(fallbackValue);
      }
    }
  }, [onSearchChange]);

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  const handleClearAllFilters = (): void => {
    onSearchChange('');
    onBrandChange('');
  };

  const hasActiveFilters = Boolean(searchTerm || selectedBrand);

  return (
    <Box sx={{ 
      backgroundColor: 'background.paper',
      borderRadius: { xs: 2, sm: 3 },
      p: { xs: 2, sm: 3 },
      border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? '#334155' : '#E2E8F0'}`,
      boxShadow: (theme) => theme.palette.mode === 'dark'
        ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
        : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      position: 'relative',
      zIndex: 10
    }}>
      <Box sx={{ 
        display: 'flex', 
        gap: { xs: 2, sm: 3 }, 
        alignItems: { xs: 'stretch', sm: 'flex-start' }, 
        flexDirection: { xs: 'column', sm: 'row' },
        flexWrap: 'wrap' 
      }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search products, brands, or features..."
          value={searchTerm}
                      onChange={handleSearchChange}
          onKeyPress={handleSearchKeyPress}
          aria-label="Search products"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: 'text.secondary', fontSize: '1.25rem' }} />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search"
                  size="small"
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#475569' : '#F1F5F9',
                    }
                  }}
                >
                  <Clear fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ 
            minWidth: { xs: 'auto', sm: 300, md: 400 }, 
            flex: 1,
            '& .MuiOutlinedInput-root': {
              '& input': {
                fontSize: { xs: '0.875rem', sm: '1rem' },
                padding: { xs: '12px 14px', sm: '14px 16px' },
              },
            }
          }}
        />

        <FormControl sx={{ 
          minWidth: { xs: 'auto', sm: 180, md: 200 },
          flexShrink: 0,
          width: { xs: '100%', sm: 'auto' }
        }}>
          <InputLabel id="brand-filter-label">
            Filter by Brand
          </InputLabel>
          <Select
            labelId="brand-filter-label"
            value={selectedBrand}
            label="Filter by Brand"
            onChange={(e) => onBrandChange(e.target.value as string)}
            aria-label="Filter by brand"
            MenuProps={{
              PaperProps: {
                sx: (theme) => ({
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 20px 25px -5px rgba(0, 0, 0, 0.4)'
                    : '0 10px 25px -3px rgba(0, 0, 0, 0.1)',
                  border: `1px solid ${theme.palette.mode === 'dark' ? '#475569' : '#E2E8F0'}`,
                  borderRadius: 2,
                  mt: 1,
                  maxHeight: '300px',
                  backgroundColor: theme.palette.mode === 'dark' ? '#334155' : '#ffffff',
                  '& .MuiMenuItem-root': {
                    fontSize: '0.875rem',
                    padding: '12px 16px',
                    color: theme.palette.mode === 'dark' ? '#F1F5F9' : '#1E293B',
                    '&:hover': {
                      backgroundColor: theme.palette.mode === 'dark' ? '#475569' : '#F8FAFC',
                    },
                    '&.Mui-selected': {
                      backgroundColor: theme.palette.mode === 'dark' ? '#6366F1' : '#EEF2FF',
                      color: theme.palette.mode === 'dark' ? '#ffffff' : '#1E293B',
                      '&:hover': {
                        backgroundColor: theme.palette.mode === 'dark' ? '#4F46E5' : '#E0E7FF',
                      }
                    }
                  }
                })
              },
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'left',
              },
              disableScrollLock: true,
            }}
            sx={{
              '& .MuiSelect-select': {
                padding: '14px 16px',
              },
            }}
          >
            <MenuItem value="">
              <em>All Brands</em>
            </MenuItem>
            {brands.map((brand: string) => (
              <MenuItem key={brand} value={brand}>
                {brand}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        {hasActiveFilters && (
          <Button
            variant="outlined"
            startIcon={<Clear fontSize="small" />}
            onClick={handleClearAllFilters}
            aria-label="Clear all filters"
            sx={{
              padding: '12px 20px',
              fontSize: '0.875rem',
              whiteSpace: 'nowrap',
            }}
          >
            Clear Filters
          </Button>
        )}
      </Box>

      {hasActiveFilters && (
        <Box sx={{ 
          mt: 3, 
          display: 'flex', 
          gap: 2, 
          alignItems: 'center', 
          flexWrap: 'wrap',
          pt: 2,
          borderTop: (theme) => `1px solid ${theme.palette.divider}`
        }}>
          <FilterList sx={{ color: 'text.secondary' }} fontSize="small" />
          <Typography 
            variant="body2" 
            sx={{ color: 'text.secondary', fontSize: '0.875rem', fontWeight: 500 }}
          >
            Active filters:
          </Typography>
          
          {searchTerm && (
            <Chip
              label={`Search: "${searchTerm}"`}
              onDelete={() => onSearchChange('')}
              color="primary"
              variant="outlined"
              size="medium"
              sx={{ 
                fontSize: '0.875rem',
                borderRadius: 2,
                '& .MuiChip-deleteIcon': {
                  fontSize: '1rem',
                  '&:hover': {
                    color: 'primary.dark'
                  }
                }
              }}
            />
          )}
          
          {selectedBrand && (
            <Chip
              label={`Brand: ${selectedBrand}`}
              onDelete={() => onBrandChange('')}
              color="primary"
              variant="outlined"
              size="medium"
              sx={{ 
                fontSize: '0.875rem',
                borderRadius: 2,
                '& .MuiChip-deleteIcon': {
                  fontSize: '1rem',
                  '&:hover': {
                    color: 'primary.dark'
                  }
                }
              }}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default SearchFilter;