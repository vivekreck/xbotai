import React from "react";
import styles from "./PromptCard.module.css";

interface Props {
  title: string;
  subtitle: string;
}

const PromptCard: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p>{subtitle}</p>
    </div>
  );
};

export default PromptCard;
