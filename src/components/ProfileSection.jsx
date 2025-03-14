import React, { useState, useEffect } from "react";
import { NFTGrid } from "./NFTGrid"; 
import { fetchNFTsForOwner } from "../services/nftService"; 

const ProfileSection = ({ address }) => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNFTs = async (address) => {
      setLoading(true);
      try {
        const nftsData = await fetchNFTsForOwner(address); 
        setNfts(nftsData); 
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      } finally {
        setLoading(false); 
      }
    };

    if (address) {
      fetchNFTs(address);
    }
  }, [address]);

  if (loading) {
    return <div>Loading...</div>; 
  }
  return <NFTGrid nfts={nfts} loading={loading} />;
};

export default ProfileSection;
