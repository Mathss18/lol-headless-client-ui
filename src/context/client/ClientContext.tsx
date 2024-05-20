import { createContext, useContext, useEffect, useRef, useState } from "react";

export const ClientContext = createContext<{
  login: (data: { username: string; password: string }) => void;
}>({
  login: async () => {},
});

function ClientContextProvider({ children }: { children: React.ReactNode }) {
  const isListening = useRef(false);

  const handleLHCEvents = ({}: any) => {};

  useEffect(() => {
    if (isListening.current) return;
    window.api.LHCListen((data: any) => handleLHCEvents(data));
    isListening.current = true;
  }, [isListening]);

  const login = (data: { username: string; password: string }) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const { username, password } = data;
        await window.api.LHCLogin({ username, password });
        await window.api.LHCSetInfo({ status: "chat" });
        getFriendList();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  const getFriendList = async () => {
    await window.api.LHCGetFriendList();
  };

  return (
    <ClientContext.Provider
      value={{
        login,
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
