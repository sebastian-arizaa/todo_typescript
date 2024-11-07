import { useAppDispatch } from '../../hooks';
import { fetchSetConfiguration, fetchUpdateConfiguration } from '../../slices/configuration';
import { fetchSetUser } from '../../slices/user';
import { toggleMenu } from '../../slices/ui';

export function LogOut() {
  const dispatch = useAppDispatch();
  
  const logOutFunction = async()=> {
    await dispatch(fetchUpdateConfiguration(null));
    await dispatch(fetchSetConfiguration());
    await dispatch(fetchSetUser(null));
    dispatch(toggleMenu());
  }

  return (
    <div className='flex flex-col items-center gap-4 p-4'>
      <h2 className='text-2xl'>Log Out</h2>
      <div className='flex flex-col gap-2 w-full px-[30%]'>
        <button onClick={()=> dispatch(toggleMenu())}  className='py-1 mt-2  rounded text-white font-bold bg-red-200 hover:bg-red-300 active:bg-red-200'>Cancel</button>
        <button onClick={logOutFunction} className='py-1 mt-2  rounded text-white font-bold bg-blue-200 hover:bg-blue-300 active:bg-blue-200'>Continue</button>
      </div>
    </div>
  )
}