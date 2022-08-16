import {RootState} from "../index";
import {ChatState} from "./chat-slice";
import {ChatMessage} from "../../types/types";

export const selectChatState = (state: RootState): ChatState => state.chat;
export const selectChatMessages = (state: RootState): ChatMessage[] => selectChatState(state).messages;
export const selectChatError = (state: RootState): string => selectChatState(state).error;
