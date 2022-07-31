import {IUser} from "../../types/IUser";
import {createSlice} from "@reduxjs/toolkit";


interface UserState {
    user: IUser;
    isLoading: boolean;
    error: string;
}

// default state
const initialState: UserState = {
    user: {} as IUser,
    isLoading: false,
    error: ''
}

//slice(reducer)
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{

    }
});

export default userSlice.reducer;