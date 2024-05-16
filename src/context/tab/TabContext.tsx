import { createContext, useContext, useState } from "react";
import { LoginPage } from "../../pages/login/Login";
import { v4 as uuid } from "uuid";

export const TabContext = createContext<{
  tabs: Tab[];
  setTabs: (tabs: Tab[]) => void;
  addNewTab: () => void;
  removeTab: (tabId: string) => void;
  selectedTab: Tab | undefined;
  setSelectedTab: (tab: Tab) => void;
  setState: (tabId: string, state: any) => void;
  changeCurrentPage: (tabId: string, page: React.ComponentType<any>, state: any) => void;
}>({
  tabs: [],
  setTabs: () => {},
  addNewTab: () => {},
  removeTab: () => {},
  selectedTab: undefined,
  setSelectedTab: () => {},
  setState: () => {},
  changeCurrentPage: () => {},
});

export type Tab = {
  tabId: string;
  name: string;
  CurrentPage: React.ComponentType<any>;
  state?: any;
};

function TabContextProvider({ children }: { children: React.ReactNode }) {
  const [selectedTab, setSelectedTab] = useState<Tab>();
  const [tabs, setTabs] = useState<Tab[]>([]);

  const addNewTab = () => {
    const state = { username: "milannantav", password: "Vizirofs@nd" }; // boej
    const tabId = uuid();
    setTabs((tabs) => [
      ...tabs,
      {
        tabId,
        name: "Client",
        CurrentPage: LoginPage,
        state,
      },
    ]);
  };

  const removeTab = (tabId: string) => {
    setTabs(tabs.filter((tab) => tab.tabId !== tabId));
    if (selectedTab?.tabId === tabId) {
      setSelectedTab(undefined);
    }
  };

  const setState = (tabId: string, state: any) => {
    setTabs((tabs) =>
      tabs.map((tab) => {
        if (tab.tabId === tabId) {
          return { ...tab, state };
        }
        return tab;
      })
    );
  };

  const changeCurrentPage = (tabId: string, page: React.ComponentType<any>, state: any) => {
    setTabs((tabs) =>
      tabs.map((tab) => {
        if (tab.tabId === tabId) {
          return { ...tab, CurrentPage: page, state };
        }
        return tab;
      })
    );
  };

  return (
    <TabContext.Provider
      value={{
        tabs,
        setTabs,
        addNewTab,
        removeTab,
        selectedTab,
        setSelectedTab,
        setState,
        changeCurrentPage,
      }}
    >
      {children}
    </TabContext.Provider>
  );
}

export function useTabContext() {
  return useContext(TabContext);
}

export default TabContextProvider;
