import { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { fetchLogIn } from '../../slices/user';
import { useMySelector } from '../../hooks/useMySelector';

export function LogIn() {
  const dispatch = useAppDispatch();
  const {userAccount} = useMySelector();

  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [isClickedToContinue, setIsClickedToContinue ] = useState<boolean>(false);


  const logInFunction = () => {
    const user = {
      email: emailValue,
      password: passwordValue,
    };

    if(emailValue == "" || passwordValue == "") {
      setError(true);
    }else {
      dispatch(fetchLogIn(user));
    }
    setIsClickedToContinue(true);
  }

  const isThereAccount = () => {
    if(!userAccount && isClickedToContinue) {
      return <p className='text-red-400'>That account doesn't exit</p>
    }
  }

  return (
    <div className='flex flex-col items-center gap-4 p-4'>
      <h2 className='text-2xl'>Log In</h2>
      <div className='flex flex-col gap-2 w-full px-[30%]'>
        <p>Email</p>
        <input onChange={(e)=> setEmailValue(e.target.value)} className={`px-2 py-1 border rounded ${error && emailValue == "" ? "border-red-200" : ""}`} type="text" />
        <p>Password</p  >
        <input onChange={(e)=> setPasswordValue(e.target.value)} className={`px-2 py-1 border rounded  ${error && passwordValue == "" ? "border-red-200" : ""}`} type="password"/>
        {isThereAccount()}
        <button onClick={logInFunction} className='py-1 mt-2  rounded text-white font-bold bg-blue-200 hover:bg-blue-300 active:bg-blue-200'>Continue</button>
      </div>
    </div>
  )
}