import React, { useState, useEffect } from "react";
import axios from "axios";
import { NFTGrid } from "./NFTGrid"; // แก้ไขเส้นทางตามต้องการ
import { fetchNFTsForOwner } from "../services/nftService"; // แก้ไขเส้นทางตามต้องการ

const ProfileSection = ({ address }) => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNFTs = async (address) => {
      setLoading(true);
      try {
        const nftsData = await fetchNFTsForOwner(address); // ฟังก์ชันที่ดึงข้อมูล NFTs จาก API
        setNfts(nftsData); // เก็บข้อมูล NFT
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      } finally {
        setLoading(false); // ปิดสถานะโหลด
      }
    };

    if (address) {
      fetchNFTs(address);
    }
  }, [address]);

  if (loading) {
    return <div>Loading...</div>; // คุณสามารถเพิ่ม Spinner หรือ Skeleton แทนได้
  }

  // แสดง NFTs
  return <NFTGrid nfts={nfts} loading={loading} />;
};

export default ProfileSection;
