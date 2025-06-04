import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Components
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import LoadingSpinner from './components/UI/LoadingSpinner';

// Lazy-loaded pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));
const ForgotPassword = lazy(() => import('./pages/Auth/ForgotPassword'));

// Citizen Pages
const CitizenDashboard = lazy(() => import('./pages/Citizen/Dashboard'));
const NewRequest = lazy(() => import('./pages/Citizen/NewRequest'));
const RequestTracking = lazy(() => import('./pages/Citizen/RequestTracking'));
const RequestDetail = lazy(() => import('./pages/Citizen/RequestDetail'));
const Payment = lazy(() => import('./pages/Citizen/Payment'));
const Profile = lazy(() => import('./pages/Citizen/Profile'));

// Agent Pages
const AgentDashboard = lazy(() => import('./pages/Agent/Dashboard'));
const RequestsList = lazy(() => import('./pages/Agent/RequestsList'));
const ProcessRequest = lazy(() => import('./pages/Agent/ProcessRequest'));
const GenerateDocument = lazy(() => import('./pages/Agent/GenerateDocument'));
const History = lazy(() => import('./pages/Agent/History'));

// Admin Pages
const AdminDashboard = lazy(() => import('./pages/Admin/Dashboard'));
const UserManagement = lazy(() => import('./pages/Admin/UserManagement'));
const DocumentTypes = lazy(() => import('./pages/Admin/DocumentTypes'));
const PaymentTracking = lazy(() => import('./pages/Admin/PaymentTracking'));
const Statistics = lazy(() => import('./pages/Admin/Statistics'));


const App = () => {
  const { user, isLoading, checkAuthStatus } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <Suspense fallback={<LoadingSpinner size="large" />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Citizen routes */}
        <Route path="/citizen" element={
          <ProtectedRoute allowedRoles={['citizen']}>
            <Layout userType="citizen" />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/citizen/dashboard\" replace />} />
          <Route path="dashboard" element={<CitizenDashboard />} />
          <Route path="new-request" element={<NewRequest />} />
          <Route path="requests" element={<RequestTracking />} />
          <Route path="requests/:id" element={<RequestDetail />} />
          <Route path="payment/:id" element={<Payment />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        
        {/* Agent routes */}
        <Route path="/agent" element={
          <ProtectedRoute allowedRoles={['agent']}>
            <Layout userType="agent" />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/agent/dashboard\" replace />} />
          <Route path="dashboard" element={<AgentDashboard />} />
          <Route path="requests" element={<RequestsList />} />
          <Route path="process/:id" element={<ProcessRequest />} />
          <Route path="generate/:id" element={<GenerateDocument />} />
          <Route path="history" element={<History />} />
        </Route>
        
        {/* Admin routes */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Layout userType="admin" />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/admin/dashboard\" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="document-types" element={<DocumentTypes />} />
          <Route path="payments" element={<PaymentTracking />} />
          <Route path="statistics" element={<Statistics />} />
        </Route>
        
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/\" replace />} />
      </Routes>
    </Suspense>
  );
};

export default App;