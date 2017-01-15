const electron = require('electron');
const { app } = electron;
const { BrowserWindow } = electron;
let mainWindows;

function createWindow() {
    mainWindows = new BrowserWindow({ width: 494, minWidth: 200, height: 800, minHeight: 400, skipTaskbar: false, title: "Stacknote", icon: __dirname + '/imge/logo.png' });
    mainWindows.loadURL(`file://${__dirname}/index.html`);
    mainWindows.setOverlayIcon(__dirname + '/imge/logo.png', "Stacknote");
    mainWindows.setResizable(true);
    //mainWindows.webContents.openDevTools();
    mainWindows.on('closed', () => {
        mainWindows = null;
    })
};
app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit;
    }
})
app.on('activate', () => {
    if (mainWindows == null) {
        createWindow();
    }
})