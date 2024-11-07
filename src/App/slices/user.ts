import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dataBaseUpdating, toggleMenu } from "./ui";
import axios from "axios";
import { fetchSetConfiguration, fetchUpdateConfiguration } from "./configuration";

interface InitialState {
  userAccount: {
    id: number,
    name: string,
    email: string,
    password: string,
  } | undefined
}

const initialState: InitialState = {
  userAccount: undefined
}

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userAccount = action.payload.user;
    },
  }
});

export const fetchSetUser = createAsyncThunk<void, number | null>(
  'data/fetchSetUser',
  async(id, {dispatch}) => {
    dispatch(dataBaseUpdating(true));
    try {
      const response = await axios.get("http://localhost:3001/users/id/"+ id);
      if(response.data[0]) {
        dispatch(setUser({user: response.data[0]}));
      }else {
        dispatch(setUser({user: {}}));
      }
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      dispatch(dataBaseUpdating(false));
    }
  }
);

export const fetchUpdateUser = createAsyncThunk<void, User>(
  'data/fetchUpdateUser',
  async(newUserData, {dispatch}) => {
    dispatch(dataBaseUpdating(true));
    try {
      await axios.put("http://localhost:3001/users", newUserData);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      dispatch(dataBaseUpdating(false));
    }
  }
);

export const fetchLogIn = createAsyncThunk<void, {email: string, password: string}>(
  'data/fetchLogIn',
  async({email, password}, {dispatch}) => {
    dispatch(dataBaseUpdating(true));
    try {
      const response = await axios.get(`http://localhost:3001/users/email/${email}/password/${password}`);
      if(response.data[0]) {
        dispatch(setUser({user: response.data[0]}));
        dispatch(toggleMenu());
        await dispatch(fetchUpdateConfiguration(response.data[0].id));
        await dispatch(fetchSetConfiguration());
      }else {
      }
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      dispatch(dataBaseUpdating(false));
    }
  }
);

export const fetchSignUp = createAsyncThunk<void, User>(
  'data/fetchSignUp',
  async(user, {dispatch}) => {
    dispatch(dataBaseUpdating(true));
    try {
      await axios.post("http://localhost:3001/users", user);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      dispatch(dataBaseUpdating(false));
    }
  }
);

export const {setUser} = userSlice.actions;
export default userSlice.reducer;
export type TypeUserReducer = typeof userSlice.reducer;