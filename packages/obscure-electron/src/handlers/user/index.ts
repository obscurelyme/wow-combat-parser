import { User } from '@obscure/types';

import CombatDB from '../../database';
import { IpcMain } from 'electron';

// NOTE: just a single user within the database, we use this single record for all auth purposes
const GLOBAL_USER_ID = 1;

export async function getAuthTokens() {
  const conn = CombatDB.connection();

  return conn<User>('User')
    .select('generalToken', 'profileToken', 'generalTokenExpireDate', 'profileTokenExpireDate')
    .where({
      id: GLOBAL_USER_ID,
    })
    .then(rows => {
      return {
        generalToken: rows[0].generalToken,
        profileToken: rows[0].profileToken,
        generalTokenExpireDate: rows[0].generalTokenExpireDate,
        profileTokenExpireDate: rows[0].profileTokenExpireDate,
      };
    });
}

export async function saveTokens(tokenData: Omit<User, 'id'>): Promise<boolean> {
  const conn = CombatDB.connection();

  return conn<User>('User')
    .update({
      ...tokenData,
    })
    .where({ id: GLOBAL_USER_ID })
    .then(rows => {
      if (rows === 1) {
        return true;
      }
      return false;
    });
}

export function isAuthTokenExpired(expireDate?: number): boolean {
  if (!expireDate) {
    return true;
  }
  return new Date().getTime() > expireDate;
}

export async function logoutUser(): Promise<void> {
  const conn = CombatDB.connection();

  return conn('User')
    .update({ profileToken: null, profileTokenExpireDate: null })
    .where({ id: GLOBAL_USER_ID })
    .then(_ => {
      return;
    })
    .catch(_ => {
      return;
    });
}

async function getGeneralAuthToken() {
  return await Promise.resolve();
}

async function checkProfileAuthToken() {
  return await Promise.resolve();
}

async function checkGeneralAuthToken() {
  return await Promise.resolve();
}

async function renewProfileAuthToken() {
  return await Promise.resolve();
}

async function renewGeneralAuthToken() {
  return await Promise.resolve();
}

export function connectUserHandles(ipcMain: IpcMain): void {
  ipcMain.handle('logoutUser', async () => {
    return await logoutUser();
  });
}
