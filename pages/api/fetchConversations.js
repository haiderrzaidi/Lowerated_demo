import { connect } from '../../lib/db'; 
import { Conversation } from '../../models/Chat'; 
import User from '../../models/User'; 
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  await connect(); 

  const { clerkId } = req.query;

  if (!clerkId || typeof clerkId !== 'string') {
    return res.status(400).json({ message: 'Bad Request: clerkId is required' });
  }

  try {
    const user = await User.findOne({ clerkId }).lean();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userId = user._id.toString();
    const conversations = await Conversation.find({
      "participants.userId": userId,
    })
    .select('_id groupName lastMessage')
    .lean();

    res.status(200).json({ conversations });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
