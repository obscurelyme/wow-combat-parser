import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';

import { ElectronError } from '@obscure/types';

import { getAllReports, getReport } from './reportfetcher';
import { getAllEncountersFromReport } from './encounterfetcher';
import { createReport, deleteReport } from './handlers';
import { fetchGeneralAuthToken, fetchProfileAuthToken } from './vendors/blizzard';
import { buildElectronResponse } from './utils';
import { getAuthTokens, isAuthTokenExpired, saveTokens } from './handlers/user';

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

ipcMain.handle('createReport', createReport);
ipcMain.handle('deleteReport', deleteReport);
ipcMain.handle('getAllReports', async () => {
  const reports = await getAllReports();
  return reports;
});
ipcMain.handle('getReport', async (_, reportGuid) => {
  const report = await getReport(reportGuid);
  return report;
});
ipcMain.handle('getAllEncountersFromReport', async (_, reportGuid) => {
  const encounters = await getAllEncountersFromReport(reportGuid);
  return encounters;
});

ipcMain.handle('getBNetProfileAuthToken', async (_, authCode) => {
  try {
    const token = await getAuthTokens();
    if (!token.profileToken || isAuthTokenExpired(token.profileTokenExpireDate)) {
      const payload = await fetchProfileAuthToken(authCode);
      const newToken = {
        profileToken: payload.access_token,
        profileTokenExpireDate: new Date().getTime() + payload.expires_in,
      };
      await saveTokens(newToken);
      console.log('[IPC EVENT]=>getBNetProfileAuthToken returning new valid tokens from fetch');
      return {
        token: newToken.profileToken,
        expireTimestamp: newToken.profileTokenExpireDate,
      };
    }
    console.log('[IPC EVENT]=>getBNetProfileAuthToken returning valid tokens from database');
    return {
      token: token.profileToken,
      expireTimestamp: token.profileTokenExpireDate,
    };
  } catch (e) {
    console.error(e);
    return buildElectronResponse(undefined, new ElectronError({ ...(e as Error) }));
  }
});
ipcMain.handle('getBNetGeneralAuthToken', async () => {
  try {
    const token = await getAuthTokens();
    if (!token.generalToken || isAuthTokenExpired(token.generalTokenExpireDate)) {
      const payload = await fetchGeneralAuthToken();
      const newToken = {
        generalToken: payload.access_token,
        generalTokenExpireDate: new Date().getTime() + payload.expires_in,
      };
      await saveTokens(newToken);
      console.log('[IPC EVENT]=>getBNetGeneralAuthToken returning new valid tokens from fetch');
      return {
        token: newToken.generalToken,
        expireTimestamp: newToken.generalTokenExpireDate,
      };
    }
    console.log('[IPC EVENT]=>getBNetGeneralAuthToken returning valid tokens from database');
    return {
      token: token.generalToken,
      expireTimestamp: token.generalTokenExpireDate,
    };
  } catch (e) {
    console.error(e);
    return buildElectronResponse(undefined, new ElectronError({ ...(e as Error) }));
  }
});
