import { app, BrowserWindow } from "electron";
import * as windowStateKeeper from 'electron-window-state';

const args = process.argv.slice(1)
const serve = args.some(val => val === '--serve')

const createWindow = () => {
  let mainWindowState = windowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 600
  });

  let win: BrowserWindow | undefined = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      allowRunningInsecureContent: serve,
      devTools: serve
    }
  })

  win.setMenu(null)

  mainWindowState.manage(win);

  if (serve) {
    win.loadURL('http://localhost:4200');
  } else {
    win.loadFile('dist/screen/index.html')
  }

  win.on('closed', () => {
    win = undefined;
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  app.on('window-all-closed', () => {
    app.quit()
  })
})
