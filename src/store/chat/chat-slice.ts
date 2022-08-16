import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ChatMessage} from "../../types/types";
import { initChat, sendChatMessage } from "./chat-thunks";



export interface ChatState {
    messages: ChatMessage[];
    error: string;
}

export const initialState: ChatState = {
    messages: [],
    error: ''
}



const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<ChatMessage>) => {
            const isAlreadyAtArray = state.messages.some((current) => {
                if(current.time === action.payload.time) return true;
                return false;
            })
            if(!isAlreadyAtArray) state.messages.push(action.payload);
        }
    },
    extraReducers: (builder) => {

        builder.addCase(initChat.fulfilled, (state, action) => {
            state.messages = [];
            state.error = '';
        });
        builder.addCase(initChat.pending, (state, action) => {
            state.error = '';
        });
        builder.addCase(initChat.rejected, (state, action) => {
            state.error = action.payload!;
        });

        builder.addCase(sendChatMessage.fulfilled, (state, action: PayloadAction<ChatMessage>) => {
            state.messages.push(action.payload)
            state.error = '';
        });
        builder.addCase(sendChatMessage.pending, (state, action) => {
            state.error = '';
        });
        builder.addCase(sendChatMessage.rejected, (state, action) => {
            state.error = action.payload!;
        });
    }
});



export const {
    addMessage,
} = chatSlice.actions;


export default chatSlice.reducer;
