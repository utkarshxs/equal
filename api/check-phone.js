export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    const { phone_number } = req.body;

    if (!phone_number) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    // Step 1: Fetch the text file from GitHub
    const response = await fetch('https://raw.githubusercontent.com/utkarshxs/equal/main/Phone%20Number%20List.txt');

    if (!response.ok) {
      throw new Error('Failed to fetch phone number list');
    }

    const text = await response.text();

    // Step 2: Split text into array of phone numbers (removing spaces)
    const phoneList = text
      .split('\n')
      .map(num => num.trim())
      .filter(num => num !== '');

    // Step 3: Compare
    const match = phoneList.includes(phone_number);

    return res.status(200).json({ match });

  } catch (error) {
    console.error('Error in handler:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
