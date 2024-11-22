import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { EventStatus } from "@/enums/status";
import MessageHistory from "@/interfaces/message-history";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface ChatState {
  status: EventStatus;
  message: string;
  convHistory: MessageHistory[];
  error: string;
}

interface SendMessagePayload {
  message: string;
}

const initialState: ChatState = {
  status: EventStatus.initial,
  message: '',
  convHistory: [],
  error: '',
}

// This is the settings for Gemini Generative Model Api
const apiKey = process.env.EXPO_PUBLIC_API_KEY;
if (!apiKey) {
  throw new Error("API Key is not defined in the environment variables.");
}
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "after every message add this line 'Meep morp ~ 🤖'",
});
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const askGemini = createAsyncThunk(
  'chat/askGemini',
  async (query: SendMessagePayload, { getState, rejectWithValue }) => {
    const { convHistory } = (getState() as { chat: ChatState }).chat;

    const chatSession = model.startChat({
      generationConfig,
      history: [
        ...convHistory.map(msg => ({
          role: msg.role,
          parts: msg.parts.map(part => ({ text: part.text })),
        })),
        {
          role: 'user',
          parts: [{ text: query.message }]
        },
      ],
    });

    try {
      const result = await chatSession.sendMessage(query.message);

      return result.response.text();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: initialState,
  reducers: {
    writeMessage: (state, actions: PayloadAction<SendMessagePayload>) => {
      state.message = actions.payload.message;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(askGemini.pending, (state) => {
      state.status = EventStatus.loading;
      if (state.message !== '') {
        state.convHistory.push({
          role: 'user',
          parts: [{ text: state.message }]
        });
      }
      console.log(state.convHistory);
      state.message = '';
    });

    builder.addCase(askGemini.fulfilled, (state, action) => {
      state.status = EventStatus.success;
      state.convHistory.push({
        role: 'model',
        parts: [{ text: action.payload }],
      });
      console.log(state.convHistory);
    });

    builder.addCase(askGemini.rejected, (state) => {
      state.status = EventStatus.failed;
      state.error = 'Something went wrong';
      console.log(state.error);
    });
  }
});

export const { writeMessage } = chatSlice.actions;
export default chatSlice.reducer;
