import { useEffect } from "react";
import { useTabContext } from "./context/tab/TabContext";

function App() {
  const { tabs, addNewTab, removeTab, selectedTab, setSelectedTab, setState } = useTabContext();

  useEffect(() => {
    if (!selectedTab || !tabs.length) return;
    // update selected tab whenever tabs change
    const { tabId } = selectedTab;
    const tab = tabs.find((tab) => tab.tabId === tabId);
    if (tab) {
      setSelectedTab(tab);
    }
  }, [tabs]);

  return (
    <div className="m-2">
      <div className="flex bg-base-100 gap-2 flex-wrap">
        {tabs.map((tab, index) => (
          <div key={tab.tabId} className="flex items-center">
            <a
              className={`btn ${selectedTab?.tabId === tab.tabId ? "btn-neutral" : "btn-outline"}`}
              onClick={() => setSelectedTab(tab)}
            >
              {`${tab.name} - ${index + 1}`}
            </a>
            <button className="btn btn-error btn-xs ml-1" onClick={() => removeTab(tab.tabId)}>
              x
            </button>
          </div>
        ))}
        <button className="btn btn-primary text-3xl" onClick={addNewTab}>
          +
        </button>
      </div>
      {selectedTab && (
        <div key={selectedTab.tabId}>
          <selectedTab.CurrentPage tabId={selectedTab.tabId} state={selectedTab.state} setState={setState} />
        </div>
      )}
    </div>
  );
}

export default App;
