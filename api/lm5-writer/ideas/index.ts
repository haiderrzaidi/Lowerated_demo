// api/chat.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message, history } = req.body;
    try {
      const response = await axios.post('http://13.60.20.160:5000/chat', {
        message,
        history,
      });
      res.status(200).json({ message: response.data.message });
    } catch (error) {
      console.error("Error sending message to the API", error);
      res.status(500).json({ error: 'Failed to send message' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}