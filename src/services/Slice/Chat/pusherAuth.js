import axios from "axios";
const API_KEY = import.meta.env.VITE_API;

const token = localStorage.getItem('token');

export const pusherAuth = async (socketId, channel) => {
  try {
    const response = await axios.post(
      `${API_KEY}/pusher/auth`,
      {
        socket_id: socketId,
        channel_name: channel
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Pusher auth error:', error);
    throw error;
  }
}; 