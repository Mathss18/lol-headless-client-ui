import { app, BrowserWindow, ipcMain } from "electron"; // electron
import isDev from "electron-is-dev"; // To check if electron is in development mode
import path from "path";
import { HeadlessClient, Region } from "lol-headless-client";

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 600,
    webPreferences: {
      preload: isDev
        ? path.join(app.getAppPath(), "/preload.js")
        : path.join(app.getAppPath(), "./dist/preload.js"),
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
    },
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:5173" // Loading localhost if dev mode
      : `file://${path.join(__dirname, "../dist/index.html")}` // Loading build file if in production
  );

  // mainWindow.setIcon(path.join(__dirname, "images/appicon.ico"));

  // In development mode, if the window has loaded, then load the dev tools.
  if (isDev) {
    mainWindow.webContents.on("did-frame-finish-load", () => {
      // mainWindow.webContents.openDevTools({ mode: "detach" });
      mainWindow.webContents.openDevTools();
    });
  }
};

// When the app is ready to load
app.whenReady().then(() => {
  createWindow(); // Create the mainWindow
});

// Exiting the app
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Activating the app
app.on("activate", () => {
  if (mainWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Logging any exceptions
process.on("uncaughtException", (error) => {
  console.log(`Exception: ${error}`);
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// ============= HEADLESS CLIENT COMMUNICATION =============

const hc = new HeadlessClient({ region: Region.BR });

const callback = ({ eventName, data }) => {
  mainWindow.webContents.send("lol-headless-client-listen-events", {
    eventName,
    data,
  });
};
hc.listen(callback);

ipcMain.handle("lol-headless-client-login", async (event, args) => {
  const { username, password } = args;
  try {
    await hc.login({ username, password });
  } catch (error) {
    console.dir(error);
    console.dir(error?.response);
    console.dir(error?.response?.data);
    console.dir(error?.response?.data?.payload);
    console.dir(error?.error);
    console.dir(error?.data);
    console.dir(error.data?.payload);
  }
});

ipcMain.handle("lol-headless-client-send-message", async (event, args) => {
  const { message, jid } = args;
  try {
    await hc.sendMessage({ message, jid });
  } catch (error) {
    console.dir(error);
  }
});

ipcMain.on("lol-headless-client-listen-events", (event, data) => {
  console.log("Received data from React:", data);
});

ipcMain.handle("lol-headless-client-get-friendlist", (event, args) => {
  hc.getFriendList();
});

ipcMain.handle("lol-headless-client-set-info", async (event, args) => {
  const { status, message } = args;
  await hc.setInfo({ status, message });
});

ipcMain.handle("lol-headless-client-get-chat-history", async (event, args) => {
  const { jid } = args;
  await hc.getChatHistory({ jid });
});
