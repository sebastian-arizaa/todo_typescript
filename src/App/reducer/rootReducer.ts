import { combineReducers } from "redux";
import todoReducer, { TypeTodoReducer } from "../slices/todo";
import uiReducer, { TypeUiReducer } from "../slices/ui";
import configurationReducer, { TypeConfigurationReducer } from "../slices/configuration";
import userReducer ,{ TypeUserReducer } from "../slices/user";

interface reducers {
  configuration: TypeConfigurationReducer,
  users: TypeUserReducer;
  todos: TypeTodoReducer,
  ui: TypeUiReducer
}

export const rootReducer = combineReducers<reducers>({
  configuration: configurationReducer,
  users: userReducer, 
  ui: uiReducer,
  todos: todoReducer,
})

export type RootReducer = ReturnType<typeof rootReducer>;