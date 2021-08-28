const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 600,
    height: 200,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
    frame: false,
    maximizable: false,
    minimizable: false,
    title: "Update Test",
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "src/index.html"),
      protocol: "file",
      slashes: true,
    })
  );

  win.webContents.openDevTools();
  win.once("ready-to-show", () => {
    win.show();
  });
}

app.on("ready", () => {
  createWindow();

  win.on("close", async function (e) {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
