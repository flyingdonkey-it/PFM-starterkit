const axios = require('axios');
const { getBasiqAuthorizationHeader } = require('../../serverAuthentication');

/**
 * This API endpoint deletes consent of a user.
 *
 * https://api.basiq.io/reference/deleteconsent
 */

export default async function deleteConsent(req, res) {
  if (req.method === 'DELETE') {
    try {
      const { userId, consentId } = req.query;
      const { data } = await axios({
        method: 'delete',
        url: `https://au-api.basiq.io/users/${userId}/consents/${consentId}`,
        headers: {
          Authorization: await getBasiqAuthorizationHeader(),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
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
