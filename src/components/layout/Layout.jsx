import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import "./Layout.css";

import NavBar from "../navbar/Navbar";
import SideBar from "../sidebar/SideBar";

function Layout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // To check when the viewport is in mobile view
  const checkMobileView = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    // Listener to check for viewport changes
    window.addEventListener("resize", checkMobileView);

    // Clean up after the listener
    return () => {
      window.removeEventListener("resize", checkMobileView);
    };
  }, []);

  return (
    <>
      <NavBar />

      <div className="main">
        {/* Render the SideBar component conditionally */}
        {!isMobile && <SideBar />}

        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
