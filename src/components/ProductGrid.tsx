import React from 'react';
import { Box, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import { ProductGridProps } from '../types';

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  compareList, 
  onAddToCompare, 
  onRemoveFromCompare 
}) => {
  return (
    <Box component="section" aria-labelledby="products-heading">
      <Typography 
        id="products-heading"
        variant="h2" 
        sx={{ 
          fontSize: { xs: '1.25rem', sm: '1.5rem' },
          fontWeight: 600,
          color: 'text.primary',
          mb: { xs: 2, sm: 3 }
        }}
      >
        Products ({products.length})
      </Typography>
      
      <Box 
        role="grid"
        aria-label="Product selection grid"
        sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
            xl: 'repeat(3, 1fr)'
          },
          gap: { xs: 2, sm: 3, md: 4 },
          alignItems: 'stretch',
          p: { xs: 0.5, sm: 1 },
          '& > *': {
            margin: { xs: '4px', sm: '8px' },
          }
        }}
      >
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            isInCompare={compareList.some(item => item.id === product.id)}
            onAddToCompare={onAddToCompare}
            onRemoveFromCompare={onRemoveFromCompare}
            canAdd={compareList.length < 3}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ProductGrid;