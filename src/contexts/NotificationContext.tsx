import React, { useState, useCallback } from 'react';
import { Alert, Snackbar, AlertColor } from '@mui/material';

export interface NotificationContextType {
  showNotification: (message: string, severity?: AlertColor) => void;
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
  showWarning: (message: string) => void;
  showInfo: (message: string) => void;
}

const NotificationContext = React.createContext<NotificationContextType | undefined>(undefined);

interface NotificationState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<NotificationState>({
    open: false,
    message: '',
    severity: 'info'
  });

  const showNotification = useCallback((message: string, severity: AlertColor = 'info') => {
    setNotification({
      open: true,
      message,
      severity
    });
  }, []);

  const showError = useCallback((message: string) => {
    showNotification(message, 'error');
  }, [showNotification]);

  const showSuccess = useCallback((message: string) => {
    showNotification(message, 'success');
  }, [showNotification]);

  const showWarning = useCallback((message: string) => {
    showNotification(message, 'warning');
  }, [showNotification]);

  const showInfo = useCallback((message: string) => {
    showNotification(message, 'info');
  }, [showNotification]);

  const handleClose = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  const value: NotificationContextType = {
    showNotification,
    showError,
    showSuccess,
    showWarning,
    showInfo
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleClose} 
          severity={notification.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = React.useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};