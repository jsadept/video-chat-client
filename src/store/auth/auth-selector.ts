import {RootState} from "../index";
import {AuthState} from "./auth-slice";
import {LoadingStatus} from "../../types/types";


export const selectAuthState = (state: RootState): AuthState => state.auth;
export const selectAuthLoadingState = (state: RootState): LoadingStatus | undefined => selectAuthState(state).loadingState;
export const selectAuthIsRegistered = (state: RootState): boolean => selectAuthState(state).isRegistered;
export const selectAuthIsLogin = (state: RootState): boolean => selectAuthState(state).isLogin;
export const selectAuthSuccessMessage = (state: RootState): string  => selectAuthState(state).success;
export const selectAuthErrorMessage = (state: RootState): string => selectAuthState(state).error;

