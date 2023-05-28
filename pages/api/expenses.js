const axios = require('axios');
const { getBasiqAuthorizationHeader } = require('../../serverAuthentication');

/**
 * This API endpoint retrieves user expenses.
 *
 * https://api.basiq.io/reference/getexpenses
 */

const retrieveExpense = async (req, res) => {
  const { userId, snapshotId } = req.query;
  try {
    const { data } = await axios.get(`https://au-api.basiq.io/users/${userId}/expenses/${snapshotId}`, {
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

export default retrieveExpense;
