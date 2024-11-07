import { useSelector } from "react-redux";
import { RootReducer } from "../reducer/rootReducer";

export const useMySelector = () => {
  // Configuration's state
  const configuration = useSelector((state: RootReducer) => state.configuration.configuration);

  // Users's State
  const userAccount = useSelector((state: RootReducer) => state.users.userAccount);

  // Todos's State
  const todos = useSelector((state: RootReducer) => state.todos.todos);
  const searchedTodo = useSelector((state: RootReducer) => state.todos.searchedTodo);
  const currentSearch = useSelector((state: RootReducer) => state.todos.currentSearch);

  // UI's State
  const isMenu = useSelector((state: RootReducer) => state.ui.isMenu);
  const isCreating = useSelector((state: RootReducer) => state.ui.isCreating);
  const isDataBaseUpdating = useSelector((state: RootReducer) => state.ui.isDataBaseUpdating);
  const isLogIn = useSelector((state: RootReducer) => state.ui.isLogIn);
  const isLogOut = useSelector((state: RootReducer) => state.ui.isLogOut);
  const isSignUp = useSelector((state: RootReducer) => state.ui.isSignUp);
  const isProfile = useSelector((state: RootReducer) => state.ui.isProfile);  

  return {
    configuration,
    userAccount,
    todos,
    searchedTodo,
    currentSearch,
    isMenu,
    isCreating,
    isDataBaseUpdating,
    isLogIn,
    isLogOut,
    isSignUp,
    isProfile,
  }
}