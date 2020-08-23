import { windowConfig } from './config/window';

const electron = require('electron');
const { app, BrowserWindow } = electron;

app.on('ready', () => {
  // initialise application window
  const win  = new BrowserWindow(windowConfig);

  // load UI
  win.loadURL(`file://${__dirname}/main.html`)
  // win.setMenu(null)
})

// Close app background processes on close-window
app.on('window-all-closed', () => {
    app.quit();
  });
