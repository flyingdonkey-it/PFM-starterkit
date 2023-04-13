import { axios } from '@/utils/axios';

/**
 * The Basiq API authentication process is fairly straight forward, we simply exchange our API key for a token which has an expiry of 60 minutes
 * Our token will be passed as the authorization header to requests made to the Basiq API, which you can find in `./utils/axios`
 *
 * IMPORTANT: You do not want to request a new token on every request!
 * In this file we keep the latest client token in local storage and only request a new token when it is expired
 *
 * https://api.basiq.io/reference/authentication
 * */

const REFRESH_INTERVAL = 1000 * 60 * 30; // 30 minutes
const TOKEN_KEY = 'basiqApiClientAccessToken';
const REFRESH_DATE_KEY = 'basiqApiClientAccessTokenRefreshDate';

export async function getBasiqAuthorizationHeader() {
  const token = await getClientToken();
  return `Bearer ${token}`;
}

export async function getClientToken(userId) {
  let token = getClientTokenFromLocalStorage();
  const refreshDate = getClientTokenRefreshDateFromLocalStorage() || 0;

  if (!token || Date.now() - refreshDate > REFRESH_INTERVAL || userId) {
    // If we don't have a client token in memory or the token has expired, fetch a new one
    token = await updateClientToken(userId);
  }

  return token;
}

async function updateClientToken(userId) {
  const token = await getNewClientToken(userId);
  setClientTokenInLocalStorage(token);

  const refreshDate = Date.now();
  setClientTokenRefreshDateInLocalStorage(refreshDate);

  return token;
}

async function getNewClientToken(userId) {
  const { data } = await axios.get('/api/client-token', { params: { userId } });
  return data;
}

export function getClientTokenFromLocalStorage() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setClientTokenInLocalStorage(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getClientTokenRefreshDateFromLocalStorage() {
  return localStorage.getItem(REFRESH_DATE_KEY);
}

export function setClientTokenRefreshDateInLocalStorage(token) {
  localStorage.setItem(REFRESH_DATE_KEY, token);
}
