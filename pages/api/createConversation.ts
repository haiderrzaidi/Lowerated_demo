import { connect } from '../../lib/db';
import { Conversation, Message } from "../../models/Chat";
import User from "../../models/User";
import { NextApiRequest, NextApiResponse } from 'next';
import { Document } from 'mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  console.log('Request body:', req.body);
  
  await connect();
  const { clerkId, username } = req.body;
  console.log('Received clerkId:', clerkId, 'username:', username);
  
  try {
    let user: Document | null = await User.findOne({ clerkId }).lean();
    if (!user) {
      const fallbackUsername = username || `user_${clerkId.substring(0, 8)}`;
      const fallbackEmail = `${fallbackUsername}@example.com`;
      
      user = await User.create({
        clerkId,
        username: fallbackUsername,
        email: fallbackEmail,
        isComplete: true,
      });
    }

    console.log('User:', user);
    
    if (!user || !user._id) {
      return res.status(500).json({ message: 'User could not be found or created.' });
    }

    const userId = user._id.toString();
    
    const conversation = await Conversation.create({
      participants: [{ userId, unreadCount: 0 }],
      isGroupChat: false,
      type: "primary"
    });

    await User.findByIdAndUpdate(userId, {
      $push: { chats: conversation._id.toString() }
    });

    res.status(200).json({ conversation: conversation._id.toString() });
  } catch (error: unknown) {
    console.error('Detailed error:', error);

    // Type assertion to recognize error as an Error object
    if (error instanceof Error) {
      if (error.name === 'MongooseError' && error.message.includes('buffering timed out')) {
        return res.status(503).json({ message: 'Database connection timed out. Please try again.' });
      }
      res.status(500).json({ message: 'Error creating conversation', error: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred.' });
    }
  }
}
