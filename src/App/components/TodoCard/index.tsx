import { useState } from 'react';
import { useMySelector } from '../../hooks/useMySelector';
import { useAppDispatch } from '../../hooks';
import { 
  completeTodo, 
  deleteTodo, 
  fetchCompleteTodo, 
  fetchDeleteTodo, 
  fetchUpdateTodo, 
  searchTodo, 
  updateTodo, 
  updatingTodo 
} from '../../slices/todo';
import { CompleteBtn } from '../btns/CompleteBtn';
import { DeleteBtn } from '../btns/DeleteBtn';
import { EditBtn } from '../btns/EditBtn';

interface Props {
  content: string, 
  isComplete: boolean, 
  isUpdating: boolean, 
  id: number
}

export function TodoCard({content, isComplete, isUpdating, id}: Props) {
  const dispatch = useAppDispatch();
  const {currentSearch} = useMySelector();
  const [todoValue, setValueTodo] = useState("");
  
  const todo = {
    content,
    isComplete,
    isUpdating,
    id
  };

  const completeTodoFunction = async() => {
    dispatch(completeTodo({id}));
    dispatch(searchTodo({search: currentSearch}));

    dispatch(fetchCompleteTodo({...todo, isComplete: !isComplete}));
  }

  const updateTodoFunction = () => {
    if(isUpdating) {
      dispatch(updateTodo({id,newContent: todoValue}));
      dispatch(searchTodo({search: currentSearch}));

      dispatch(fetchUpdateTodo({...todo, isUpdating: !isUpdating, content: todoValue}));
    }else {
      dispatch(updatingTodo({id}));
      dispatch(searchTodo({search: currentSearch}));

      dispatch(fetchUpdateTodo({...todo, isUpdating: !isUpdating}));
    }
  }

  const deleteTodoFunction = () => {
    dispatch(deleteTodo({id}));
    dispatch(searchTodo({search: currentSearch}));

    dispatch(fetchDeleteTodo(id));
  }

  return (
    <div className={`relative flex items-center w-full px-4 py-4 border-2 rounded ${isComplete? 'opacity-50' : ''}`}>
      <textarea onChange={(e)=> setValueTodo(e.target.value)} disabled={!isUpdating} defaultValue={content} className='w-full ml-8 mr-14 p-2 text-lg resize-none'/>
      <CompleteBtn onClick={completeTodoFunction}/>
      <EditBtn onClick={updateTodoFunction}/>
      <DeleteBtn onClick={deleteTodoFunction}/>
    </div>
  )
}