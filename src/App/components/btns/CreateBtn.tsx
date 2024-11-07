export function CreateBtn({onClick}: BtnProps) {
  return (
    <button onClick={onClick} className='w-10 h-10 rounded text-3xl text-white font-bold bg-blue-200 hover:bg-blue-300'>+</button>
  )
}