export default function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { phone_number } = req.body;

      // Basic check
      if (!phone_number) {
        return res.status(400).json({ error: 'Phone number is required' });
      }

      // For now, return dummy match
      const hardcodedList = ['1234567890', '9876543210'];
      const match = hardcodedList.includes(phone_number);

      return res.status(200).json({ match });
    } else {
      res.setHeader('Allow', ['POST']);
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('Error in handler:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
