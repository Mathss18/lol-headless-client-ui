import { ipcMain } from "electron";
import { HeadlessClient, Region } from "lol-headless-client";

const hc = new HeadlessClient({ region: Region.BR });
const callback = ({ eventName, data }) => console.log({ eventName, data });
hc.listen(callback)

ipcMain.handle("lol-headless-client-login", async (event, args) => {
  const { username, password } = args;
  try {
    await hc.login({ username, password });
    console.log("LOGADO!");
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

ipcMain.handle("lol-headless-send-message", async (event, args) => {
  const { message, jid } = args;
  try {
    await hc.sendMessage({ message, jid });
  } catch (error) {
    console.dir(error);
  }
});

ipcMain.handle("test", (event, args) => {
  return args;
});
