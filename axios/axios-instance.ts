import axios from 'axios';

const useGemini = axios.create({
  baseURL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent',
  headers: {
    'Content-Type': 'application/json' ,
  },
});

useGemini.interceptors.request.use((request) => {
  if (request.data && typeof request.data === 'string') {
    request.data = {
      contents: [
        {
          parts: [
            {
              text: request.data
            }
          ]
        }
      ]
    }
  }
  return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default useGemini;