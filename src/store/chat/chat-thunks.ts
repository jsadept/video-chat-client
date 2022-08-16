import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../index";
import { addMessage } from "./chat-slice";
import {ChatMessage} from "../../types/types";


export const initChat = createAsyncThunk<
    void,
    void,
    {state: RootState,  rejectValue: string }
    >('chat/initChat', async (_, thunkAPI) => {
        try {

            const socket = thunkAPI.getState().socket.socket;
            socket.on('getChatMessage', ({user, message, time}) => {
                thunkAPI.dispatch(addMessage({user, message, time}))

            });
        } catch (err) {
            const error = err as Error;
            return thunkAPI.rejectWithValue(error.message)
        }
});



export const sendChatMessage = createAsyncThunk<
    ChatMessage,
    string,
    {state: RootState,  rejectValue: string }
    >('chat/sendChatMessage', async (message, thunkAPI) => {
    try {
        const socket = thunkAPI.getState().socket.socket;
        const userName = thunkAPI.getState().user.user?.nickname;

        const messageTime = new Date().getTime();

        socket.emit("sendChatMessage", { user: userName!, message, time: messageTime});


        return {user: userName!, message: message, time: messageTime};

    } catch (err) {
        const error = err as Error;
        return thunkAPI.rejectWithValue(error.message)
    }
});