"use client";

import { useParams } from 'next/navigation';
import React from 'react';
import IdeasPage from '../ideasPage';

const ConversationPage = () => {
  const params = useParams();
  const conversationId = params?.conversationId as string;

  return (
    <div className="flex flex-col items-center justify-center">
      <IdeasPage conversationId={conversationId} />
    </div>
  );
};

export default ConversationPage;