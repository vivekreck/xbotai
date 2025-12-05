import React, { useState } from "react";
import styles from "./AddFeedbackModal.module.css";

import { HiOutlineLightBulb } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";

interface AddFeedbackModalProps {
  onClose: () => void;
  onSubmit?: (feedback: string) => void;
}

const AddFeedbackModal: React.FC<AddFeedbackModalProps> = ({ onClose, onSubmit }) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    onSubmit?.(text);
    onClose();
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <span className={styles.icon}>
              <HiOutlineLightBulb size={38} />
            </span>
            <span className={styles.title}>Provide Additional Feedback</span>
          </div>

          <button className={styles.closeBtn} onClick={onClose}>
            <RxCross2 size={24} strokeWidth={2} />
          </button>
        </div>

        <textarea
          className={styles.textarea}
          placeholder="Type your feedback here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button className={styles.submitBtn} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddFeedbackModal;
