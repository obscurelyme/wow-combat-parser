import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { FileReader } from './filereader';
import { getAllReports } from './reportfetcher';
import { getAllEncountersFromReport } from './encounterfetcher';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit();
}

let mainWindow: BrowserWindow | null = null;

async function createWindow() {
  console.log(app.getPath('exe'));
  mainWindow = new BrowserWindow({
    title: 'WoW Combat Parser',
    width: 1024,
    height: 768,
    webPreferences: {
      preload: join(__dirname, '../dist/preload.js'),
      nodeIntegration: true,
    },
  });

  if (app.isPackaged) {
    mainWindow.loadFile(join(__dirname, '../../obscure-ui/dist/index.html'));
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

ipcMain.handle('createReport', (_, reportName, filePath) => {
  return new Promise(resolve => {
    console.log(reportName, filePath);
    const fileReader = new FileReader();
    fileReader.on('done', contents => {
      console.log('Report created');
      resolve(contents);
    });
    fileReader.read(reportName, filePath);
  });
});

ipcMain.handle('getAllReports', async () => {
  const reports = await getAllReports();
  return reports;
});

ipcMain.handle('getAllEncountersFromReport', async (_, reportGuid) => {
  const encounters = await getAllEncountersFromReport(reportGuid);
  return encounters;
});
