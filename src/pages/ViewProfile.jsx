import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ProfileManager from "../components/ProfileManager";
import { fetchNFTsForOwner } from "../services/nftService.js"; // ฟังก์ชันสำหรับดึงข้อมูล NFT

const ViewProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nftLoading, setNFTLoading] = useState(false);
  const [nfts, setNFTs] = useState([]);
  const [address, setAddress] = useState(null);

  // ดึงข้อมูลจาก localStorage
  useEffect(() => {
    const storedAddress = localStorage.getItem("userAddress");
    if (storedAddress) {
      setAddress(storedAddress);
    } else {
      console.error("Wallet address not found. Please connect your wallet.");
    }
  }, []);

  // ดึงข้อมูลโปรไฟล์จาก API
  useEffect(() => {
    const fetchProfile = async () => {
      if (!address) return;

      setLoading(true);
      try {
        const response = await fetch(
          `http://47.129.238.41:3000/api/profile?address=${address}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.statusText}`);
        }

        const data = await response.json();
        const matchedProfile = data.find(
          (item) => item.walletAddress === address
        );

        if (matchedProfile) {
          setProfile({
            name: matchedProfile.name,
            bio: matchedProfile.bio,
            education: matchedProfile.education,
            workExperience: matchedProfile.workExperience,
            skills: matchedProfile.skills
              ? matchedProfile.skills.split(",")
              : [],
            portfolio: matchedProfile.portfolio,
            awards: matchedProfile.awards,
            walletAddress: matchedProfile.walletAddress,
          });
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [address]);

  // ดึงข้อมูล NFT ของผู้ใช้งาน
  useEffect(() => {
    const fetchUserNFTs = async () => {
      if (!address) return;

      setNFTLoading(true);
      try {
        const userNFTs = await fetchNFTsForOwner(address); // ฟังก์ชันที่สร้างใน services/nftService.js
        setNFTs(userNFTs);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      } finally {
        setNFTLoading(false);
      }
    };

    fetchUserNFTs();
  }, [address]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("userAddress");
    setAddress(null);
    setProfile(null);
  };

  return (
    <Layout isLoggedIn={!!address} profile={profile} onLogout={handleLogout}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-10">
        <header className="mb-8 text-center">
          <h1 className="text-xl font-bold text-gray-900">Professional Summary</h1>
        </header>

        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
          {/* แสดงโปรไฟล์ */}
          {loading ? (
            <div className="text-center text-gray-600">Loading profile...</div>
          ) : profile === null ? (
            <ProfileManager walletAddress={address} />
          ) : (
            <div className="text-center mb-10">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold">
                {profile.name.slice(0, 2).toUpperCase()}
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mt-4">{profile.name}</h1>
              <p className="text-gray-600 mt-2">{profile.bio}</p>
            </div>
          )}

          {/* ข้อมูลโปรไฟล์ */}
          {profile && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Education</h2>
                <div className="text-gray-600">
                  {profile.education
                    .split("\n")
                    .map((item, index) => (
                      <p key={index} className="flex items-center">
                        <span className="mr-2">●</span>
                        {item}
                      </p>
                    ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>
                <div className="text-gray-600">
                  {profile.workExperience
                    .split("\n")
                    .map((item, index) => (
                      <p key={index} className="flex items-center">
                        <span className="mr-2">●</span>
                        {item}
                      </p>
                    ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800">Portfolio</h2>
                <div className="text-gray-600">
                  {profile.portfolio.split("\n").map((item, index) => {
                    const isLink = /^https?:\/\/[^\s]+$/.test(item.trim());

                    return (
                      <p key={index} className="flex items-center">
                        <span className="mr-2">●</span>
                        {isLink ? (
                          <a
                            href={item.trim()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {item.trim()}
                          </a>
                        ) : (
                          item
                        )}
                      </p>
                    );
                  })}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800">Awards</h2>
                <div className="text-gray-600">
                  {profile.awards
                    .split("\n")
                    .map((item, index) => (
                      <p key={index} className="flex items-center">
                        <span className="mr-2">●</span>
                        {item}
                      </p>
                    ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800">Wallet Address</h2>
                <p className="text-gray-600 font-mono text-sm">{profile.walletAddress}</p>
              </div>
            </div>
          )}
        </div>

        {/* แสดง NFT */}
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Certificate</h2>

          {nftLoading ? (
            <div className="text-center text-gray-600">Loading NFTs...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {nfts
                .slice()
                .sort((a, b) => new Date(b.mintedDate) - new Date(a.mintedDate)) // เรียง NFT ตามวันที่ล่าสุด
                .slice(0, 3) // แสดงเฉพาะ 3 รายการแรก
                .map((nft, index) => (
                  <div key={index} className="flex flex-col items-center text-center p-2">
                    <div className="w-32 h-32 overflow-hidden flex items-center justify-center bg-gray-100">
                      <img
                        src={nft.image}
                        alt={nft.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    <h3 className="mt-2 text-sm font-medium text-gray-800 truncate">
                      {nft.name}
                    </h3>
                  </div>
                ))}
            </div>
          )}

          <div className="mt-6 text-right">
            <a
              href="#/nfts"
              className="inline-block bg-primary text-white px-6 py-2 rounded-lg font-medium text-lg hover:bg-primary/90 transition-all"
            >
              View All Certificate &rarr;
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewProfile;
