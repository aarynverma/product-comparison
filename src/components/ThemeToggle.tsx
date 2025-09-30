import React from 'react';
import { IconButton, Tooltip, Box, Typography } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { ThemeToggleProps } from '../types';

const ThemeToggle: React.FC<ThemeToggleProps> = ({ darkMode, onToggle }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Tooltip title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}>
        <IconButton 
          onClick={() => onToggle(!darkMode)}
          color="inherit"
          aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          sx={{ 
            borderRadius: 2,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }
          }}
        >
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Tooltip>
      <Typography 
        variant="body2" 
        sx={{ 
          display: { xs: 'none', sm: 'block' },
          color: 'inherit',
          fontWeight: 500
        }}
      >
        {darkMode ? 'Dark' : 'Light'}
      </Typography>
    </Box>
  );
};

export default ThemeToggle;