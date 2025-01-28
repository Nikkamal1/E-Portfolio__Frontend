import { useState } from "react";
import Navbar from "./Navbar"; // ตรวจสอบเส้นทาง
import PropTypes from "prop-types"; // ใช้สำหรับตรวจสอบ prop types
import Sidebar from "./Sidebar";

const Layout = ({ children, isLoggedIn, profile, onLogout }) => {
  const [sideMenuIsExpand, setSideMenuIsExpand] = useState(true);

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-primary/5 to-secondary/5">
      {/* แสดง Sidebar เฉพาะเมื่อมีการล็อกอิน */}
      { <Sidebar setExpand={setSideMenuIsExpand} />}
      <div
        className={`flex-1 min-h-screen mx-0 bg-slate-100 transition-all duration-300 ease-in-out ${
          sideMenuIsExpand ? "md:ml-72" : "md:ml-20"
        }`}
      >
        <div className="flex-1">
          {/* Navbar */}
          <Navbar
            isLoggedIn={isLoggedIn}
            profile={profile}
            onLogout={onLogout}
            onSettings={() => console.log("Settings clicked")}
          />
          {/* Children Content */}
          <div className="container mx-auto px-4 py-20 h-[calc(100vh-5rem)] overflow-auto">
            {children || <p>No content available</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

// ตรวจสอบประเภทของ props
Layout.propTypes = {
  children: PropTypes.node,
  isLoggedIn: PropTypes.bool.isRequired,
  profile: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
};

// เพิ่มค่า Default Props
Layout.defaultProps = {
  profile: {
    name: "Guest",
    avatar: "",
  },
};

export default Layout;
