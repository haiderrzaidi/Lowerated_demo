import axios from 'axios';

export const sendMessageToAPI = async (message: string, history: Array<{ type: string; text: string }>): Promise<string> => {
  try {
    // console.log("History: ", history);    
    const response = await axios.post('https://www.lowerated.xyz/chat', {
      message,
      history,  // Pass history as an arrayd
    });

    return response.data.message;
  } catch (error) {
    console.error("Error sending message to the API", error);
    throw error;
  }
};