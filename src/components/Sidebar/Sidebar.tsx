import styles from "./Sidebar.module.css";

import { TbEdit } from "react-icons/tb";

import botailogo from "../../assets/botailogo.png";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/history");
  }

  function handleNewChat() {
    navigate("/");
  }

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <div className={styles.header}>
        <div className={styles.logoWrapper}>
          <img src={botailogo} alt="Bot Logo" className={styles.logo} />
        </div>

        <h2>New Chat</h2>
        <TbEdit size={30} onClick={handleNewChat} className={styles.edit} />
      </div>

      <button className={styles.button} onClick={handleClick}>
        Past Conversations
      </button>
    </aside>
  );
};

export default Sidebar;
