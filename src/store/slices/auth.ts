import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
  provider?: string;
  active?: boolean;
  verified?: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

interface UserAuthState {
  user?: IUser | null;
}

const initialState: UserAuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    // ? Logout the user by returning the initial state
    logout: () => initialState,
    // Save the user's info
    userInfo: (state, action: PayloadAction<UserAuthState>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.user = action.payload.user;
    },
  },
});

export const { logout, userInfo } = authSlice.actions;
// ? Export the authSlice.reducer to be included in the store.
export default authSlice.reducer;

