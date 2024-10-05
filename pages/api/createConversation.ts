import { connect } from '../../lib/db';
import { Conversation, Message } from "../../models/Chat";
import User from "../../models/User";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  
  console.log('Request body:', req.body);
  
  await connect();
  const { clerkId, username } = req.body;
  console.log('Received clerkId:', clerkId, 'username:', username);
  
  try {
    // Check if the user exists; if not, create a new user
    let user = await User.findOne({ clerkId }).lean();
    if (!user) {
      const fallbackUsername = username || `user_${clerkId.substring(0, 8)}`;
      const fallbackEmail = `${fallbackUsername}@example.com`;
      
      user = await User.create({
        clerkId,
        username: fallbackUsername,
        email: fallbackEmail,
        isComplete: true,
        // Add other required fields as needed
      });
    }
    
    console.log('User:', user);

    const userId = user._id.toString();
    
    // Create a new conversation for the user
    const conversation = await Conversation.create({
      participants: [{ userId, unreadCount: 0 }],
      isGroupChat: false,
      type: "primary"
    });
    
    // Add this conversation to the user's chats
    await User.findByIdAndUpdate(userId, {
      $push: { chats: conversation._id.toString() }
    });
    
    res.status(200).json({ conversation: conversation._id.toString() });
  } catch (error) {
    console.error('Detailed error:', error);
    if (error.name === 'MongooseError' && error.message.includes('buffering timed out')) {
      return res.status(503).json({ message: 'Database connection timed out. Please try again.' });
    }
    res.status(500).json({ message: 'Error creating conversation', error: error.message });
  }
}