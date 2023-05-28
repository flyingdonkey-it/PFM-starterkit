const axios = require('axios');
const { getBasiqAuthorizationHeader } = require('../../serverAuthentication');

/**
 * This API endpoint retrieves user transactions.
 *
 * https://api.basiq.io/reference/gettransactions
 */

const transactions = async (req, res) => {
  const { userId, limit } = req.query;
  try {
    const { data } = await axios.get(`https://au-api.basiq.io/users/${userId}/transactions?limit=${limit}`, {
      headers: {
        Authorization: await getBasiqAuthorizationHeader(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    res.status(200).json(data.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default transactions;
