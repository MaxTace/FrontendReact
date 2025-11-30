import React, { useState, useEffect } from 'react';
import { 
  ThemeProvider, 
  createTheme 
} from '@mui/material/styles';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Container
} from '@mui/material';

const ThemeDemo = () => {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme');
    if (savedTheme) {
      setMode(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('app-theme', mode);
  }, [mode]);

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#1976d2' : '#90caf9',
      },
      secondary: {
        main: mode === 'light' ? '#dc004e' : '#f48fb1',
      },
    },
  });

  const toggleTheme = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ py: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 4 
        }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Демонстрация переключения тем
            </Typography>
            <Typography>
              Текущая тема: <strong>{mode === 'light' ? 'Светлая' : 'Тёмная'}</strong>
            </Typography>
          </Box>
          
          <Button 
            variant="contained" 
            onClick={toggleTheme}
            size="large"
          >
            {mode === 'light' ? '🌙 Тёмная тема' : '☀️ Светлая тема'}
          </Button>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Демонстрационная карточка
              </Typography>
              <Typography>
                Эта карточка показывает как выглядит контент в {mode === 'light' ? 'светлой' : 'тёмной'} теме.
              </Typography>
              <Box sx={{ mt: 2, p: 2, bgcolor: 'primary.main', color: 'white', borderRadius: 1 }}>
                Primary цвет темы
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ThemeDemo;