const axios = require('axios');
const qs = require('qs');

/**
 * The Basiq API authentication process is fairly straight forward, we simply exchange our API key for a token which has an expiry of 60 minutes
 * Our token will be passed as the authorization header to requests made to the Basiq API, which you can find in `pages/api`
 *
 * IMPORTANT: You do not want to request a new token on every request!
 * In this file we keep the latest server token in memory and only request a new token when it is expired
 *
 * https://api.basiq.io/reference/authentication
 * */

const REFRESH_INTERVAL = 1000 * 60 * 30; // 30 minutes

let serverToken = undefined;
let serverTokenRefreshDate = 0;

export async function getBasiqAuthorizationHeader() {
  const token = await getServerToken();
  return `Bearer ${token}`;
}

async function getServerToken() {
  if (!serverToken || Date.now() - serverTokenRefreshDate > REFRESH_INTERVAL) {
    // If we don't have a server token in memory, or the token has expired, fetch a new one
    await updateServerToken();
  }
  return serverToken;
}

async function updateServerToken() {
  serverToken = await getNewServerToken();
  serverTokenRefreshDate = Date.now();
}

async function getNewServerToken() {
  const { data } = await axios.post('https://au-api.basiq.io/token', qs.stringify({ scope: 'SERVER_ACCESS' }), {
    headers: {
      Authorization: `Basic ${process.env.BASIQ_API_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'basiq-version': '3.0',
    },
  });
  return data.access_token;
}

export async function getNewClientToken(userId) {
  const { data } = await axios.post('https://au-api.basiq.io/token', qs.stringify({ scope: 'CLIENT_ACCESS', userId }), {
    headers: {
      Authorization: `Basic ${process.env.BASIQ_API_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'basiq-version': '3.0',
    },
  });
  return data.access_token;
}
