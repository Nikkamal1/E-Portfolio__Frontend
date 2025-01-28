import React from "react";
import PropTypes from "prop-types";

const NFTDetailsModal = ({ nft, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-7xl w-full flex relative">
        {/* ปุ่มปิดที่มุมขวาบน */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        {/* แสดงรูปภาพทางซ้าย */}
        <div className="w-1/2">
          <img
            src={nft.image}
            alt={nft.name}
            className="w-full h-auto rounded-lg"
          />
        </div>
        {/* แสดงรายละเอียดทางขวา */}
        <div className="w-1/2 p-4">
          <h2 className="text-5xl font-bold mb-8">{nft.name}</h2>
          <p className="text-2xl mb-4">Collection: {nft.collection}</p>
          <p className="text-2xl mb-4">Owner: {nft.owner}</p>
          <p className="text-2xl mb-4">Contract Address: {nft.contractAddress}</p>
          <p className="text-2xl mb-4">Creator: {nft.creator}</p>
          <p className="text-2xl mb-4">Classification: {nft.classification}</p>
          <p className="text-2xl mb-4">Token Standard: {nft.tokenStandard}</p>
        </div>
      </div>
    </div>
  );
};

NFTDetailsModal.propTypes = {
  nft: PropTypes.shape({
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
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NFTDetailsModal;
