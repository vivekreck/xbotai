import { createContext, useContext, useReducer, type ReactNode } from "react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
  feedback: string;
}

interface Chat {
  chatId: string;
  messages: Message[];
}

interface State {
  chats: Chat[];
  activeChatId: string | null;
}

type Action =
  | { type: "ADD_MESSAGE"; payload: { chatId: string; message: Message } }
  | { type: "FETCH_ALL_CHATS" }
  | { type: "FETCH_CHAT_BY_ID"; payload: { chatId: string } }
  | { type: "UPDATE_FEEDBACK"; payload: { chatId: string; messageId: string; feedback: string } };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ChatContext = createContext<any>(null);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_MESSAGE": {
      const { chatId, message } = action.payload;

      const existingChat = state.chats.find((c) => c.chatId === chatId);

      if (existingChat) {
        return {
          ...state,
          chats: state.chats.map((c) => (c.chatId === chatId ? { ...c, messages: [...c.messages, message] } : c)),
        };
      }

      return {
        ...state,
        chats: [...state.chats, { chatId, messages: [message] }],
      };
    }

    case "FETCH_ALL_CHATS": {
      return state;
    }

    case "UPDATE_FEEDBACK": {
      const { chatId, messageId, feedback } = action.payload;

      return {
        ...state,
        chats: state.chats.map((chat) =>
          chat.chatId === chatId
            ? {
                ...chat,
                messages: chat.messages.map((msg) => (msg.id === messageId ? { ...msg, feedback } : msg)),
              }
            : chat
        ),
      };
    }

    default:
      return state;
  }
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    chats: [],
    activeChatId: null,
  });

  const addMessage = (chatId: string, message: Message) => {
    dispatch({ type: "ADD_MESSAGE", payload: { chatId, message } });
  };

  const fetchAllChats = () => {
    dispatch({ type: "FETCH_ALL_CHATS" });
    return state.chats;
  };

  const fetchChatById = (chatId: string) => {
    return state.chats.find((c) => c.chatId === chatId) || null;
  };

  const updateFeedback = (chatId: string, messageId: string, feedback: string) => {
    dispatch({ type: "UPDATE_FEEDBACK", payload: { chatId, messageId, feedback } });
  };

  return (
    <ChatContext.Provider
      value={{
        chats: state.chats,
        activeChatId: state.activeChatId,
        addMessage,
        fetchAllChats,
        fetchChatById,
        updateFeedback,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useChat = () => useContext(ChatContext);
