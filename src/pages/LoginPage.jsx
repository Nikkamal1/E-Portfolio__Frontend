import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import Layout from "../components/Layout";

const LoginPage = () => {
  const navigate = useNavigate();

  // ฟังก์ชันจัดการการล็อกอิน
  const handleLogin = (userAddress) => {
    localStorage.setItem("userAddress", userAddress);
    navigate("/"); // เปลี่ยนเส้นทางไปยังหน้าหลัก
  };

  // ฟังก์ชันจัดการการล็อกเอาต์
  const handleLogout = () => {
    localStorage.removeItem("userAddress");
    navigate("/login"); // เปลี่ยนเส้นทางกลับมาที่หน้าล็อกอิน
  };

  return (
    <div>
      <Layout onLogout={handleLogout}>
        <Login onConnect={handleLogin} />
      </Layout>
    </div>
  );
};

export default LoginPage;
