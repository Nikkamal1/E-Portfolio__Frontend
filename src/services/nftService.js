export const fetchNFTsForOwner = async (address) => {
  try {
    const response = await fetch(
      `https://base-mainnet.g.alchemy.com/v2/DWcwxgYIUU3nxQRioRQb0JhXMxFph4vN/getNFTsForOwner?owner=${address}`
    );
    const data = await response.json();

    console.log("Fetched NFT data:", data);

    const nftDetails = await Promise.all(
      (data.ownedNfts || []).map(async (nft) => {
        let collectionName = nft.contractMetadata?.name || "Unknown Collection";

        if (!collectionName) {
          collectionName = await fetchCollectionName(nft.contract.address);
        }

        if (!collectionName && nft.metadata) {
          collectionName = nft.metadata.name || "Unnamed NFT";
        }

        const description = nft.metadata?.description || "No description available";
        const properties = nft.metadata?.attributes || "Not specified";
        const image = nft.media && nft.media[0]?.gateway
          ? nft.media[0]?.gateway
          : nft.metadata?.image || "/placeholder.svg";

        const tokenId = nft.id.tokenId;
        const contractAddress = nft.contract.address;

        return {
          id: `${contractAddress}-${tokenId}`,
          name: nft.title || nft.metadata?.name || `Token #${tokenId}`,
          image: image,
          collection: collectionName,
          owner: address,
          contractAddress,
          creator: nft.contractMetadata?.deployedBy || nft.metadata?.creator || "Unknown Creator",
          properties,
          description,
          tokenId,
          link: `https://basescan.org/nft/${contractAddress}/${parseInt(tokenId, 16)}`,
        };
      })
    );
        // รายการ Collection ที่ต้องการซ่อน (แก้ไขได้ง่าย)
        const hiddenCollections = [
          "# UP $5,000 TO $50,000",
          "[ #175 ] Scan the QR to get a reward",
          "! [#] AutoETH 1483"
        ];
    // กรอง NFT ที่ไม่ต้องการให้แสดง โดยใช้ hiddenCollections
    const filteredNFTs = nftDetails.filter(nft => !hiddenCollections.includes(nft.collection));
    
    return filteredNFTs;
  } catch (error) {
    console.error("Failed to fetch NFTs", error);
    return [];
  }
};
