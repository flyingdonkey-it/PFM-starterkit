const axios = require('axios');
const { getBasiqAuthorizationHeader } = require('../../serverAuthentication');

/**
 * This API endpoint creates a new expense summary for a user.
 *
 * https://api.basiq.io/reference/postexpenses
 */

export default async function createExpense(req, res) {
  if (req.method === 'POST') {
    const { userId } = req.query;
    try {
      const { data } = await axios({
        method: 'post',
        url: `https://au-api.basiq.io/users/${userId}/expenses`,
        headers: {
          Authorization: await getBasiqAuthorizationHeader(),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: req.body,
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
