import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from './ErrorBoundary';
import { LoadingState } from './components/LoadingState';
import { AppRoutes } from './routes';
import { Header, Sidebar } from './components/layout';
import { AuthProvider } from './hooks/useAuth';
import { ThemeProvider } from './hooks/useTheme';
import { A11yProvider } from './components/accessibility/A11yProvider';
import { useStore } from './store';
import './styles/globals.css';

const App: React.FC = () => {
  const isLoading = useStore(state => state.isLoading);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          <A11yProvider>
            <BrowserRouter>
              <LoadingState isLoading={isLoading}>
                <div className="app-container">
                  <Header />
                  <div className="main-content">
                    <Sidebar />
                    <main className="page-content">
                      <Suspense fallback={<Loading size="lg" text="Loading page..." />}>
                        <AppRoutes />
                      </Suspense>
                    </main>
                  </div>
                </div>
              </LoadingState>
            </BrowserRouter>
          </A11yProvider>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};