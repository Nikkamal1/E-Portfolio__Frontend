import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import ProfileSection from "../components/ProfileSection";
import { fetchNFTsForOwner } from "../services/nftService";

const Index = () => {
  const [address, setAddress] = useState(localStorage.getItem("userAddress"));
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

export default Index;
