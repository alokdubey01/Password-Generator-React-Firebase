import React from "react";
import Avatar from "@mui/material/Avatar";
import { auth } from "../firebase";

export const Header = (props) => {
  const logOut = () => {
    auth.signOut();
    localStorage.clear();
  };
  return (
    <div>
      <nav
        className="fixed right-2 top-2 z-30"
        style={{ background: "transparent", display: "flex" }}
      >
        <Avatar alt={props.alt} src={props.src} />
        <button
          className="mt-1 text-xs ml-2 inline-flex items-center px-0 py-0 text-black"
          onClick={logOut}
        >
          logOut
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="black"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
};
