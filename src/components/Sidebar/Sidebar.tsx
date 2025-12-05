import styles from "./Sidebar.module.css";

import { TbEdit } from "react-icons/tb";

import botailogo from "../../assets/botailogo.png";
import { Link, useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const navigate = useNavigate();

  function handleNewChat() {
    navigate("/");
  }

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <div className={styles.header}>
        <div className={styles.logoWrapper}>
          <img src={botailogo} alt="Bot Logo" className={styles.logo} />
        </div>

        <Link to="/" className={styles.heading}>
          <h2>New Chat</h2>
        </Link>

        <TbEdit size={30} onClick={handleNewChat} className={styles.edit} />
      </div>

      <Link to="/history" className={styles.button}>
        Past Conversations
      </Link>
    </aside>
  );
};

export default Sidebar;
