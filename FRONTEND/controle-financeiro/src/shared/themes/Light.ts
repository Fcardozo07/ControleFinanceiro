import { createTheme} from '@mui/material';


export const lightTheme = createTheme({
palette: {
    mode: 'light',
    background: {
      default: '#f5f7fa', // Fundo principal
      paper: '#ffffff',   // Cards e superfícies
    },
    primary: {
      main: '#1976d2', // Botões principais
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#2e3a59', // Títulos, texto forte
    },
    text: {
      primary: '#2e3a59', // Texto principal
      secondary: '#6b7280', // Texto secundário
    },
    success: {
      main: '#2e7d32',
    },
    error: {
      main: '#d32f2f',
    },
    divider: '#d1d9e6', // Borda entre elementos
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #d1d9e6',
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});
