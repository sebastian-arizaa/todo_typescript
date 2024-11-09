import { useEffect } from "react";
import { fetchSetConfiguration } from "./slices/configuration";
import { creatingTodo, toggleLogIn, toggleMenu } from "./slices/ui";
import { fetchSetUser } from "./slices/user";
import { fetchTodos, searchTodo, setTodos } from "./slices/todo";
import { useAppDispatch } from "./hooks";
import { useMySelector } from "./hooks/useMySelector";
import { Menu } from "./components/Menu";
import { MenuBtn } from "./components/btns/MenuBtn";
import { CreateBtn } from "./components/btns/CreateBtn";
import { Searcher } from "./components/Searcher";
import { NewTodo } from "./components/NewTodo";
import { TodoCard } from "./components/TodoCard";

function App() {
  const dispatch = useAppDispatch();
  const {
    configuration, 
    userAccount, 
    searchedTodo, 
    currentSearch, 
    isMenu, 
    isCreating, 
    isDataBaseUpdating,
    isServerError
  } = useMySelector();

  const openNewTodo = () => {
    if(userAccount?.id) {
      dispatch(creatingTodo(true));    
    }else {
      dispatch(toggleMenu());
      dispatch(toggleLogIn());
    }
  }

  const toggleMenuFunction = () => {
    dispatch(toggleMenu());
  }

  useEffect(()=> {
    const initializeApp = async () => {
      if(!configuration.id) {
        await dispatch(fetchSetConfiguration());
      }

      if(configuration.idUser && !userAccount?.id) {
        await dispatch(fetchSetUser(configuration.idUser));
      }
      
      if(userAccount?.id) {
        await dispatch(fetchTodos({currentSearch, idUser: userAccount.id}));
      }else {
        dispatch(setTodos({todos: []}));
        dispatch(searchTodo({search: currentSearch}));
      }
    }
    initializeApp();
  },[userAccount, configuration]);

  const reloadServer = () => {
    location.reload();
  }

  return (
    <div className={`relative flex flex-col items-center gap-8 w-full min-h-[100vh] px-[30%] py-4`}>
      <p className='absolute top-1 right-1'>{userAccount?.name}</p>
      <MenuBtn onClick={toggleMenuFunction}/>
      {isMenu && <Menu/>}
      <h1 className='text-4xl font-semibold'>TODOs</h1>
      <Searcher/>
      <div className='flex flex-col gap-4 w-full'>
        {searchedTodo.map((todo) => {
          return <TodoCard 
            key={todo.id}
            content={todo.content} 
            isComplete={todo.isComplete} 
            isUpdating={todo.isUpdating}
            id={todo.id}
          />
        }
        )}
      </div>
      <CreateBtn onClick={openNewTodo}/>
      {isCreating && <NewTodo/>}
      {isDataBaseUpdating && (    
        <div className='absolute top-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50'>
          <div className='flex flex-col items-center justify-center w-96 h-48 p-4 rounded bg-white'>
            <p className='font-semibold'>ACTUALIZANDO...</p>
          </div>
        </div>
      )}
      {isServerError && 
        <div className='absolute top-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50'>
          <div className='flex flex-col items-center justify-evenly w-96 h-48 p-4 rounded bg-white'>
            <p className='font-semibold'>Error Servidor</p>
            <button onClick={reloadServer} className="p-1 border rounded bg-slate-400 hover:bg-slate-300 active:bg-slate-400">Volver a cargar</button>
          </div>
        </div>
      }
    </div>
  );
}

export default App;