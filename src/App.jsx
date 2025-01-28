import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Routes, Route, Navigate } from "react-router-dom";
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Toaster } from "react-hot-toast";
import EditProfile from './pages/EditProfile';
import Dashboard from './pages/Dashboard';
import Index from './pages/Index';
import ViewProfile from './pages/ViewProfile';
import LoginPage from './pages/LoginPage';

const queryClient = new QueryClient();

// ฟังก์ชันตรวจสอบว่าผู้ใช้ล็อกอินหรือยัง
const isAuthenticated = () => !!localStorage.getItem("userAddress");

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

const App = () => (
  <ThirdwebProvider 
    clientId="8453" 
    activeChain="ethereum"
  >
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Routes>
        {/* เส้นทางสำหรับผู้ใช้ที่ล็อกอิน */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/nfts" 
          element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ViewProfile />
            </ProtectedRoute>
          } 
        />
         <Route 
          path="/editprofile" 
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          } 
        />

        {/* เส้นทางสำหรับหน้าล็อกอิน */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </QueryClientProvider>
  </ThirdwebProvider>
);

export default App;
