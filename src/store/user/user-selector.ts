import { UserResponse } from "../../types/types";
import { RootState } from "../index";
import { UserState } from "./user-slice";



export const selectUserState = (state: RootState): UserState => state.user;
export const selectUserFromUserState = (state: RootState): UserResponse | undefined => selectUserState(state).user;
export const selectSuccessMessage = (state: RootState): string => selectUserState(state).successMessage;
