import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, onSettings, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      fetch("http://localhost:5000/api/profile")
        .then((res) => res.json())
        .then((data) => {
          setProfile({ name: data.name, avatar: data.avatar });
        })
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, [isLoggedIn]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    onLogout();
    navigate("/login"); // นำทางไปที่หน้าหลักหลังจากล็อกเอาท์
  };

  return (
    <nav className="flex justify-between items-center bg-white shadow px-6 py-4">
      <h1 className="text-xl font-bold text-primary">E-Portfolio Showcase</h1>

      {isLoggedIn && profile ? (
        <div className="relative">
          {/* Avatar */}
          <img
            src={ "./src/assets/default-avatar.jpg"}
            alt="Profile Avatar"
            className="w-8 h-8 rounded-full cursor-pointer"
            onClick={toggleDropdown}
          />
          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
              <ul className="py-2">
                <li className="hover:bg-gray-100">
                  <button
                    className="w-full text-left px-4 py-2"
                    onClick={() => {
                      toggleDropdown();
                      navigate("/editprofile", { state: { profile } });
                    }}
                  >
                    Edit Profile
                  </button>
                </li>
                <li className="hover:bg-gray-100">
                  <button
                    className="w-full text-left px-4 py-2"
                    onClick={() => {
                      toggleDropdown();
                      onSettings();
                    }}
                  >
                    Settings
                  </button>
                </li>
                <li className="hover:bg-gray-100">
                  <button
                    className="w-full text-left px-4 py-2 text-red-500"
                    onClick={handleLogout} // ใช้ฟังก์ชันที่เพิ่มมา
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
