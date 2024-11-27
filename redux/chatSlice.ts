import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { EventStatus } from "@/enums/status";
import MessageHistory from "@/interfaces/message-history";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import History from '@/interfaces/history';

interface ChatState {
  status: EventStatus;
  message: string;
  convHistory: MessageHistory[];
  showModal: boolean;
  chatTitle: string;
  error: string;
}

interface SendMessagePayload {
  message: string;
}

const initialState: ChatState = {
  status: EventStatus.initial,
  message: '',
  convHistory: [],
  showModal: false,
  chatTitle: '',
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

export const saveChat = createAsyncThunk(
  'chat/saveChat',
  async (title: string, { getState, rejectWithValue }) => {
    const { convHistory } = (getState() as { chat: ChatState }).chat;

    try {
      const docRef = addDoc(collection(db, 'chat-history'), {
        chatTitle: title,
        history: [
          ...convHistory.map(msg => ({
            role: msg.role,
            parts: msg.parts.map(part => ({ text: part.text })),
          })),
        ],
      });
    } catch (e) {
      console.error("Error adding document: ", e);
      return rejectWithValue(e);
    }
  }
);

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
    triggerPopup: (state, actions: PayloadAction<boolean>) => {
      state.showModal = actions.payload;
    },
    setChatTitle: (state, actions: PayloadAction<string>) => {
      state.chatTitle = actions.payload;
    },
    setConvHistory: (state, actions: PayloadAction<MessageHistory[]>) => {
      state.convHistory = actions.payload;
    }
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

    builder.addCase(saveChat.pending, (state) => {
      state.showModal = false;
    });
  }
});

export const { writeMessage, triggerPopup, setChatTitle, setConvHistory } = chatSlice.actions;
export default chatSlice.reducer;
