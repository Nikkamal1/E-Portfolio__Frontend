import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import PropTypes from "prop-types";
import Sidebar from "./Sidebar";
import Navbar1 from "./Navdepa";
import Navdepa from "./Navdepa";

const Layout = ({ children, isLoggedIn, profile, onLogout }) => {
  const [sideMenuIsExpand, setSideMenuIsExpand] = useState(false);

  useEffect(() => {
    const handleResize = () => {
        setSideMenuIsExpand(prev => window.innerWidth >= 768 ? prev : false);
    };

    handleResize(); // ตรวจสอบขนาดหน้าจอเมื่อโหลดครั้งแรก
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
}, []);


  return (
<div className="min-h-screen w-full flex bg-gradient-to-br from-gray-50 to-purple-50">
{/* Sidebar */}
    <Sidebar setExpand={setSideMenuIsExpand} />

    {/* Main Content */}
    <div className={`flex-1 min-h-screen transition-all duration-300 ${sideMenuIsExpand ? "pl-72" : "pl-20"}`}>
        <Navdepa />
        <Navbar
            isLoggedIn={isLoggedIn}
            profile={profile}
            onLogout={onLogout}
            onSettings={() => console.log("Settings clicked")}
        />
        <div className="container mx-auto   overflow-auto">
            {children || <p>No content available</p>}
        </div>
    </div>
</div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  isLoggedIn: PropTypes.bool.isRequired,
  profile: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
};

Layout.defaultProps = {
  profile: {
    name: "Guest",
    avatar: "",
  },
};

export default Layout;
