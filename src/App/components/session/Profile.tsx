import { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { fetchSetUser, fetchUpdateUser } from '../../slices/user';
import { useMySelector } from '../../hooks/useMySelector';

function Profile() {
  const dispatch = useAppDispatch();
  const {configuration, userAccount} = useMySelector();
  
  const [nameValue, setNameValue] = useState<string>(userAccount?.name || "");
  const [emailValue, setEmailValue] = useState<string>(userAccount?.email || "");
  const [passwordValue, setPasswordValue] = useState<string>(userAccount?.password || "");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const updateProfileData = async () => {
    if(isUpdating) {
      const newUserData: User = {
      name: nameValue,
      email: emailValue,
      password: passwordValue,
      id: userAccount?.id
    };

    if(nameValue == "" || emailValue == "" || passwordValue == "") {
      setError(true);
    }else {
      await dispatch(fetchUpdateUser(newUserData));
      await dispatch(fetchSetUser(configuration?.idUser));
      setIsUpdating(false);
    };
    }else {
      setIsUpdating(true);
    }
  };

  return (
    <div className='flex flex-col items-center gap-4 p-4'>
      <h2 className='text-2xl'>Profile</h2>
      <div className='flex flex-col gap-2 w-full px-[30%]'>
        <p>Name</p>
        <input disabled={!isUpdating} value={nameValue} onChange={(e)=> setNameValue(e.target.value)} className={`px-2 py-1 border rounded ${error && emailValue == "" ? "border-red-200" : ""}`} type="text" />
        <p>Email</p>
        <input disabled={!isUpdating} value={emailValue} onChange={(e)=> setEmailValue(e.target.value)} className={`px-2 py-1 border rounded ${error && emailValue == "" ? "border-red-200" : ""}`} type="text" />
        <p>Password</p>
        <input  disabled={!isUpdating} value={passwordValue} onChange={(e)=> setPasswordValue(e.target.value)} className={`px-2 py-1 border rounded ${error && emailValue == "" ? "border-red-200" : ""}`} type="password"/>
        <button onClick={updateProfileData} className='py-1 mt-2  rounded text-white font-bold bg-blue-200 hover:bg-blue-300 active:bg-blue-200'>Update</button>
        {isUpdating && <button onClick={() => setIsUpdating(false)}  className='py-1 mt-2  rounded text-white font-bold bg-red-200 hover:bg-red-300 active:bg-red-200'>Cancel</button>}
      </div>
    </div>
  )
}

export {Profile};