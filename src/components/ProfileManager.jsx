import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

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

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setToastMessage("Please upload a valid image file.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setToastMessage("Please upload an image smaller than 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.onerror = () => {
        setToastMessage("Failed to read the image file.");
      };
      reader.readAsDataURL(file);
    }
  };

  const submitProfile = async (profileData) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/profile", profileData);
      setToastMessage("Your profile has been saved successfully.");
      onProfileComplete(response.data);
    } catch (error) {
      console.error("Error saving profile:", error);
      setToastMessage("There was an error saving your profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!name.trim() || !bio.trim() || !education.trim() || !workExperience.trim()) {
      setToastMessage("Please complete all fields to continue.");
      return;
    }

    submitProfile({
      name,
      bio,
      image: profileImage,
      education,
      workExperience,
      skills,
      portfolio,
      awards,
      walletAddress,
    });
  };

  return (
    <Layout>
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 space-y-6">
      {/* Profile Image */}
      {/* <div className="w-24 h-24 mx-auto rounded-full overflow-hidden">
        <img src={profileImage || "/placeholder.svg"} alt="Profile Picture" />
      </div> */}

      {/* Image Upload */}
      {/* <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full border p-2 mt-4"
        aria-label="Upload Profile Picture"
      /> */}

      {/* Name Input */}
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 mt-4 rounded-md"
        aria-label="Name"
      />

      {/* Bio Textarea */}
      <textarea
        placeholder="Tell us about yourself"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="w-full border p-2 mt-4 resize-none h-24 rounded-md"
        aria-label="Bio"
      />

      {/* Education Input */}
      <input
        type="text"
        placeholder="Enter your education details"
        value={education}
        onChange={(e) => setEducation(e.target.value)}
        className="w-full border p-2 mt-4 rounded-md"
        aria-label="Education"
      />

      {/* Work Experience Input */}
      <input
        type="text"
        placeholder="Enter your work experience"
        value={workExperience}
        onChange={(e) => setWorkExperience(e.target.value)}
        className="w-full border p-2 mt-4 rounded-md"
        aria-label="Work Experience"
      />

      {/* Skills Input */}
      <input
        type="text"
        placeholder="Enter your skills"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        className="w-full border p-2 mt-4 rounded-md"
        aria-label="Skills"
      />

      {/* Portfolio Input */}
      <input
        type="text"
        placeholder="Enter your portfolio links"
        value={portfolio}
        onChange={(e) => setPortfolio(e.target.value)}
        className="w-full border p-2 mt-4 rounded-md"
        aria-label="Portfolio"
      />

      {/* Awards Input */}
      <input
        type="text"
        placeholder="Enter any awards you've received"
        value={awards}
        onChange={(e) => setAwards(e.target.value)}
        className="w-full border p-2 mt-4 rounded-md"
        aria-label="Awards"
      />

      {/* Wallet Address Display */}
      <div className="text-gray-500 mt-4">
        <strong>Wallet Address:</strong>
        <p className="truncate bg-gray-100 p-2 rounded-md">{walletAddress}</p>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-primary text-white py-2 mt-4 rounded-md hover:bg-primary/90"
      >
        {loading ? "Saving..." : "Complete Profile"}
      </button>

      {/* Toast Message */}
      {toastMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-md">
          <p>{toastMessage}</p>
        </div>
      )}
    </div>
    </Layout>
  );
};

export default ProfileManager;
