export function DeleteBtn({onClick}: BtnProps) {
  return (
    <button onClick={onClick} className='absolute  right-4 w-5 h-5 rounded bg-red-200 hover:bg-red-300'></button>
  )
}