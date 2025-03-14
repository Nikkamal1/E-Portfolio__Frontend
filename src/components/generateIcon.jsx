import React from "react";

const generateIcon = (icon) => {
  const icons_map = {
    dasbor: (
      <div className=" group fixed">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-current hover:text-blue-500"
          viewBox="0 0 24 24"
          version="1.1"
        >
          <g
            id="ic_kanban"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <path
              d="M20,3 C21.1045695,3 22,3.8954305 22,5 L22,15 C22,16.1045695 21.1045695,17 20,17 L4,17 C2.8954305,17 2,16.1045695 2,15 L2,5 C2,3.8954305 2.8954305,3 4,3 L20,3 Z M11.5,6 L6.5,6 C5.67157288,6 5,6.67157288 5,7.5 L5,7.5 L5,9.5 C5,10.3284271 5.67157288,11 6.5,11 L6.5,11 L11.5,11 C12.3284271,11 13,10.3284271 13,9.5 L13,9.5 L13,7.5 C13,6.67157288 12.3284271,6 11.5,6 L11.5,6 Z"
              id="Combined-Shape"
              fill="currentColor"
            />
            <path
              d="M8,21 L16,21 M12,17 L12,21"
              id="Combined-Shape"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.48"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
        {/* Tooltip */}
        <span
          className="absolute left-8 top-1/2 -translate-y-1/2 w-max rounded bg-black px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-[9999]"
        >
          Dashboard
        </span>

      </div>
    ),
    certificate: (
      <div className=" group fixed">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-current hover:text-blue-800"
        viewBox="0 0 24 24"
        version="1.1"
      >
        <g
          id="ic_kanban"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <path
            d="M23 1v18h-3v-1h2V2H2v16h8v1H1V1zm-7 2H8v1h8zm-2 3V5h-4v1zm-7 5H3v1h4zm0 2H3v1h4zm-4 3h2v-1H3zm14-3a2 2 0 1 1-2-2 2.002 2.002 0 0 1 2 2zm-1 0a1 1 0 1 0-1 1 1.001 1.001 0 0 0 1-1zm.002-4.293a.965.965 0 0 0 1.32.55 1.08 1.08 0 0 1 1.213.207 1.066 1.066 0 0 1 .21 1.21.966.966 0 0 0 .548 1.324 1.064 1.064 0 0 1 0 2.004.965.965 0 0 0-.549 1.323A1.05 1.05 0 0 1 18 16.816v7.046l-3-2.538-3 2.538v-7.046a1.05 1.05 0 0 1-.744-1.49.965.965 0 0 0-.549-1.324 1.064 1.064 0 0 1 0-2.004.966.966 0 0 0 .549-1.324 1.066 1.066 0 0 1 .209-1.21 1.08 1.08 0 0 1 1.212-.206.965.965 0 0 0 1.32-.551 1.064 1.064 0 0 1 2.005 0zm.998 13v-5.04a.93.93 0 0 0-.998.625 1.064 1.064 0 0 1-2.004 0 .93.93 0 0 0-.998-.625v5.039l2-1.692z"
            fill="currentColor"
          />
          <path fill="none" d="M0 0h24v24H0z" />
        </g>
      </svg>
        <span
        className="absolute left-8 top-1/2 -translate-y-1/2 w-max rounded bg-black px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-[9999]"
      >
        Certificate
      </span>
      </div>
    ),
    profile: (
      <div className=" group fixed">
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 text-current hover:text-blue-800"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M28 9h-1.958v-2.938l-4.042-0.062 0.021 3h-12.146l0.083-3-3.958 0.062v3l-2-0.062c-1.104 0-2 0.896-2 2v14c0 1.104 0.896 2 2 2h24c1.104 0 2-0.896 2-2v-14c0-1.104-0.896-2-2-2zM23 7h2v4h-2v-4zM10 13.812c1.208 0 2.188 1.287 2.188 2.875s-0.98 2.875-2.188 2.875-2.188-1.287-2.188-2.875 0.98-2.875 2.188-2.875zM7 7h2v4h-2v-4zM5.667 22.948c0 0 0.237-1.902 0.776-2.261s2.09-0.598 2.09-0.598 1.006 1.075 1.434 1.075c0.427 0 1.433-1.075 1.433-1.075s1.552 0.238 2.091 0.598c0.633 0.422 0.791 2.261 0.791 2.261h-8.615zM26 22h-9v-1h9v1zM26 20h-9v-1h9v1zM26 18h-9v-1h9v1zM26 16h-9v-1h9v1z"
          fill="currentColor"
        />
      </svg>
      <span  className="absolute left-8 top-1/2 -translate-y-1/2 w-max rounded bg-black px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-[9999]"
      >
        Profile
      </span>
      </div>
    ),
  };

  return icons_map[icon] || <></>;
};

export default generateIcon;
