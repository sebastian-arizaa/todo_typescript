import { useState } from 'react';
import { creatingTodo } from '../../slices/ui';
import { fetchAddTodo, fetchTodos } from '../../slices/todo';
import { useAppDispatch } from '../../hooks';
import { useMySelector } from '../../hooks/useMySelector';

export function NewTodo() {
  const dispatch = useAppDispatch();
  const {userAccount, currentSearch} = useMySelector();

  const [todoValue, setTodoValue] = useState<string>("");
  
  const newTodo = async () => {    
    const todo = {
      content: todoValue,
      isComplete: false,
      isUpdating: false,
      id: Date.now(),
      idUser: userAccount?.id || 1
    }

    await dispatch(fetchAddTodo(todo));
    await dispatch(fetchTodos({currentSearch, idUser: userAccount?.id}));

    dispatch(creatingTodo(false));
  }

  const closeNewTodo = () => {
    dispatch(creatingTodo(false));    
  }

  return (
    <div className='absolute top-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50'>
      <div className='flex flex-col items-center gap-2 w-96 h-48 p-4 rounded bg-white'>
        <p className='font-semibold'>New TODO</p>
        <textarea autoFocus onChange={(e)=> setTodoValue(e.target.value)} className='w-full h-24 p-2 border-2 rounded resize-none'/>
        <div className='flex justify-center gap-4 h-8 w-full '>
          <button onClick={closeNewTodo} className='w-1/4 h-full rounded bg-red-200 hover:bg-red-300'></button>
          <button onClick={newTodo} className='w-1/4 h-full rounded bg-green-200 hover:bg-green-300'></button>
        </div>
      </div>
    </div>
  )
}