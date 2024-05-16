import { ipcMain } from "electron";
import { HeadlessClient, Region } from "lol-headless-client";

const hc = new HeadlessClient({ region: Region.BR });

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

ipcMain.handle("test", (event, args) => {
  return args;
});
