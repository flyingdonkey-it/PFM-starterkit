const axios = require('axios');
const { getBasiqAuthorizationHeader } = require('../../serverAuthentication');

/**
 * This API endpoint retrieves a specific account of a user.
 *
 * https://au-api.basiq.io/users/{userId}/accounts/{accountId}
 */

export default async function getAccount(req, res) {
  if (req.method === 'GET') {
    try {
      const { userId, accountId } = req.query;
      const { data } = await axios.get(
        `https://au-api.basiq.io/users/${userId}/accounts/${accountId}`,
        {
          headers: {
            Authorization: await getBasiqAuthorizationHeader(),
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        }
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    // Only GET is allowed
    res.status(400).json({ message: 'Invalid method' });
  }
}
