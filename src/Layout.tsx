import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import styles from "./Layout.module.css";
import { useState } from "react";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className={styles.container}>
      <Sidebar isOpen={isSidebarOpen} />

      <div className={styles.pageArea}>
        <Outlet context={{ toggleSidebar, isSidebarOpen }} />
      </div>
    </div>
  );
};

export default Layout;
