import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    education: "",
    workExperience: "",
    skills: "",
    portfolio: "",
    awards: "",
  });
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ดึงข้อมูลจาก localStorage
  useEffect(() => {
    const storedAddress = localStorage.getItem("userAddress");
    if (storedAddress) {
      setAddress(storedAddress);
    } else {
      console.error("Wallet address not found. Please connect your wallet.");
      navigate("/login");
    }
  }, [navigate]);

  // ดึงข้อมูลโปรไฟล์มาเติมในแบบฟอร์ม
  useEffect(() => {
    const fetchProfile = async () => {
      if (!address) return;

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
            name: matchedProfile.name || "",
            bio: matchedProfile.bio || "",
            education: matchedProfile.education || "",
            workExperience: matchedProfile.workExperience || "",
            skills: matchedProfile.skills || "",
            portfolio: matchedProfile.portfolio || "",
            awards: matchedProfile.awards || "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [address]);

  // ฟังก์ชันจัดการการเปลี่ยนแปลงของแบบฟอร์ม
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // ฟังก์ชันบันทึกโปรไฟล์
  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://47.129.238.41:3000/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...profile, walletAddress: address }),
      });

      if (!response.ok) {
        throw new Error(`Failed to save profile: ${response.statusText}`);
      }

      navigate("/profile"); // กลับไปที่หน้าโปรไฟล์
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout isLoggedIn={!!address}>
      <div className="min-h-screen py-10 px-4 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Edit Profile</h1>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-md focus:ring-primary focus:border-primary"
            />

            <textarea
              placeholder="Tell us about yourself"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              className="w-full border p-3 rounded-md resize-none h-24 focus:ring-primary focus:border-primary"
            />

            <input
              type="text"
              placeholder="Enter your education details"
              name="education"
              value={profile.education}
              onChange={handleChange}
              className="w-full border p-3 rounded-md focus:ring-primary focus:border-primary"
            />

            <textarea
              placeholder="Enter your work experience (Each line starts with '●')"
              name="workExperience"
              value={profile.workExperience}
              onChange={handleChange}
              className="w-full border p-3 rounded-md resize-none h-24 focus:ring-primary focus:border-primary"
            />

            <input
              type="text"
              placeholder="Enter your skills (separate with commas)"
              name="skills"
              value={profile.skills}
              onChange={handleChange}
              className="w-full border p-3 rounded-md focus:ring-primary focus:border-primary"
            />

            <input
              type="text"
              placeholder="Enter your portfolio links"
              name="portfolio"
              value={profile.portfolio}
              onChange={handleChange}
              className="w-full border p-3 rounded-md focus:ring-primary focus:border-primary"
            />

            <input
              type="text"
              placeholder="Enter any awards you've received"
              name="awards"
              value={profile.awards}
              onChange={handleChange}
              className="w-full border p-3 rounded-md focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={() => navigate("/profile")}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;
