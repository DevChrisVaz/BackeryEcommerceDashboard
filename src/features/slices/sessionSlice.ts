import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store';

// Define a type for the slice state
interface SessionState {
  token: string;
}

// Define the initial state using that type
const initialState: SessionState = {
  token: ""
}

export const sessionSlice = createSlice({
  name: 'session',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    removeToken: state => {
      state.token = "";
    }
  }
})

export const { setToken, removeToken } = sessionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectToken = (state: RootState) => state.session.token;

export default sessionSlice.reducer;