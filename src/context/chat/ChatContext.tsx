import { createContext, useContext, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const ChatContext = createContext<{
  myJid: string;
  friends: any[];
  pendingFriends: any[];
  currentChat: {
    friendJid: string;
    messages: any[];
  };
  sendMessage: (data: { message: string; jid: string }) => void;
  getChatHistory: (data: { jid: string }) => void;
  getFriendList: () => void;
  changeCurrentChat: (data: { jid: string }) => void;
}>({
  myJid: "",
  friends: [],
  pendingFriends: [],
  currentChat: { friendJid: "", messages: [] },
  sendMessage: () => {},
  getChatHistory: () => {},
  getFriendList: () => {},
  changeCurrentChat: () => {},
});

function ChatContextProvider({ children }: { children: React.ReactNode }) {
  const isListening = useRef(false);
  const [myJid, setMyJid] = useState("");
  const [currentChat, setCurrentChat] = useState<{
    friendJid: string;
    messages: any[];
  }>({ friendJid: "", messages: [] });
  const [friends, setFriends] = useState<any[]>([]);
  const [pendingFriends, setPendingFriends] = useState<any[]>([]);
  const currentChatRef = useRef(currentChat);
  useEffect(() => {
    currentChatRef.current = currentChat;
  }, [currentChat]);

  const handleLHCEvents = ({ eventName, data }: any) => {
    console.log("EVENT RECEIVED FROM CHAT CONTEXT");
    console.log({ eventName, data });

    if (eventName === "XMPP_FRIENDLIST_UPDATED") {
      setFriends(data);
    }
    if (eventName === "XMPP_PENDING_FRIENDS_UPDATED") {
      setPendingFriends(data);
    }
    if (eventName === "XMPP_CHAT_RECEIVED") {
      if (data.sender === currentChatRef.current.friendJid) {
        const { id, sender, receiver, timestamp, type, content } = data;
        setCurrentChat((prevState) => ({
          ...prevState,
          messages: [
            ...prevState.messages,
            {
              id,
              sender,
              receiver,
              timestamp,
              type,
              content,
            },
          ],
        }));
      }
    }
    if (eventName === "XMPP_CHAT_HISTORY_UPDATED") {
      setCurrentChat((prevCurrentChat) => {
        console.log({
          friendJid: data.friendJid,
          prev: prevCurrentChat.friendJid,
        });
        if (data.friendJid === prevCurrentChat.friendJid) {
          return { ...prevCurrentChat, messages: data.chatHistory };
        }
        return prevCurrentChat;
      });
    }
    if (eventName === "XMPP_MY_JID_UPDATE") {
      setMyJid(data);
    }
  };

  useEffect(() => {
    if (isListening.current) return;
    window.api.LHCListen((data: any) => handleLHCEvents(data));
    isListening.current = true;
  }, [isListening]);

  const sendMessage = async (data: { message: string; jid: string }) => {
    const { message, jid } = data;
    setCurrentChat((prevState) => ({
      ...prevState,
      messages: [
        ...prevState.messages,
        {
          content: message,
          id: uuidv4(),
          receiver: jid,
          sender: myJid,
          timestamp: Date.now().toString(),
          type: "chat",
        },
      ],
    }));
    await window.api.LHCSendMessage({ message, jid });
  };

  const getChatHistory = async (data: { jid: string }) => {
    const { jid } = data;
    console.log({ jid });
    setCurrentChat({ friendJid: jid, messages: [] });
    await window.api.LHCGetChatHistory({ jid });
  };

  const getFriendList = async () => {
    await window.api.LHCGetFriendList();
  };

  const changeCurrentChat = (data: { jid: string }) => {
    const { jid } = data;
    setCurrentChat({ friendJid: jid, messages: [] });
    getChatHistory({ jid });
  };

  useEffect(() => {
    console.log({ currentChat });
  }, [currentChat]);

  return (
    <ChatContext.Provider
      value={{
        myJid,
        friends,
        pendingFriends,
        sendMessage,
        getChatHistory,
        getFriendList,
        currentChat,
        changeCurrentChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  return useContext(ChatContext);
}

export default ChatContextProvider;
