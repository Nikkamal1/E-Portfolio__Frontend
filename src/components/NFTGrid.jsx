import React, { useState } from "react";
import PropTypes from "prop-types";
import NFTDetailsModal from ".//NFTDetailsModal"; // คอมโพเนนต์ใหม่ที่เราจะสร้าง

export const NFTGrid = ({ nfts = [], loading }) => {
  const [selectedNFT, setSelectedNFT] = useState(null);

  const handleCardClick = (nft) => {
    setSelectedNFT(nft);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="p-4 border rounded-lg shadow-md">
            <div className="w-full h-[200px] bg-gray-200 animate-pulse rounded-lg" />
            <div className="h-4 w-[250px] mt-4 bg-gray-300 animate-pulse" />
            <div className="h-4 w-[200px] mt-2 bg-gray-300 animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  if (!nfts.length) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">No NFTs found in this wallet</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {nfts.map((nft, index) => (
          <div
            key={nft.id || `${nft.name}-${nft.collection}-${index}`}
            className="overflow-hidden transition-transform duration-300 hover:-translate-y-1 cursor-pointer animate-fade-in border rounded-lg shadow-md"
            onClick={() => handleCardClick(nft)} // เพิ่มคลิกการ์ด
          >
            <div className="aspect-square">
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/placeholder.svg";
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg truncate">{nft.name}</h3>
              {nft.collection && (
                <p className="text-sm text-gray-600 truncate">
                  {nft.collection}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* แสดง Modal เมื่อคลิก NFT */}
      {selectedNFT && (
        <NFTDetailsModal nft={selectedNFT} onClose={() => setSelectedNFT(null)} />
      )}
    </>
  );
};

NFTGrid.propTypes = {
  nfts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      collection: PropTypes.string,
      minPrice24h: PropTypes.string,
      lastSaleItem: PropTypes.string,
      lastSaleContract: PropTypes.string,
      owner: PropTypes.string.isRequired,
      contractAddress: PropTypes.string.isRequired,
      creator: PropTypes.string.isRequired,
      classification: PropTypes.string.isRequired,
      tokenId: PropTypes.string.isRequired,
      tokenStandard: PropTypes.string.isRequired,
    })
  ),
  loading: PropTypes.bool.isRequired,
};
