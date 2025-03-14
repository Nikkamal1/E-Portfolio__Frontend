import React from "react";
import PropTypes from "prop-types";

const NFTDetailsModal = ({ nft, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full flex flex-col md:flex-row relative">
      
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>

        <div className=" flex justify-center items-center w-auto">
          <img
            src={nft.image}
            alt={nft.name}
            className="w-full max-w-xs md:max-auto  h-auto rounded-lg"
          />
        </div>

        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{nft.name}</h2>
          <p className="text-lg md:text-xl mb-2"><strong>Collection:</strong> {nft.collection}</p>
          <p className="text-lg md:text-xl mb-2"><strong>Owner:</strong> {nft.owner}</p>
          <p className="text-lg md:text-xl mb-2"><strong>Contract Address:</strong> {nft.contractAddress}</p>
          <p className="text-lg md:text-xl mb-2"><strong>Creator:</strong> {nft.creator}</p>

          <div className="text-lg md:text-xl mb-2">
            <strong>Properties:</strong>
            {Array.isArray(nft.properties) 
              ? nft.properties.map((property, index) => (
                  <span key={index} className="block text-sm md:text-base">
                    {property.trait_type}: {property.value}
                  </span>
                ))
              : <span className="block text-sm md:text-base">{nft.properties}</span>}
          </div>

          <p className="text-lg md:text-xl mb-4"><strong>Description:</strong> {nft.description}</p>
          
          <a
            href={nft.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 text-lg md:text-xl"
          >
            View Details
          </a>
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
    owner: PropTypes.string.isRequired,
    contractAddress: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tokenId: PropTypes.string.isRequired,
    properties: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          trait_type: PropTypes.string,
          value: PropTypes.string,
        })
      ),
      PropTypes.string
    ]), 
    link: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NFTDetailsModal;
