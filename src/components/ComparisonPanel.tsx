import React from 'react';
import {
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Avatar,
  IconButton,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { Clear, Circle, FlashOn, CurrencyRupee } from '@mui/icons-material';
import { ComparisonPanelProps, Product } from '../types';

const ComparisonPanel: React.FC<ComparisonPanelProps> = ({ 
  products, 
  onRemoveProduct, 
  onClearComparison 
}) => {
  const allSpecs: string[] = [...new Set(products.flatMap((product: Product) => Object.keys(product.specs)))];

  const getSpecValue = (product: Product, spec: string): string => {
    return product.specs[spec] || 'N/A';
  };

  const compareValues = (spec: string): boolean => {
    const values: string[] = products.map((product: Product) => getSpecValue(product, spec));
    const uniqueValues: string[] = [...new Set(values)];
    return uniqueValues.length > 1;
  };

  return (
    <Paper elevation={2} sx={{ mb: 4, overflow: 'hidden' }}>
      <Box sx={{ p: 3, backgroundColor: 'background.paper' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h2" fontWeight={600}>
            Product Comparison
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Clear />}
            onClick={onClearComparison}
            aria-label="Clear all products from comparison"
          >
            Clear All
          </Button>
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="product comparison table">
            <TableHead>
              <TableRow>
                <TableCell 
                  sx={{ 
                    fontWeight: 600, 
                    backgroundColor: 'background.default',
                    position: 'sticky',
                    left: 0,
                    zIndex: 10,
                    minWidth: 200
                  }}
                >
                  Specification
                </TableCell>
                {products.map((product: Product) => (
                  <TableCell 
                    key={product.id} 
                    align="center"
                    sx={{ 
                      fontWeight: 600,
                      backgroundColor: 'background.default',
                      minWidth: 250,
                      position: 'relative'
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, p: 1 }}>
                      <Avatar
                        src={product.image}
                        alt={product.name}
                        sx={{ width: 64, height: 64 }}
                      />
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {product.brand}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                          <CurrencyRupee sx={{ fontSize: '1rem', color: 'primary.main' }} />
                          <Typography variant="h6" color="primary.main" fontWeight={700}>
                            {product.price.toLocaleString()}
                          </Typography>
                        </Box>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => onRemoveProduct(product.id)}
                        aria-label={`Remove ${product.name} from comparison`}
                        sx={{ 
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          backgroundColor: 'error.main',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'error.dark'
                          }
                        }}
                      >
                        <Clear fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell 
                  sx={{ 
                    fontWeight: 600,
                    backgroundColor: 'background.default',
                    position: 'sticky',
                    left: 0,
                    zIndex: 10
                  }}
                >
                  Key Features
                </TableCell>
                {products.map((product: Product) => (
                  <TableCell key={product.id} sx={{ verticalAlign: 'top', p: 1 }}>
                    <List dense>
                      {product.features.map((feature: string, index: number) => (
                        <ListItem key={index} disableGutters sx={{ py: 0.25 }}>
                          <ListItemIcon sx={{ minWidth: 20 }}>
                            <Circle color="primary" sx={{ fontSize: 8 }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={feature}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </TableCell>
                ))}
              </TableRow>
              
              {allSpecs.map((spec: string) => (
                <TableRow 
                  key={spec}
                  sx={{ 
                    backgroundColor: compareValues(spec) ? 'rgba(37, 99, 235, 0.05)' : 'transparent'
                  }}
                >
                  <TableCell 
                    sx={{ 
                      fontWeight: 600,
                      backgroundColor: 'background.default',
                      position: 'sticky',
                      left: 0,
                      zIndex: 10,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    {spec.charAt(0).toUpperCase() + spec.slice(1).replace(/([A-Z])/g, ' $1')}
                    {compareValues(spec) && (
                      <Chip
                        icon={<FlashOn />}
                        label="Differs"
                        size="small"
                        color="warning"
                        variant="outlined"
                        title="Values differ across products"
                      />
                    )}
                  </TableCell>
                  {products.map((product: Product) => (
                    <TableCell 
                      key={product.id}
                      sx={{ 
                        fontWeight: compareValues(spec) ? 600 : 400,
                        backgroundColor: compareValues(spec) ? 'rgba(37, 99, 235, 0.1)' : 'transparent'
                      }}
                    >
                      {getSpecValue(product, spec)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <FlashOn color="warning" fontSize="small" />
          <Typography variant="body2" color="text.secondary">
            Specifications that differ between products are highlighted
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default ComparisonPanel;