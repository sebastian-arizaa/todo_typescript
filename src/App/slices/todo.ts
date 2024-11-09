import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { dataBaseUpdating, setServerError } from "./ui";
import axios from "axios";

interface InitialState {
  todos: Array<Todo>,
  searchedTodo: Array<Todo>,
  currentSearch: string,
}

const initialState: InitialState = {
  todos: [],
  searchedTodo: [],
  currentSearch: ""
}

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload.todos;
    },
    addTodo: (state, action)=> {      
      const newTodos = state.todos;
      newTodos.push(action.payload);
      state.todos = newTodos;
    },
    completeTodo: (state, action) => {
      const newTodos = [...state.todos];
      const todoIndex = state.todos.findIndex(todo => todo.id === action.payload.id);
      newTodos[todoIndex].isComplete = !newTodos[todoIndex].isComplete;
      
      state.todos = newTodos;
    },
    deleteTodo: (state, action)=>{
      const todoIndex = state.todos.findIndex(todo => todo.id === action.payload.id);
      state.todos.splice(todoIndex, 1);
    },
    updatingTodo: (state, action)=>{
      const todoIndex = state.todos.findIndex(todo => todo.id === action.payload.id);
      state.todos[todoIndex].isUpdating = !state.todos[todoIndex].isUpdating;
    },
    updateTodo: (state, action)=>{
      const todoIndex = state.todos.findIndex(todo => todo.id === action.payload.id);
      state.todos[todoIndex].isUpdating = false;
      state.todos[todoIndex].content = action.payload.newContent;
    },
    searchTodo: (state, action)=>{
      const searchedTodo = state.todos.filter(todo => 
        todo.content.trim().toLowerCase().includes(action.payload.search.trim().toLowerCase())
      );
      state.searchedTodo = searchedTodo;
    },
    updateSearch: (state, action)=>{
      state.currentSearch = action.payload;
    },
  }
});

export const fetchTodos = createAsyncThunk<void, {currentSearch: string, idUser: number | undefined}>(
  'data/fetchTodos',
  async ({currentSearch, idUser}, {dispatch}) => {    
    dispatch(dataBaseUpdating(true));
    try {   
      const response = await axios.get('http://localhost:3001/todos/' + idUser);
      
      dispatch(setTodos({todos: response.data}));
      dispatch(searchTodo({search: currentSearch}));
      dispatch(setServerError(false));
    } catch (error) {
      console.log("Error: " + error)
      dispatch(setServerError(true));
    } finally {
      dispatch(dataBaseUpdating(false));
    }
  }
);

export const fetchAddTodo = createAsyncThunk<void, Todo>(
  'data/fetchAddTodo',
  async (todo, {dispatch}) => {    
    dispatch(dataBaseUpdating(true));
    try {   
      await axios.post('http://localhost:3001/todos', todo);
      dispatch(setServerError(false));
    } catch (error) {
      console.log("Error: " + error);
      dispatch(setServerError(true));
    } finally {
      dispatch(dataBaseUpdating(false));
    }
  }
);

export const fetchCompleteTodo = createAsyncThunk<void, Todo>(
  'data/fetchCompleteTodo',
  async (todo, {dispatch}) => {
    dispatch(dataBaseUpdating(true));
    try {
      await axios.put('http://localhost:3001/todos', todo);
      dispatch(setServerError(false));
    } catch (error) {
      console.log("Error: " + error);
      dispatch(setServerError(true));
    } finally {
      dispatch(dataBaseUpdating(false));
    }
  }
); 

export const fetchUpdateTodo = createAsyncThunk<void, Todo>(
  'data/fetchUpdateTodo',
  async (todo, {dispatch}) => {
    dispatch(dataBaseUpdating(true));
    try {
      await axios.put('http://localhost:3001/todos', todo);
      dispatch(setServerError(false));
    } catch (error) {
      console.log("Error: " + error);
      dispatch(setServerError(true));
    } finally {
      dispatch(dataBaseUpdating(false));
    }
  }
);

export const fetchDeleteTodo = createAsyncThunk<void, number>(
  'data/fetchUpdateTodo',
  async (id, {dispatch}) => {
    dispatch(dataBaseUpdating(true));
    try {
      await axios.delete('http://localhost:3001/todos/' + id); 
      dispatch(setServerError(false));
    } catch (error) {
      console.log("Error: " + error);
      dispatch(setServerError(true));
    } finally {
      dispatch(dataBaseUpdating(false));
    }
  }
);

export const {
  setTodos,
  addTodo,
  completeTodo,
  deleteTodo,
  updatingTodo,
  updateTodo,
  searchTodo,
  updateSearch,
} = todoSlice.actions;

export default todoSlice.reducer;
export type TypeTodoReducer = typeof todoSlice.reducer;