import React, { useState } from "react";
import { ConnectWallet } from "./ConnectWallet"; // ปรับเส้นทางตามที่ใช้ในโปรเจกต์
import { useNavigate } from "react-router-dom"; // เพิ่ม useNavigate

const Login = ({ onConnect }) => {
  const [toast, setToast] = useState(null);
  const navigate = useNavigate(); // สร้างตัวแปร navigate

  const showToast = ({ title, description }) => {
    setToast({ title, description });
    setTimeout(() => setToast(null), 3000); // Toast จะหายไปหลัง 3 วินาที
  };

  const handleConnect = (address) => {
    onConnect(address);
    showToast({
      title: "Wallet Connected",
      description: `Connected: ${address.slice(0, 6)}...${address.slice(-4)}`,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("userAddress");
    onConnect(null); // รีเซ็ต address หลัง logout
    navigate("/"); // เปลี่ยนเส้นทางไปที่หน้าแรก
  };

  return (
    <div className="text-center">
      {/* ปุ่ม Connect Wallet */}
      <ConnectWallet onConnect={handleConnect} />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-4 right-4 max-w-sm p-4 rounded-lg shadow-lg bg-green-500 text-white">
          <h4 className="font-bold">{toast.title}</h4>
          <p>{toast.description}</p>
        </div>
      )}
    </div>
  );
};

export default Login;
