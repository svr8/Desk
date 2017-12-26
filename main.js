const electron = require('electron')
const {app, BrowserWindow, webFrame} = electron
let win

app.on('ready', () => {
    win  = new BrowserWindow({width:1500, height:1000})
    win.loadURL(`file:/${__dirname}/main.html`)
    win.setMenu(null)
})