import { BrowserRouter, useLocation } from 'react-router-dom';
import { AppRoutes } from './routes';
import { AppThemeProvider, DrawerProvider } from './shared/contexts';
import { SnackbarProvider } from 'notistack';
import { MenuLateral } from './shared/components';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useFotoUsuarioContext } from './shared/contexts/FotoUsuarioContext';

const AppWithRouterContent = () => {
  const location = useLocation();
  const semMenuRoutes = ['/tela-login', '/cadastro-user'];
  const isLoginPage = semMenuRoutes.includes(location.pathname);

  const { reloadFoto } = useFotoUsuarioContext();

  useEffect(() => {
    reloadFoto();
  }, [reloadFoto]); // ✅ Chama uma única vez ao iniciar

  return (
    <SnackbarProvider 
      maxSnack={3}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={3000}
    >
      <ToastContainer position="top-right" autoClose={3000} />
      {isLoginPage ? (
        <AppRoutes />
      ) : (
        <MenuLateral>
          <AppRoutes />
        </MenuLateral>
      )}
    </SnackbarProvider>
  );
};

export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <AppWithRouterContent />
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
};
