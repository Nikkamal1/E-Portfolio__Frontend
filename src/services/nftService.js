// ฟังก์ชันหลักสำหรับดึงข้อมูล NFTs ของเจ้าของ
export const fetchNFTsForOwner = async (address) => {
  try {
    // ดึงข้อมูลจาก Alchemy API เพื่อรับข้อมูล NFTs
    const response = await fetch(
      `https://base-mainnet.g.alchemy.com/v2/DWcwxgYIUU3nxQRioRQb0JhXMxFph4vN/getNFTsForOwner?owner=${address}`
    );
    const data = await response.json();

    console.log("Fetched NFT data:", data); // ตรวจสอบข้อมูลที่ได้รับ

    // การ map ข้อมูล NFT เพื่อดึงข้อมูลที่จำเป็น
    const nftDetails = await Promise.all(
      (data.ownedNfts || []).map(async (nft) => {
        let collectionName = nft.contractMetadata?.name || "Unknown Collection";

        // ลองดึงชื่อ Collection จาก OpenSea หากไม่พบใน metadata
        if (!collectionName) {
          collectionName = await fetchCollectionName(nft.contract.address);
        }

        // หากยังไม่พบ ลองดึงจาก metadata โดยตรง
        if (!collectionName && nft.metadata) {
          collectionName = nft.metadata.name || "Unnamed NFT";
        }

        // คืนค่าข้อมูล NFT ที่จัดเตรียมแล้ว
        return {
          id: `${nft.contract.address}-${nft.id.tokenId}`,
          name: nft.title || nft.metadata?.name || `Token #${nft.id.tokenId}`,
          image: nft.media[0]?.gateway || nft.metadata?.image || "/placeholder.svg",
          collection: collectionName,
          owner: address, // เจ้าของที่ระบุ
          contractAddress: nft.contract.address,
          creator: nft.contractMetadata?.deployedBy || nft.metadata?.creator || "Unknown Creator",
          classification: "Off-Chain (IPFS)", // ระบุการจัดประเภทเป็น Off-Chain (IPFS) หรือแบบอื่น
          tokenId: nft.id.tokenId,
          tokenStandard: nft.id.tokenMetadata?.tokenType || "ERC-721",
        };
      })
    );

    return nftDetails; // คืนค่าข้อมูล NFT ที่จัดเตรียมแล้ว
  } catch (error) {
    console.error("Failed to fetch NFTs", error); // หากเกิดข้อผิดพลาดในการดึงข้อมูล
    return []; // คืนค่าข้อมูลเป็น array ว่าง
  }
};

// ฟังก์ชันเสริมเพื่อดึงชื่อ Collection จาก OpenSea
const fetchCollectionName = async (contractAddress) => {
  try {
    // ใช้ OpenSea API เพื่อดึงข้อมูลจาก Contract Address
    const response = await fetch(`https://api.opensea.io/api/v1/asset_contract/${contractAddress}`);
    const data = await response.json();
    
    // คืนค่าชื่อ Collection หรือ "Unknown Collection" หากไม่พบข้อมูล
    return data.collection?.name || "Unknown Collection";
  } catch (error) {
    console.error("Failed to fetch collection name from OpenSea:", error); // ถ้าเกิดข้อผิดพลาด
    return "Unknown Collection"; // คืนค่าชื่อ Collection ที่ไม่พบ
  }
};
