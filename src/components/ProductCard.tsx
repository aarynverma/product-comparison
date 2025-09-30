import React, { useState, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box
} from '@mui/material';
import { Add, Remove, CheckCircle, Star, CurrencyRupee, LocalShipping, BrokenImage } from '@mui/icons-material';
import { ProductCardProps } from '../types';



const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  isInCompare, 
  onAddToCompare, 
  onRemoveFromCompare, 
  canAdd 
}) => {
  const [imageError, setImageError] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  const handleCompareAction = useCallback((): void => {
    if (isInCompare) {
      onRemoveFromCompare(product.id);
    } else {
      onAddToCompare(product);
    }
  }, [isInCompare, onAddToCompare, onRemoveFromCompare, product]);

  const handleImageError = useCallback((): void => {
    setImageError(true);
    setImageLoading(false);
  }, []);

  const handleImageLoad = useCallback((): void => {
    setImageLoading(false);
    setImageError(false);
  }, []);

  const getButtonText = (): string => {
    if (isInCompare) return 'Remove from Compare';
    if (!canAdd) return 'Compare Full (3/3)';
    return 'Add to Compare';
  };

  const getCardAriaLabel = (): string => {
    const baseInfo = `${product.name} by ${product.brand}, ₹${product.price.toLocaleString()}`;
    
    if (isInCompare) {
      return `${baseInfo}. Currently selected for comparison. Press Enter or Space to remove.`;
    }
    
    if (canAdd) {
      return `${baseInfo}. Press Enter or Space to add to comparison.`;
    }
    
    return `${baseInfo}. Comparison is full. Cannot add more products.`;
  };

  const handleCardKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCompareAction();
    }
  }, [handleCompareAction]);

  return (
    <Card 
      component="article"
      tabIndex={0}
      role="button"
      aria-pressed={isInCompare}
      aria-label={getCardAriaLabel()}
      onKeyDown={handleCardKeyDown}
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        border: (theme) => isInCompare 
          ? `2px solid ${theme.palette.primary.main}`
          : '2px solid transparent',
        borderRadius: 2,
        backgroundColor: 'background.paper',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => theme.palette.mode === 'dark'
            ? '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
            : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
        '&:focus': {
          outline: '3px solid',
          outlineColor: 'primary.main',
          outlineOffset: '2px',
        },
        '&:focus:not(:focus-visible)': {
          outline: 'none',
        },
      }}
    >
      <Box sx={{ 
        position: 'relative', 
        p: 3, 
        textAlign: 'center', 
        minHeight: '240px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: (theme) => theme.palette.mode === 'dark' 
          ? '#334155'
          : '#F8FAFC',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
      }}>
        {imageError ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '200px',
              color: 'text.secondary',
              backgroundColor: 'action.hover'
            }}
          >
            <BrokenImage sx={{ fontSize: '48px', mb: 1, opacity: 0.5 }} />
            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
              Image not available
            </Typography>
          </Box>
        ) : (
          <CardMedia
            component="img"
            image={product.image}
            alt={`${product.name} product image`}
            loading="lazy"
            onError={handleImageError}
            onLoad={handleImageLoad}
            sx={{ 
              objectFit: 'contain',
              maxWidth: '100%',
              maxHeight: '200px',
              width: 'auto',
              height: 'auto',
              opacity: imageLoading ? 0.7 : 1,
              transition: 'opacity 0.3s ease-in-out',
            }}
          />
        )}
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            padding: '4px 8px',
            borderRadius: 2,
            fontSize: '0.75rem',
            fontWeight: 600,
            zIndex: 1,
          }}
        >
          {product.brand}
        </Box>
        {isInCompare && (
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              zIndex: 1,
            }}
            aria-label="Product selected for comparison"
          >
            <CheckCircle sx={{ fontSize: '16px' }} />
          </Box>
        )}
      </Box>
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
        <Typography 
          variant="h6" 
          component="h3" 
          sx={{ 
            fontSize: '1rem',
            lineHeight: 1.4,
            mb: 2,
            fontWeight: 600,
            color: 'text.primary',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.8em',
          }}
        >
          {product.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {Array.from({ length: 5 }, (_, index) => (
            <Star 
              key={`star-${index}`} 
              sx={{ 
                fontSize: '1rem', 
                color: '#FBBF24',
                filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
              }} 
            />
          ))}
          <Typography 
            variant="body2" 
            sx={{ 
              ml: 1, 
              color: 'text.secondary', 
              fontSize: '0.875rem',
              fontWeight: 500
            }}
          >
            (4.5)
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
          <CurrencyRupee sx={{ fontSize: '1.25rem', color: 'text.primary' }} />
          <Typography 
            variant="h4" 
            sx={{ 
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'text.primary'
            }}
          >
            {product.price.toLocaleString()}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
          <LocalShipping sx={{ fontSize: '1rem', color: '#10B981' }} />
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#10B981',
              fontSize: '0.875rem',
              fontWeight: 500,
            }}
          >
            Free Shipping
          </Typography>
        </Box>
        
        <Box sx={{ mb: 3, flexGrow: 1 }}>
          <Box 
            id={`product-${product.id}-description`}
            sx={{ display: 'none' }}
            aria-hidden="true"
          >
            {product.name} by {product.brand}, priced at ₹{product.price.toLocaleString()}. 
            Key features: {product.features.slice(0, 2).join(', ')}.
          </Box>
          {product.features.slice(0, 2).map((feature: string, index: number) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 0.5 }}>
              <CheckCircle sx={{ fontSize: '0.875rem', color: 'primary.main', mt: 0.125 }} />
              <Typography 
                variant="body2" 
                sx={{ 
                  fontSize: '0.875rem',
                  color: 'text.secondary',
                  lineHeight: 1.4,
                  flex: 1
                }}
              >
                {feature}
              </Typography>
            </Box>
          ))}
        </Box>
        
        <Button
          fullWidth
          variant={isInCompare ? "outlined" : "contained"}
          color={isInCompare ? "error" : "primary"}
          startIcon={isInCompare ? <Remove /> : <Add />}
          onClick={(e) => {
            e.stopPropagation();
            handleCompareAction();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.stopPropagation();
            }
          }}
          disabled={!canAdd && !isInCompare}
          aria-label={
            isInCompare 
              ? `Remove ${product.name} from comparison`
              : `Add ${product.name} to comparison`
          }
          aria-describedby={`product-${product.id}-description`}
          sx={{ 
            py: 1.5,
            fontSize: '0.875rem',
            fontWeight: 600,
            transition: 'all 0.2s ease-in-out',
            '&:hover:not(:disabled)': {
              transform: 'translateY(-1px)',
              boxShadow: 2
            }
          }}
        >
          {getButtonText()}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;