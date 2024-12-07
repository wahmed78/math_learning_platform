import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { Loading } from './components/common/Loading';

// Lazy loaded components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Learning = lazy(() => import('./pages/Learning'));
const Practice = lazy(() => import('./pages/Practice'));
const Progress = lazy(() => import('./pages/Progress'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading size="lg" text="Loading page..." />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        {/* Additional routes... */}

        {/* Analytics Routes */}
        <Route
          path="/analytics"
          element={
            <PrivateRoute>
              <Route path="performance" element={<PerformanceAnalytics />} />
              <Route path="progress" element={<ProgressAnalytics />} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};