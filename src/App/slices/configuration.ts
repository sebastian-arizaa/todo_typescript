import { createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import { dataBaseUpdating, setServerError } from "./ui";


interface InitialState {
  configuration: {
    id: number | null,
    idUser: number | null
  },
}

const initialState: InitialState = {
  configuration: {
    id: null,
    idUser: null
  },
}

const configurationSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    setConfiguration: (state, action: PayloadAction<MyConfigurationData>) => {
      state.configuration = action.payload;
    }
  }
});

type MyConfigurationData = {
  id: number,
  idUser: number,
}

export const fetchSetConfiguration = createAsyncThunk<void>(
  'configuration/fetchSetConfiguration',
  async (_, {dispatch}) => { 
    dispatch(dataBaseUpdating(true));
    try {
      const response = await axios.get("http://localhost:3001/configuration");
      console.log({response})
      dispatch(setConfiguration(response.data[0] as MyConfigurationData));
      dispatch(setServerError(false));
    } catch (error: any) {
      console.log("Error: ", error);
      dispatch(setServerError(true));
    } finally {
      dispatch(dataBaseUpdating(false));
    }
  }
);

export const fetchUpdateConfiguration = createAsyncThunk<void, number | null>(
  'configuration/fetchUpdateConfiguration',
  async (idUser, {dispatch}) => {
    dispatch(dataBaseUpdating(true));
    try {
      await axios.put("http://localhost:3001/configuration", {idUser});
      dispatch(setServerError(false));
    } catch (error: any) {
      console.log("Error: ", error);
      dispatch(setServerError(true));
    } finally {
      dispatch(dataBaseUpdating(false));
    }
  }
)

export const {setConfiguration} = configurationSlice.actions;
export default configurationSlice.reducer;
export type TypeConfigurationReducer = typeof configurationSlice.reducer;