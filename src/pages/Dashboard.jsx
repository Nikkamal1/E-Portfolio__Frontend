import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { fetchNFTsForOwner } from "../services/nftService";

const Dashboard = () => {
  const [address, setAddress] = useState(null);
  const [nftSummary, setNftSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  // ดึงข้อมูล address จาก localStorage
  useEffect(() => {
    const storedAddress = localStorage.getItem("userAddress");
    if (storedAddress) {
      setAddress(storedAddress);
    } else {
      console.error("Wallet address not found. Please connect your wallet.");
    }
  }, []);

  // ดึงข้อมูล NFTs และสร้างสรุป
  useEffect(() => {
    const fetchNFTSummary = async () => {
      if (!address) return;

      setLoading(true);
      try {
        console.log("Fetching NFTs for address:", address);
        const nfts = await fetchNFTsForOwner(address);

        const summary = {
          totalNFTs: nfts.length,
          collections: {},
          creators: {},
        };

        nfts.forEach((nft) => {
          // นับจำนวนในแต่ละ Collection
          summary.collections[nft.collection] =
            (summary.collections[nft.collection] || 0) + 1;

          // นับจำนวนในแต่ละ Creator
          summary.creators[nft.creator] =
            (summary.creators[nft.creator] || 0) + 1;
        });

        setNftSummary(summary);
      } catch (error) {
        console.error("Error fetching NFT summary:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTSummary();
  }, [address]);

  // ฟังก์ชันสำหรับ Logout
  const handleLogout = () => {
    localStorage.removeItem("userAddress");
    setAddress(null);
    setNftSummary(null);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Layout isLoggedIn={!!address} onLogout={handleLogout}>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">NFT Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Overview of your NFT portfolio and collections.
            </p>
          </header>

          {loading ? (
            <div className="text-center text-lg font-medium text-gray-500">
              Loading...
            </div>
          ) : nftSummary ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-primary-light/10 to-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold text-gray-900">Total NFTs</h2>
                <p className="text-3xl font-bold text-primary">
                  {nftSummary.totalNFTs}
                </p>
              </div>
              <div className="bg-gradient-to-br from-secondary-light/10 to-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold text-gray-900">Collections</h2>
                <ul className="list-disc pl-5 text-gray-700 mt-2">
                  {Object.entries(nftSummary.collections).map(
                    ([collection, count]) => (
                      <li key={collection} className="mt-1">
                        {collection}: {count} NFT(s)
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold text-gray-900">Creators</h2>
                <ul className="list-disc pl-5 text-gray-700 mt-2">
                  {Object.entries(nftSummary.creators).map(
                    ([creator, count]) => (
                      <li key={creator} className="mt-1">
                        {creator}: {count} NFT(s)
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center text-lg font-medium text-gray-500">
              No NFTs found for your wallet.
            </div>
          )}
        </main>
      </Layout>
    </div>
  );
};


export default Dashboard;
