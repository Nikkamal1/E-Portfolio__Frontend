import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { sidebarStructure } from "./structure";
import generateIcon from "./generateIcon";

const Sidebar = ({ setExpand }) => {
    const [openedMenu, setOpenedMenu] = useState({});
    const [activeName, setActiveName] = useState("");
    const [isExpand, setIsExpand] = useState(false);
    const listRef = useRef({});
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            setIsExpand(prev => window.innerWidth >= 768 ? prev : false);
            setExpand(prev => window.innerWidth >= 768 ? prev : false);
        };
    
        handleResize(); // ตรวจสอบขนาดหน้าจอเมื่อโหลดครั้งแรก
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    
    useEffect(() => {
        const currentItem = sidebarStructure.find((item) =>
            location.pathname === item.link
        );

        if (currentItem) {
            setActiveName(currentItem.name);
        }
    }, [location.pathname]);

    const handleToggle = (name) => {
        const rootEl = name.split(".")[0];
        setOpenedMenu((prevState) => {
            const isOpened = prevState[name]?.open || false;
            return {
                ...prevState,
                [name]: {
                    open: !isOpened,
                    height: isOpened ? "0px" : `${listRef.current[name]?.scrollHeight || 0}px`,
                },
                [rootEl]: {
                    open: true,
                    height: `${(listRef.current[rootEl]?.scrollHeight || 0) + (isOpened ? -listRef.current[name]?.scrollHeight : listRef.current[name]?.scrollHeight || 0)}px`,
                },
            };
        });
    };

    const generateMenu = (item, index, recursive = 0) => {
        const isActive = activeName === item.name || activeName.split(".")[0] === item.name;
        const paddingClass = recursive === 0 ? "pl-4" : recursive === 1 ? "pl-11" : "pl-16";
    
        return (
            <li key={index} className="relative group">
                <a
                    role="button"
                    tabIndex={0}
                    id={item.id}
                    onClick={() => {
                        if ("child" in item) {
                            handleToggle(item.name);
                        } else if (item.link) {
                            navigate(item.link);
                        }
                    }}
                    onKeyDown={(event) => {
                        if (event.code === "Space" || event.code === "Enter") {
                            if ("child" in item) {
                                handleToggle(item.name);
                            } else if (item.link) {
                                navigate(item.link);
                            }
                        }
                    }}
                    className={[
                        "group-hover:bg-slate-300/20 group-hover:text-blue-600 flex cursor-pointer rounded-lg items-center justify-between h-12 py-0 pr-3 mb-1 focus:outline-none",
                        paddingClass,
                        isActive ? "text-blue-600 font-semibold bg-blue-200/20" : "text-slate-500",
                    ].join(" ")}
                >
                    <div className="flex items-center gap-3">
                        {item.icon && generateIcon(item.icon)}
                        <div className={`truncate ${isExpand ? "" : "w-0 h-0 opacity-0"}`}>
                            {item.title}
                        </div>
                    </div>
                    {"child" in item && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    )}
                </a>
                {"child" in item && (
                    <ul
                        ref={(el) => (listRef.current[item.name] = el)}
                        className={`absolute left-full top-0 z-50 bg-white shadow-lg border rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                            isExpand ? "" : "w-48"
                        }`}
                        style={{ maxHeight: openedMenu[item.name]?.height || "0px" }}
                    >
                        {item.child.map((value, idx) => generateMenu(value, idx, recursive + 1))}
                    </ul>
                )}
            </li>
        );
    };
    

    return (
        <nav
        role="navigation"
        className={`bg-slate-50 border-r border-slate-100 shadow-sm fixed inset-y-0 left-0 duration-300 ease-in-out transition-all ${
            isExpand ? "w-72" : "w-20"
        }`}
    >
    
            <button
                className="absolute z-50 top-16 -right-3 bg-white hover:bg-slate-100 text-slate-500 p-0.5 rounded-full border border-slate-200"
                onClick={() => {
                    setIsExpand(prev => !prev);
                    setExpand(prev => !prev);
                }}
                
                
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transform duration-500 ${isExpand ? "rotate-0" : "rotate-180"}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            <div className="relative h-screen overflow-hidden">
                <SimpleBar style={{ height: "100%" }} autoHide timeout={100}>
                    <ul className="mt-20 mb-10 p-0 list-none text-sm font-normal px-3">
                        {sidebarStructure.map((item, index) => generateMenu(item, index))}
                    </ul>
                </SimpleBar>
            </div>
        </nav>
    );
};

export default Sidebar;
