import { toggleLogIn, toggleLogOut, toggleProfile, toggleSignUp } from '../../slices/ui';
import { useAppDispatch } from '../../hooks';
import { useMySelector } from '../../hooks/useMySelector';
import { LogIn } from '../session/LogIn';
import { SignUp } from '../session/SignUp';
import { Profile } from '../session/Profile';
import { LogOut } from '../session/LogOut';

export function Menu() {
  const dispatch = useAppDispatch();

  const {
    userAccount,
    isLogIn,
    isLogOut,
    isSignUp,
    isProfile,
  } = useMySelector();

  const toggleLogInFunction = ()=> {
    dispatch(toggleLogIn());
  }
  
  const toggleSignUpFunction = ()=> {
    dispatch(toggleSignUp());
  }
  
  const toggleLogOutFunction = ()=> {
    dispatch(toggleLogOut());
  }

  const toggleProfileFunction = ()=> {
    dispatch(toggleProfile());
  }

  return (
    <div className='absolute z-20 flex items-center justify-center w-full h-full left-0 top-0 px-[20%] bg-black bg-opacity-50'>
      <div className='flex flex-col w-full max-w-[800px] h-1/2 p-4  rounded bg-white'>
        <div className='flex w-full border-b-2'>
          {!userAccount?.name && <button onClick={toggleSignUpFunction} className='w-full border p-2 hover:bg-slate-100 active:bg-white'>Sign Up</button>}
          {!userAccount?.name && <button onClick={toggleLogInFunction} className='w-full border p-2 hover:bg-slate-100 active:bg-white'>Log In</button>}
          {userAccount?.name && <button onClick={toggleLogOutFunction} className='w-full border p-2 hover:bg-slate-100 active:bg-white'>Log Out</button>}
          {userAccount?.name && <button onClick={toggleProfileFunction} className='w-full border p-2 hover:bg-slate-100 active:bg-white'>Profile</button>}
        </div>
        {isLogIn && <LogIn/>}
        {isLogOut && <LogOut/>}
        {isSignUp && <SignUp/>}
        {isProfile && <Profile/>}
      </div>
    </div>
  )
}