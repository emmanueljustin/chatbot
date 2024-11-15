import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  message: string;
  convHistory: string[];
}

interface SendMessagePayload {
  message: string;
}

const initialState: ChatState = {
  message: '',
  convHistory: [],
}

const chatSlice = createSlice({
  name: 'chat',
  initialState: initialState,
  reducers: {
    writeMessage: (state, actions: PayloadAction<SendMessagePayload>) => {
      state.message = actions.payload.message;
    },
    sendMessage: (state) => {
      if (state.message !== '') {
        state.convHistory.push(state.message);
      }
      console.log(state.convHistory);
      state.message = '';
    }
  },
});

export const { writeMessage, sendMessage } = chatSlice.actions;
export default chatSlice.reducer;
