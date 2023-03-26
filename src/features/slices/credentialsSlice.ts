import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store';

// Define a type for the slice state
interface CredentialsState {
  userName: string;
  password: string;
}

// Define the initial state using that type
const initialState: CredentialsState = {
  userName: "",
  password: ""
}

export const credentialsSlice = createSlice({
  name: 'credentials',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setCredentials: (state, action: PayloadAction<CredentialsState>) => {
        state.userName = action.payload.userName;
        state.password = action.payload.password;
    },
    removeCredentials: state => {
      state.userName = "";
      state.password = "";
    }
  }
})

export const { setCredentials, removeCredentials } = credentialsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCredentials = (state: RootState) => state.credentials;

export default credentialsSlice.reducer;