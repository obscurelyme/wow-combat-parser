import { app, BrowserWindow, ipcMain, session } from 'electron';
import { join } from 'path';
import type { Options } from 'open';

let open: null | ((target: string, options?: Options) => Promise<ChildProcess>) = null;

import('open')
  .then(importedModule => {
    open = importedModule.default;
    console.log('sdfsd');
  })
  .catch(e => {
    console.error(e);
  });

import { ElectronError } from '@obscure/types';

import { getAllReports, getReport } from './handlers/reports/index.js';
import { getAllEncountersFromReport } from './handlers/encounters/index.js';
import { connectReportHandlers } from './handlers/index.js';
import { fetchGeneralAuthToken } from './vendors/blizzard.js';
import { buildElectronResponse } from './utils/index.js';
import { getAuthTokens, isAuthTokenExpired, saveTokens, connectUserHandles } from './handlers/user/index.js';
import { connectHandlers as connectJournalEncounterHandlers } from './handlers/journalEncounter/index.js';
import { connectBattleNetCreatureDataHandlers } from './handlers/battlenet/gamedata/creature/index.js';
import { connectBattleNetJournalDataHandlers } from './handlers/battlenet/gamedata/journal/index.js';
import { connectBNetProfileHandlers } from './handlers/battlenet/profile/index.js';
import { connectEncounterHandlers } from './handlers/encounters/index.js';

import CombatDB from './database.js';
import { config } from 'dotenv';

import electronReload from 'electron-reload';
import { ChildProcess } from 'child_process';

electronReload(__dirname, {});

config({
  path: join(__dirname, '../../../.env'),
});

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
  await CombatDB.initialize();
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

  void open?.('https://github.com');
}

app.on('ready', () => {
  session.defaultSession.clearStorageData({ storages: ['cookies'] }).then(e => {
    console.log('storage data cleared');
  });
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
ipcMain.handle('getBNetGeneralAuthToken', async () => {
  try {
    const token = await getAuthTokens();
    if (!token.generalToken || isAuthTokenExpired(token.generalTokenExpireDate)) {
      const payload = await fetchGeneralAuthToken();
      const newToken = {
        generalToken: payload.access_token,
        generalTokenExpireDate: new Date().getTime() + payload.expires_in * 1000,
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
connectBNetProfileHandlers(ipcMain);
connectJournalEncounterHandlers(ipcMain);
connectReportHandlers(ipcMain);
connectBattleNetJournalDataHandlers(ipcMain);
connectBattleNetCreatureDataHandlers(ipcMain);
connectUserHandles(ipcMain);
connectEncounterHandlers(ipcMain);
