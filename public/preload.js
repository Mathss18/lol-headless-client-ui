const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("api", {
  test: (args) => ipcRenderer.invoke("test", args),
  // Invoke Methods
  testInvoke: (args) => ipcRenderer.invoke("test-invoke", args),
  // Send Methods
  testSend: (args) => ipcRenderer.send("test-send", args),
  // Receive Methods
  testReceive: (callback) =>
    ipcRenderer.on("test-receive", (event, data) => {
      callback(data);
    }),

  LHCLogin: (args) => ipcRenderer.invoke("lol-headless-client-login", args),
  LHCSendMessage: (args) =>
    ipcRenderer.invoke("lol-headless-client-send-message", args),
});
