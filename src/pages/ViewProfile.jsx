import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ProfileManager from "../components/ProfileManager"; // แก้ไขเส้นทางตามต้องการ

const ViewProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
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
          `http://localhost:5000/api/profile?address=${address}`
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
          setProfile(null); // ไม่มีโปรไฟล์
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

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("userAddress");
    setAddress(null);
    setProfile(null);
  };

  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  // ถ้าไม่มีโปรไฟล์ให้แสดง ProfileManager
  if (profile === null) {
    return <ProfileManager walletAddress={address} />;
  }

  return (
    <Layout isLoggedIn={!!address} profile={profile} onLogout={handleLogout}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-10">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
          {/* แสดงโปรไฟล์ */}
          <div className="text-center mb-10">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold">
              {profile.name.slice(0, 2).toUpperCase()}
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mt-4">{profile.name}</h1>
            <p className="text-gray-600 mt-2">{profile.bio}</p>
          </div>

          {/* ข้อมูลโปรไฟล์ */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Education</h2>
              <p className="text-gray-600">{profile.education}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>
              <p className="text-gray-600">{profile.workExperience}</p>
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
              <h2 className="text-xl font-semibold text-gray-800">Awards</h2>
              <p className="text-gray-600">{profile.awards}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Wallet Address</h2>
              <p className="text-gray-600 font-mono text-sm">{profile.walletAddress}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewProfile;
