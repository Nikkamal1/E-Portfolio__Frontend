/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { sidebarStructure } from "./structure";
import generateIcon from "./generateIcon";

const Sidebar = ({ setExpand }) => {
    //   const username = "Miles Heizer";
    //   const company = "Unilever";
    //   const profilePic =
    //     "https://img.mbizweb.id/180x180/erp/R2p1IXoyVEpBMk01WOEAdaI3hHVlkuIg0wW5_pn-CJCKHSrA_n1-U1tfE7Bl5H4_4Z7AxgL0DPOmUCdPuCHHC5lWvMU5Ig3t1uDrkVN53MlWlnA";
    //   const link = "/";

    const [openedMenu, setOpenedMenu] = useState({});
    const [activeName, setActiveName] = useState("");
    const [isExpand, setIsExpand] = useState(true);
    const [isExpandOnHover, setIsExpandOnHover] = useState(false);

    const listRef = useRef({});

    const activeLink = window.location.pathname;

    const handleHoverExpand = (value) => {
        if (!isExpand) {
            setIsExpandOnHover(value);
        }
    };

    const handleNavigate = (name) => {
        setActiveName(name);
    };

    const handleToggle = (name) => {
        const rootEl = name.split(".")[0];

        setOpenedMenu((prevState) => {
            const isOpened = prevState[name]?.open || false;
            const updatedState = {
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
            return updatedState;
        });
    };

    const generateMenu = (item, index, recursive = 0) => {
        if (activeName === "" && activeLink.includes(item.link)) {
            setActiveName(item.name);
        }
        const isActive = activeName === item.name || activeName.split(".")[0] === item.name;
        const paddingClass = recursive === 0 ? "pl-4" : recursive === 1 ? "pl-11" : "pl-16";

        return (
            <li key={index}>
                <a
                    role="button"
                    tabIndex={0}
                    id={item.id}
                    onClick={() => {
                        if ("child" in item) {
                            handleToggle(item.name);
                        } else if (item.link) {
                            window.location.href = item.link; // ใช้เปลี่ยน path
                        }
                    }}
                    onKeyDown={(event) => {
                        if (event.code === "Space" || event.code === "Enter") {
                            if ("child" in item) {
                                handleToggle(item.name);
                            } else if (item.link) {
                                window.location.href = item.link;
                            }
                        }
                    }}
                    className={[
                        "group flex cursor-pointer rounded-lg items-center justify-between h-12 py-0 pr-3 mb-1 focus:outline-none",
                        paddingClass,
                        isActive ? "text-blue-600 font-semibold bg-blue-200/20" : "text-slate-500 hover:bg-slate-300/20",
                    ].join(" ")}
                >
                    <div className="flex items-center gap-3">
                        {item.icon &&
                            (item.icon === "dasdor" ? (
                                <div className="h-3 w-3 flex items-center justify-center">
                                    <div
                                        className={`${isActive ? "h-2 w-2" : "h-1 w-1"} bg-current rounded-full duration-200`}
                                    ></div>
                                </div>
                            ) : (
                                generateIcon(item.icon)
                            ))}
                        <div
                            className={`truncate ${isExpand || isExpandOnHover ? "" : "w-0 h-0 opacity-0"
                                }`}
                        >
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
                        className={`overflow-hidden duration-300 ease-in-out ${isExpand || isExpandOnHover ? "" : "h-0"
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
            className={`bg-slate-50 border-r border-slate-100 shadow-sm absolute inset-y-0 left-0 duration-300 ease-in-out ${isExpand
                    ? "w-72"
                    : isExpandOnHover
                        ? "w-72 backdrop-blur-md"
                        : "w-20"
                }`}
        >
            <button
                className="absolute z-50 top-16 -right-3 bg-white hover:bg-slate-100 text-slate-500 p-0.5 rounded-full border border-slate-200"
                onClick={() => {
                    setIsExpand(!isExpand);
                    setExpand(!isExpand);
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
            <div
                onMouseEnter={() => handleHoverExpand(true)}
                onMouseLeave={() => handleHoverExpand(false)}
                className="relative h-screen overflow-hidden"
            >
                <SimpleBar style={{ height: "100%" }} autoHide timeout={100}>
                    <div className="text-slate-500">
                        {/* <div className="my-8 flex flex-col items-center h-44">
              <a href={link} className="flex flex-col items-center">
                <div
                  className={`rounded-full border-4 border-white overflow-hidden duration-300 ${
                    isExpand || isExpandOnHover ? "h-28 w-28" : "h-12 w-12"
                  }`}
                >
                  <img src={profilePic} className="block" alt="Profile" />
                </div>
                <div
                  className={`text-base font-semibold text-slate-700 mt-3 duration-300 ${
                    isExpand || isExpandOnHover ? "" : "opacity-0"
                  }`}
                >
                  {username}
                </div>
                <div
                  className={`text-sm text-slate-500 duration-300 ${
                    isExpand || isExpandOnHover ? "" : "opacity-0"
                  }`}
                >
                  {company}
                </div>
              </a>
            </div> */}
                        <ul className="mt-20 mb-10 p-0 list-none text-sm font-normal px-3">
                            {sidebarStructure.map((item, index) => generateMenu(item, index))}
                        </ul>
                    </div>
                </SimpleBar>
            </div>
        </nav>
    );
};

export default Sidebar;
