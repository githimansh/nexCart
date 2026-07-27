import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";

interface Message {
  role: "user" | "assistant";
  message: string;
}

interface AiChatBotState {
  response: string | null;
  loading: boolean;
  error: string | null;
  messages: Message[];
}

const initialState: AiChatBotState = {
  response: null,
  loading: false,
  error: null,
  messages: [],
};

export const chatBot = createAsyncThunk<
  any,
  {
    prompt: {
      prompt: string;
    };
    productId: number | null | undefined;
  }
>(
  "aiChatBot/chatBot",

  async ({ prompt, productId }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/ai/chat",
        prompt,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          params: {
            productId,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.log(error);

      return rejectWithValue(
        error?.response?.data?.message ||
          "Unable to connect AI service."
      );
    }
  }
);

const aiChatBotSlice = createSlice({
  name: "aiChatBot",

  initialState,

  reducers: {

    clearChat(state) {
      state.messages = [];
      state.response = null;
      state.error = null;
    },

  },

  extraReducers: (builder) => {

    builder

      .addCase(chatBot.pending, (state, action) => {

        state.loading = true;

        state.error = null;

        const userMessage: Message = {
          role: "user",
          message: action.meta.arg.prompt.prompt,
        };

        state.messages.push(userMessage);

      })

      .addCase(chatBot.fulfilled, (state, action) => {

        state.loading = false;

        state.response = action.payload.message;

        const aiMessage: Message = {
          role: "assistant",
          message: action.payload.message,
        };

        state.messages.push(aiMessage);

      })

      .addCase(chatBot.rejected, (state, action) => {

        state.loading = false;

        state.error = action.payload as string;

        const aiMessage: Message = {
          role: "assistant",
          message:
            action.payload?.toString() ||
            "Something went wrong. Please try again.",
        };

        state.messages.push(aiMessage);

      });

  },

});

export const { clearChat } = aiChatBotSlice.actions;

export default aiChatBotSlice.reducer;