import { connect } from '../../lib/db';
import { Conversation, Message } from '../../models/Chat';
import User from '../../models/User';
import { NextApiRequest, NextApiResponse } from 'next';
import { Document } from 'mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  await connect();

  const { conversationId } = req.query;

  if (!conversationId || typeof conversationId !== 'string') {
    return res.status(400).json({ message: 'Bad Request: conversationId is required' });
  }

  try {
    console.log('Fetching conversation for conversationId:', conversationId);

    // Find the conversation directly using the conversationId
    const conversation: Document | null = await Conversation.findById(conversationId).lean();

    if (!conversation) {
      console.log('No conversation found for conversationId:', conversationId);
      return res.status(404).json({ message: 'Conversation not found' });
    }

    console.log('Found conversation:', conversation);

    // Use type assertion to tell TypeScript that conversation is not null
    const conversationIdStr = conversation.id.toString();

    // Fetch messages for the found conversation
    const messages = await Message.find({ conversationId: conversationIdStr })
      .sort({ timestamp: 1 })
      .lean();

    console.log('Found messages:', messages);

    res.status(200).json({ messages });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
}
