import Axios from 'axios';
import { getBasiqAuthorizationHeader } from '../clientAuthentication';

/**
 * When making API calls from the client, you should always be importing axios from this file rather than "node_modules"
 * This is because in this file we have set up a custom axios instance with interceptors for managing tokens, error messages etc
 *
 * https://axios-http.com/docs/instance
 * https://axios-http.com/docs/interceptors
 */
export const axios = Axios.create();

// Intercept all requests made to the Basiq API and insert a "Authorization" header and other common headers
axios.interceptors.request.use(async function (request) {
  const { url, headers } = request;
  if (url?.startsWith('https://au-api.basiq.io/')) {
    headers.Authorization = await getBasiqAuthorizationHeader();
    headers.Accept = 'application/json';
    headers['Content-Type'] = 'application/json';
  }
  return request;
});

// Intercept all responses from the Basiq API and a provide more useful error messages to the user
axios.interceptors.response.use(
  // Any status code that lie within the range of 2xx cause this function to trigger
  function (response) {
    return response;
  },
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  function (error) {
    if (error.response.config.url.startsWith('https://au-api.basiq.io/') && error.response.status === 403) {
      if (process.env.NODE_ENV !== 'production') {
        // When in development mode, show a detailed error
        const details = error.response.data.data?.[0];
        return Promise.reject(details ? Error(details.title + ': ' + details.detail) : error);
      } else {
        // When in production mode, show a generic error
        return Promise.reject(
          Error('Something went wrong, please try again. If the problem persists, contact support.')
        );
      }
    }

    return Promise.reject(error);
  }
);
