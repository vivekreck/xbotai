import React, { useState } from "react";
import styles from "./MessageCard.module.css";

import userlogo from "../../assets/user.png";
import botailogo from "../../assets/botailogo.png";

import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import AddFeedbackModal from "../Modal/AddFeedbackModal";
import { useChat } from "../../context/ChatContext";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";

interface Props {
  messageId: string;
  chatId: string;
  sender: "user" | "bot";
  text: string;
  time: string;
  feedback: string;
}

const MessageCard: React.FC<Props> = ({ sender, text, time, messageId, chatId, feedback }) => {
  const [showModal, setShowModal] = useState(false);
  const { updateFeedback } = useChat();

  return (
    <div className={styles.card}>
      <div className={styles.avatarWrapper}>
        <img
          src={sender === "user" ? userlogo : botailogo}
          className={`${styles.avatar} ${sender === "user" ? "" : styles.bot}`}
        />
      </div>

      <div className={styles.content}>
        <span className={styles.contentHeading}>{sender === "user" ? "You" : "Soul AI"}</span>

        <p className={styles.message}>{text}</p>

        <div className={styles.rating}>
          <span className={styles.time}>{time}</span>
          {!feedback && sender !== "user" && (
            <span className={styles.thumb}>
              {showModal && (
                <AddFeedbackModal
                  onClose={() => setShowModal(false)}
                  onSubmit={(feedback) => updateFeedback(chatId, messageId, feedback)}
                />
              )}

              <FiThumbsUp color="#666" onClick={() => setShowModal(true)} />
              <FiThumbsDown color="#666" onClick={() => setShowModal(true)} />
            </span>
          )}
          {feedback && (
            <span className={styles.star}>
              {Array.from({ length: 3 }).map((_, i) => (
                <IoIosStar key={i} />
              ))}
              {Array.from({ length: 2 }).map((_, i) => (
                <IoIosStarOutline key={i} />
              ))}
            </span>
          )}
        </div>
        {feedback && (
          <div className={styles.feedback}>
            <strong>Feedback</strong>:<span>{feedback}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageCard;
