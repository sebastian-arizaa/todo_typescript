import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isCreating: boolean,
  isDataBaseUpdating: boolean,
  isMenu: boolean,
  isLogIn: boolean,
  isLogOut: boolean,
  isSignUp: boolean,
  isProfile: boolean,
  isServerError: boolean,
}

const initialState: InitialState  = {
  isCreating: false,
  isDataBaseUpdating: false,
  isMenu: false,
  isLogIn: false,
  isLogOut: false,
  isSignUp: false,
  isProfile: false,
  isServerError: false,
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenu = !state.isMenu;
      state.isLogIn = false;
      state.isLogOut = false;
      state.isSignUp = false;
      state.isProfile = false;
    },
    toggleLogIn: (state) => {
      state.isLogIn = !state.isLogIn;
      state.isSignUp = false;
    },
    toggleLogOut: (state) => {
      state.isLogOut = !state.isLogOut;
      state.isProfile = false;
    },
    toggleSignUp: (state) => {
      state.isSignUp = !state.isSignUp;
      state.isLogIn = false;
    },
    toggleProfile: (state) => {
      state.isProfile = !state.isProfile;
      state.isLogOut = false;
    },
    creatingTodo: (state, action) => {
      state.isCreating = action.payload;
    },
    dataBaseUpdating: (state, action) => {
      state.isDataBaseUpdating = action.payload;
    },
    setServerError: (state, action) => {
      state.isServerError = action.payload;
    }
  }
});

export const {
  toggleMenu,
  toggleLogIn,
  toggleLogOut,
  toggleSignUp,
  toggleProfile,
  creatingTodo,
  dataBaseUpdating,
  setServerError,
} = uiSlice.actions;

export default uiSlice.reducer;
export type TypeUiReducer = typeof uiSlice.reducer;