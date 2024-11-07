export function CompleteBtn({onClick} : BtnProps) {
  return (
    <button onClick={onClick} className='absolute w-5 h-5 rounded bg-green-200 hover:bg-green-300'></button>
  )
}