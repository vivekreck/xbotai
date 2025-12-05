import styles from "./Home.module.css";
import PromptCard from "../../components/PromptCard/PromptCard";
import botailogo from "../../assets/botailogo.png";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { useChat } from "../../context/ChatContext";
import MessageCard from "../../components/MessageCard/MessageCard";

type LayoutContextType = {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
};

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
  feedback: string;
}

const Home = () => {
  const { addMessage, fetchChatById } = useChat();

  const { toggleSidebar, isSidebarOpen } = useOutletContext<LayoutContextType>();

  const [chatId] = useState(() => crypto.randomUUID());

  const chat = fetchChatById(chatId);

  const [inputValue, setInputValue] = useState("");

  const handleBackdropClick = () => {
    if (window.innerWidth <= 768 && isSidebarOpen) {
      toggleSidebar();
    }
  };

  const handleAsk = async () => {
    if (!inputValue.trim()) return;
    // example: "What's the difference between GET and POST requests?"
    addMessage(chatId, {
      id: crypto.randomUUID(),
      sender: "user",
      text: inputValue,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });

    setInputValue("");
    // find response
    const res = await fetch("/data/data.json");
    const json = await res.json();

    const response = json.find((data: { question: string }) => data.question === inputValue);

    addMessage(chatId, {
      id: crypto.randomUUID(),
      sender: "bot",
      text: response?.response || "Sorry, Did not understand your query!",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
  };

  const handleSave = () => {
    if (!chat) return;

    const savedChats = JSON.parse(localStorage.getItem("savedChats") || "[]");

    const exists = savedChats.find((c: { chatId: string }) => c.chatId === chatId);
    if (!exists) {
      savedChats.push(chat);
      localStorage.setItem("savedChats", JSON.stringify(savedChats));
    }
  };

  return (
    <div className={styles.container} onClick={handleBackdropClick}>
      <header className={styles.header}>
        <span className={styles.menuButton} onClick={toggleSidebar}>
          ☰
        </span>
        <h1 className={styles.logoHeading}>Bot AI</h1>
      </header>

      <div className={styles.main}>
        <div className={styles.contentWrapper}>
          {!chat && (
            <>
              <h1 className={styles.title}>How Can I Help You Today?</h1>

              <div className={styles.logoWrapper}>
                <img src={botailogo} alt="Bot Logo" className={styles.logo} />
              </div>

              <div className={styles.promptList}>
                <PromptCard title="Hi, what is the weather" subtitle="Get immediate AI generated response" />
                <PromptCard title="Hi, what is my location" subtitle="Get immediate AI generated response" />
                <PromptCard title="Hi, what is the temperature" subtitle="Get immediate AI generated response" />
                <PromptCard title="Hi, how are you" subtitle="Get immediate AI generated response" />
              </div>
            </>
          )}

          <div className={styles.messagesContainer}>
            {chat &&
              chat.messages.map((msg: Message) => (
                <MessageCard
                  key={msg.id}
                  messageId={msg.id}
                  sender={msg.sender}
                  text={msg.text}
                  time={msg.time}
                  chatId={chatId}
                  feedback={msg.feedback}
                />
              ))}
          </div>

          <form
            className={styles.inputRow}
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk();
            }}
          >
            <input
              className={styles.input}
              placeholder="Message Bot AI..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className={styles.askBtn} type="submit" aria-label="Ask question">
              Ask
            </button>
            <button className={styles.saveBtn} type="button" onClick={handleSave}>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
