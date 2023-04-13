const { getNewClientToken } = require('../../serverAuthentication');

/**
 * This API endpoint retrieves a Basiq API token with the scope of `CLIENT_ACCESS`
 *
 * https://api.basiq.io/reference/authentication
 */

export default async function clientToken(req, res) {
  const { userId } = req.query;
  try {
    const clientToken = await getNewClientToken(userId);
    res.status(200).json(clientToken);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
