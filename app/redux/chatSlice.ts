import useGemini from "@/axios/axios-instance";
import Message from "@/interfaces/message";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { EventStatus } from "@/enums/status";

interface ChatState {
  status: EventStatus;
  message: string;
  convHistory: Message[];
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

export const askGemini = createAsyncThunk(
  'chat/askGemini',
  async (query: SendMessagePayload) => {
    const apiKey = process.env.EXPO_PUBLIC_API_KEY;
    const response = await useGemini.post(`?key=${apiKey}`, query.message);
    return response.data;
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
          from: 'user',
          message: state.message
        });
      }
      console.log(state.convHistory);
      state.message = '';
    });

    builder.addCase(askGemini.fulfilled, (state, action) => {
      state.status = EventStatus.success;
      state.convHistory.push({
        from: 'bot',
        message: action.payload.candidates[0].content.parts[0].text,
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
