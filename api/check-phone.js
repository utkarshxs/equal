const axios = require('axios');

const GITHUB_FILE_URL = 'https://raw.githubusercontent.com/utkarshxs/equal/refs/heads/main/Phone%20Number%20List.txt';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { phone_number } = req.body;

  if (!phone_number) {
    return res.status(400).json({ error: 'Missing phone_number' });
  }

  try {
    const response = await axios.get(GITHUB_FILE_URL);
    const phoneList = response.data
      .split('\n')
      .map(num => num.trim())
      .filter(Boolean);

    const match = phoneList.includes(phone_number);
    return res.status(200).json({ match });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
}
