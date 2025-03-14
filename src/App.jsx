import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Toaster } from "react-hot-toast";
import EditProfile from './pages/EditProfile';
import Dashboard from './pages/Dashboard';
import Certificate from './pages/Certificate';
import ViewProfile from './pages/ViewProfile';
import LoginPage from './pages/LoginPage';

// สร้าง QueryClient สำหรับ React Query
const queryClient = new QueryClient();

// ฟังก์ชันตรวจสอบการล็อกอิน
const isAuthenticated = () => !!localStorage.getItem("userAddress");

// ProtectedRoute ใช้ในการควบคุมการเข้าถึงหน้าต่างๆ
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

const App = () => (
  <HashRouter>
    <ThirdwebProvider clientId="8453" activeChain="ethereum">
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Routes>
          {/* เส้นทางต่างๆ */}
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/certificate" element={<ProtectedRoute><Certificate /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ViewProfile /></ProtectedRoute>} />
          <Route path="/editprofile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </QueryClientProvider>
    </ThirdwebProvider>
  </HashRouter>
);

export default App;
