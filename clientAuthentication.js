import { axios } from '@/utils/axios';
import useLocalStorage from './store/hooks/useLocalStorage';
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
const l_storage = useLocalStorage();

export const getBasiqAuthorizationHeader = async () => {
  const token = await getClientToken();
  return `Bearer ${token}`;
};

export const getClientToken = async userId => {
  let token = getClientTokenFromLocalStorage();
  const refreshDate = getClientTokenRefreshDateFromLocalStorage() || 0;

  if (!token || Date.now() - refreshDate > REFRESH_INTERVAL || userId) {
    // If we don't have a client token in memory or the token has expired, fetch a new one
    token = await updateClientToken(userId);
  }

  return token;
};

const updateClientToken = async userId => {
  const token = await getNewClientToken(userId);
  setClientTokenInLocalStorage(token);

  const refreshDate = Date.now();
  setClientTokenRefreshDateInLocalStorage(refreshDate);

  return token;
};

const getNewClientToken = async userId => {
  const { data } = await axios.get('/api/client-token', { params: { userId } });
  return data;
};

export const getClientTokenFromLocalStorage = () => {
  return l_storage.getItem(TOKEN_KEY);
};

export const setClientTokenInLocalStorage = token => {
  l_storage.setItem(TOKEN_KEY, token);
};

export const getClientTokenRefreshDateFromLocalStorage = () => {
  return l_storage.getItem(REFRESH_DATE_KEY);
};

export const setClientTokenRefreshDateInLocalStorage = token => {
  l_storage.setItem(REFRESH_DATE_KEY, token);
};
