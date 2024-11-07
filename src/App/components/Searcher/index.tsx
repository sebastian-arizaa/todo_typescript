import React from 'react';
import { useDispatch } from 'react-redux';
import { searchTodo, updateSearch } from '../../slices/todo';

export function Searcher() {
  const dispatch = useDispatch();

  const searchTodoFunction: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(searchTodo({search: e.target.value}));
    dispatch(updateSearch(e.target.value));
  }

  return (
    <div className='w-full px-[10%]'>
      <input onChange={searchTodoFunction} type="text" placeholder='Search TODOs...' className='w-full px-4 py-2 rounded border-2' />
    </div>
  )
}