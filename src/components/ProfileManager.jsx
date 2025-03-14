import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfileManager = ({ walletAddress, onProfileComplete = () => {} }) => {
  const [profileImage, setProfileImage] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [education, setEducation] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [awards, setAwards] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();


  // ฟังก์ชันบันทึกโปรไฟล์
  const submitProfile = async (profileData) => {
    setLoading(true);
    try {
      const response = await axios.post("http://47.129.238.41:3000/api/profile", profileData);
      setToastMessage("Your profile has been saved successfully.");
      onProfileComplete(response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error saving profile:", error);
      setToastMessage("There was an error saving your profile.");
    } finally {
      setLoading(false);
    }
  };

  // ตรวจสอบข้อมูลก่อนบันทึก
  const handleSubmit = () => {
    if (!name.trim()) {
      setToastMessage("Please enter your name to continue.");
      return;
    }
    submitProfile({
      name,
      bio,
      education,
      workExperience,
      skills,
      portfolio,
      awards,
      walletAddress,
    });
  };

  // ฟังก์ชันเมื่อกดปุ่ม Cancel
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Complete Your Profile
      </h1>

      {/* ฟอร์มข้อมูลโปรไฟล์ */}
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-3 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />

        <textarea
          placeholder="Tell us about yourself"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full border p-3 rounded-md resize-none h-24 focus:ring-blue-500 focus:border-blue-500"
        />

        <input
          type="text"
          placeholder="Enter your education details"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          className="w-full border p-3 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />

        <textarea
          placeholder="Enter your work experience"
          value={workExperience}
          onChange={(e) => setWorkExperience(e.target.value)}
          className="w-full border p-3 rounded-md resize-none h-24 focus:ring-blue-500 focus:border-blue-500"
        />

        <input
          type="text"
          placeholder="Enter your skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full border p-3 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />

        <input
          type="text"
          placeholder="Enter your portfolio links"
          value={portfolio}
          onChange={(e) => setPortfolio(e.target.value)}
          className="w-full border p-3 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />

        <input
          type="text"
          placeholder="Enter any awards you've received"
          value={awards}
          onChange={(e) => setAwards(e.target.value)}
          className="w-full border p-3 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* แสดง Wallet Address */}
      <div className="text-gray-500 mt-4 text-sm">
        <strong>Wallet Address:</strong>
        <p className="truncate bg-gray-100 p-3 rounded-md">{walletAddress}</p>
      </div>

      {/* ปุ่ม Cancel และ Save */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
        <button
          onClick={handleCancel}
          className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {loading ? "Saving..." : "Complete Profile"}
        </button>
      </div>

      {/* Toast Message */}
      {toastMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
          <p>{toastMessage}</p>
        </div>
      )}
    </div>
  );
};

export default ProfileManager;
