const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("api", {
  LHCListen: (listener) => ipcRenderer.on("lol-headless-client-listen-events", (event, ...args) => listener(...args)),
  LHCLogin: (args) => ipcRenderer.invoke("lol-headless-client-login", args),
  LHCSendMessage: (args) => ipcRenderer.invoke("lol-headless-client-send-message", args),
  LHCSetInfo: (args) => ipcRenderer.invoke("lol-headless-client-set-info", args),
  LHCGetFriendList: (args) => ipcRenderer.invoke("lol-headless-client-get-friendlist", args),
  LHCGetChatHistory: (args) => ipcRenderer.invoke("lol-headless-client-get-chat-history", args),
});
