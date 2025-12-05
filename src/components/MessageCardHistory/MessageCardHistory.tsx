import React, { useState } from "react";
import styles from "./MessageCardHistory.module.css";

import userlogo from "../../assets/user.png";
import botailogo from "../../assets/botailogo.png";

interface Props {
  userText: string;
  botText: string;
  userTime: string;
  botTime: string;
  feedback: string;
  chatId: string;
  messageId: string;
}

import { IoIosStar } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import { useChat } from "../../context/ChatContext";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import AddFeedbackModal from "../Modal/AddFeedbackModal";

const MessageCardHistory: React.FC<Props> = ({ userText, botText, userTime, botTime, feedback, chatId, messageId }) => {
  const [showModal, setShowModal] = useState(false);
  const { updateFeedback } = useChat();

  return (
    <div className={styles.card}>
      <div className={styles.userCard}>
        <div className={styles.avatarWrapper}>
          <img src={userlogo} className={styles.avatar} />
        </div>

        <div className={styles.content}>
          <strong>You</strong>

          <p className={styles.message}>{userText}</p>

          <div className={styles.rating}>
            <span className={styles.time}>{userTime}</span>
          </div>
        </div>
      </div>

      <div className={styles.botUser}>
        <div className={styles.avatarWrapper}>
          <img src={botailogo} className={`${styles.avatar} ${styles.bot}`} />
        </div>

        <div className={styles.content}>
          <strong>{"Soul AI"}</strong>
          <p className={styles.message}>{botText}</p>
          <div className={styles.rating}>
            <span className={styles.time}>{botTime}</span>

            {!feedback && (
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
    </div>
  );
};

export default MessageCardHistory;
