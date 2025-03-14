import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import ProfileSection from "../components/ProfileSection";
import { fetchNFTsForOwner } from "../services/nftService";

const Certificate = () => {
  const [address, setAddress] = useState(null); // ตั้งค่าเริ่มต้นเป็น null
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ดึงข้อมูล address จาก localStorage เมื่อหน้าโหลดใหม่
  useEffect(() => {
    const storedAddress = localStorage.getItem("userAddress");
    if (storedAddress) {
      setAddress(storedAddress);
    } else {
      navigate("/login"); // ถ้าไม่มี address ให้ไปที่หน้าล็อกอิน
    }
  }, [navigate]);  // เพิ่ม navigate เป็น dependency เพื่อให้การเปลี่ยนเส้นทางถูกต้อง

  const fetchNFTs = async (userAddress) => {
    setLoading(true);
    try {
      const nftsData = await fetchNFTsForOwner(userAddress);
      setNfts(nftsData);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userAddress");
    navigate("/login"); // เปลี่ยนเส้นทางไปยังหน้าล็อกอิน
  };

  useEffect(() => {
    if (address) {
      fetchNFTs(address);
    }
  }, [address]);

  return (
    <Layout isLoggedIn={!!address} onLogout={handleLogout}>
      {address && (
        <ProfileSection
          address={address}
          nfts={nfts}
          loading={loading}
        />
      )}
    </Layout>
  );
};

export default Certificate;
