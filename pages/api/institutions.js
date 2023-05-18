const axios = require('axios');
const { getBasiqAuthorizationHeader } = require('../../serverAuthentication');

/**
 * This API endpoint retrieves a list of institutions. Each entry in the array is a separate institution object.
 *
 * https://api.basiq.io/reference/list-all-institutions
 */

const institutions = async (req, res) => {
  try {
    const { data } = await axios.get('https://au-api.basiq.io/institutions', {
      headers: {
        Authorization: await getBasiqAuthorizationHeader(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const filteredAndSortedData = data.data
      .filter(({ authorization, stage, status }) => {
        // Filter out institutions that do not have user authorization as other methods are not supported by this demo
        if (authorization !== 'user') return false;
        // Filter out institutions with "stage": "alpha" as these are still in development
        if (stage === 'alpha') return false;
        // Filter out institutions with "status": "major-outage" as these connections are likely to fail due to a temporary issue on the bank's side (e.g., a maintenance outage or performance issue)
        if (status === 'major-outage') return false;
        // Here you can filter out institutions which do not offer the data points essential to you
        // (e.g., NAB does not return features.accounts.accountHolder for web connections)
        return true;
      })
      // Sort institutions by the "tier" attribute
      .sort((a, b) => a.tier - b.tier);

    res.status(200).json(filteredAndSortedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default institutions;
