import { app, BrowserWindow, shell } from 'electron';
import { join } from 'path';

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit();
}

let mainWindow: BrowserWindow | null = null;

async function createWindow() {
  mainWindow = new BrowserWindow({
    title: 'WoW Combat Parser',
    width: 1024,
    height: 768,
    webPreferences: {
      preload: join(__dirname, '../build/preload.js'),
      nodeIntegration: true,
    },
  });

  if (app.isPackaged) {
    mainWindow.loadFile(join(__dirname, '../dist/index.html'));
  } else {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  }
}

app.on('ready', () => {
  createWindow();
});

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
      mainWindow.focus();
    }
  }
});

app.on('window-all-closed', () => {
  mainWindow = null;
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});
