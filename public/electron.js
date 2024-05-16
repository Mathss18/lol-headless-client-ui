import { app, BrowserWindow } from "electron"; // electron
import isDev from "electron-is-dev"; // To check if electron is in development mode
import path from "path";


let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 600,
    webPreferences: {
      preload: isDev ? path.join(app.getAppPath(), "/preload.js") : path.join(app.getAppPath(), "./dist/preload.js"),
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


import "../src/communication/index.js";