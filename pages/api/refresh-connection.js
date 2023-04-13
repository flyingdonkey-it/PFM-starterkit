const axios = require('axios');
const { getBasiqAuthorizationHeader } = require('../../serverAuthentication');

/**
 * This API endpoint refreshes all connections belonging to the specified user.
 *
 * https://api.basiq.io/reference/refreshconnections
 */

export default async function refreshConnection(req, res) {
  if (req.method === 'POST') {
    const { userId } = req.query;
    try {
      const { data } = await axios({
        method: 'post',
        url: `https://au-api.basiq.io/users/${userId}/connections/refresh`,
        headers: {
          Authorization: await getBasiqAuthorizationHeader(),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    // Only POST is allowed
    res.status(400).json({ message: 'Invalid method' });
  }
}
