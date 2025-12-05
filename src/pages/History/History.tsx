import MessageCardHistory from "../../components/MessageCardHistory/MessageCardHistory";
import { useChat } from "../../context/ChatContext";
import styles from "./History.module.css";

interface Message {
  sender: "user" | "bot";
  text: string;
  time: string;
  feedback: string;
  id: string;
}

interface Chat {
  chatId: string;
  messages: Message[];
}

const History = () => {
  const { fetchAllChats } = useChat();
  const chats = fetchAllChats(); // <-- function call

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1>Conversation History</h1>

        <h2>Today's Chats</h2>

        {chats.map((chat: Chat, index: number) => (
          <MessageCardHistory
            key={index}
            userText={chat?.messages?.[0]?.text || "User Testing"}
            userTime={chat?.messages?.[0]?.time || "10:23 AM"}
            botText={chat?.messages?.[1]?.text || "Bot Testing"}
            botTime={chat?.messages?.[1]?.time || "10:24 PM"}
            feedback={chat?.messages?.[1]?.feedback}
            chatId={chat?.chatId}
            messageId={chat?.messages?.[1]?.id}
          />
        ))}

        <div className={styles.inputRow}>
          <input className={styles.input} placeholder="Type here..." />
          <button className={styles.askBtn}>Ask</button>
          <button className={styles.saveBtn}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default History;
