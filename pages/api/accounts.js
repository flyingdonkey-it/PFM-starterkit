const axios = require('axios');
const { getBasiqAuthorizationHeader } = require('../../serverAuthentication');

/**
 * This API endpoint retrieves a list of accounts. Each entry in the array is a separate account object.
 *
 * https://api.basiq.io/reference/list-all-accounts
 */

export default async function accounts(req, res) {
  const { userId } = req.query;
  try {
    const { data } = await axios.get(
      `https://au-api.basiq.io/users/${userId}/accounts`,
      {
        headers: {
          Authorization: await getBasiqAuthorizationHeader(),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    const sortedAccounts = data.data
      .map(account => {
        const isAvailable = account.status === 'available';
        const isTransactionAccount = account.class.type === 'transaction';
        const disabled = !isAvailable || !isTransactionAccount;
        return {
          ...account,
          disabled,
        };
      })
      // Make sure disabled accounts appear last
      .sort((a, b) => a.disabled - b.disabled);

    res.status(200).json(sortedAccounts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
