import axios from 'axios';

export const sendMessageToAPI = async (message: string, history: Array<{ type: string; text: string }>): Promise<string> => {
  try {
    console.log("History: ", history);    
    const response = await axios.post('http://13.60.20.160:5000/chat', {
      message,
      history,  // Pass history as an array
    });

    return response.data.message;
  } catch (error) {
    console.error("Error sending message to the API", error);
    throw error;
  }
};