import { CallbackEvent } from "lol-headless-client";
import { createContext, useContext, useEffect, useRef, useState } from "react";

export const ClientContext = createContext<{
  friends: any[];
  login: (data: { username: string; password: string }) => void;
  sendMessage: (data: { message: string; jid: string }) => void;
}>({
  friends: [],
  login: async () => {},
  sendMessage: async () => {},
});

const handleLHCEvents = ({ eventName, data }: CallbackEvent) => {
  console.log({ eventName, data });
};

function ClientContextProvider({ children }: { children: React.ReactNode }) {
  const isListening = useRef(false);
  const [friends, setFriends] = useState<any[]>([]);

  useEffect(() => {
    if (isListening.current) return;
    window.api.LHCListen((data: CallbackEvent) => handleLHCEvents(data));
    isListening.current = true;
  }, [isListening]);

  const login = (data: { username: string; password: string }) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const { username, password } = data;
        await window.api.LHCLogin({ username, password });
        await window.api.LHCSetInfo({ status: "chat" });
        const friendList = await window.api.LHCGetFriendList();
        setFriends(friendList);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  const sendMessage = async (data: { message: string; jid: string }) => {
    const { message, jid } = data;
    await window.api.LHCSendMessage({ message, jid });
  };

  return (
    <ClientContext.Provider
      value={{
        friends,
        login,
        sendMessage,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}

export function useClientContext() {
  return useContext(ClientContext);
}

export default ClientContextProvider;
