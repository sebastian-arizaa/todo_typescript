import { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { fetchSignUp } from '../../slices/user';
import { toggleMenu } from '../../slices/ui';

export function SignUp() {
  const dispatch = useAppDispatch();
  const [nameValue, setNameValue] = useState<string>("");
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);


  const signUpFunction = () => {
    const user: User = {
      name: nameValue,
      email: emailValue,
      password: passwordValue,
    }
    
    if(nameValue == "" || emailValue == "" || passwordValue == "") {
      setError(true);
    }else {
      dispatch(fetchSignUp(user));
      dispatch(toggleMenu());
    }
  }

  return (
    <div className='flex flex-col items-center gap-4 p-4'>
      <h2 className='text-2xl'>Sign Up</h2>
      <div className='flex flex-col gap-2 w-full px-[30%]'>
        <p>Name</p>
        <input onChange={(e)=> setNameValue(e.target.value)} className={`px-2 py-1 border rounded ${error && emailValue == "" ? "border-red-200" : ""}`} type="text" />
        <p>Email</p>
        <input onChange={(e)=> setEmailValue(e.target.value)} className={`px-2 py-1 border rounded ${error && emailValue == "" ? "border-red-200" : ""}`} type="text" />
        <p>Password</p>
        <input onChange={(e)=> setPasswordValue(e.target.value)} className={`px-2 py-1 border rounded ${error && emailValue == "" ? "border-red-200" : ""}`} type="password"/>
        <button onClick={signUpFunction} className='py-1 mt-2  rounded text-white font-bold bg-blue-200 hover:bg-blue-300 active:bg-blue-200'>Continue</button>
      </div>
    </div>
  )
}