import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import AppLayout from '@/components/layout/AppLayout';
import Dashboard from '@/pages/Dashboard';
import UserProfiles from '@/pages/UserProfiles';
import UserDetail from '@/pages/UserDetail';
import ActivityLog from '@/pages/ActivityLog';
import Alerts from '@/pages/Alerts';
import DetectionRules from '@/pages/DetectionRules';
import ResearchArchitecture from '@/pages/ResearchArchitecture';
import MLEngine from '@/pages/MLEngine';
import RiskScoring from '@/pages/RiskScoring';
import ExplainableAI from '@/pages/ExplainableAI';
import AutomatedResponsePage from '@/pages/AutomatedResponsePage';
import AttackSimulation from '@/pages/AttackSimulation';
import Presentation from '@/pages/Presentation';

const AuthenticatedApp = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/user-not-registered" element={<UserNotRegisteredError />} />

      <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<UserProfiles />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="/activity" element={<ActivityLog />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/rules" element={<DetectionRules />} />
        <Route path="/architecture" element={<ResearchArchitecture />} />
        <Route path="/ml-engine" element={<MLEngine />} />
        <Route path="/risk-scoring" element={<RiskScoring />} />
        <Route path="/xai" element={<ExplainableAI />} />
        <Route path="/response" element={<AutomatedResponsePage />} />
        <Route path="/simulation" element={<AttackSimulation />} />
        <Route path="/presentation" element={<Presentation />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
          <Toaster />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
