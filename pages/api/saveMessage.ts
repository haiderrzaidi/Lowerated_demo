import { connect } from '../../lib/db';
import { Conversation, Message } from "../../models/Chat";
import User from "../../models/User";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  await connect();

  const { clerkId, userName, userMessage, botResponse, conversationId } = req.body;

  try {
    // Check if the user exists; if not, create a new user
    let user = await User.findOne({ clerkId }).lean();

    if (!user) {
      user = await User.create({
        clerkId,
        username: userName,
        email: `${userName}@example.com`,
        isComplete: true,
      });
    }

    // Ensure user is not null here
    if (!user) {
      return res.status(500).json({ message: 'Error creating user' });
    }

    const userId = user._id.toString(); // user._id is now safe to access

    // Find the specified conversation
    const conversation = await Conversation.findById(conversationId).lean();

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    // Create user and bot messages
    const [userMessageDoc, botMessageDoc] = await Promise.all([
      Message.create({
        conversationId: conversation._id.toString(),
        senderId: userId,
        senderType: 'user',
        content: userMessage,
      }),
      Message.create({
        conversationId: conversation._id.toString(),
        senderId: userId,
        senderType: 'bot',
        content: botResponse,
      })
    ]);

    // Update conversation with new messages and last message info
    await Conversation.findByIdAndUpdate(conversation._id.toString(), {
      $push: {
        messages: {
          $each: [userMessageDoc._id.toString(), botMessageDoc._id.toString()],
        },
      },
      $set: {
        lastMessage: {
          senderId: userId,
          content: botResponse,
          timestamp: new Date(),
        }
      }
    });

    res.status(200).json({ message: 'Messages saved successfully' });
  } catch (error) {
    console.error('Detailed error:', error);
    if (error.name === 'MongooseError' && error.message.includes('buffering timed out')) {
      return res.status(503).json({ message: 'Database connection timed out. Please try again.' });
    }
    res.status(500).json({ message: 'Error saving messages', error: error.message });
  }
}
