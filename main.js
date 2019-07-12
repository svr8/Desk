const electron = require('electron');
const {app, BrowserWindow, webFrame} = electron;
var path = require('path');
let win;


app.on('ready', () => {
    win  = new BrowserWindow({
      width:1500, 
      height:1000,
      icon: path.join(__dirname, 'icon.png'),
      webPreferences: {
        nodeIntegration: true,
      },
    })
    win.loadURL(`file://${__dirname}/main.html`)
    // win.setMenu(null)
})

//App was still running in the background after being closed, so...
app.on('window-all-closed', () => {
    app.quit();
  });
