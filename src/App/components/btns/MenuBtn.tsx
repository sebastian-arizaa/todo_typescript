import { useMySelector } from '../../hooks/useMySelector';

export function MenuBtn({onClick}: BtnProps) {
  const {isMenu} = useMySelector();

  return (
    <button onClick={onClick} className='absolute z-30 left-1 top-1 w-12 h-12 hover:scale-105 active:scale-90'>
      <svg width="50" height="40"  >
        <line x1="10" y1="10" x2="40" y2="10" stroke={isMenu? "white" : "black"} strokeWidth="2"/>
        <line x1="10" y1="20" x2="40" y2="20" stroke={isMenu? "white" : "black"} strokeWidth="2"/>
        <line x1="10" y1="30" x2="40" y2="30" stroke={isMenu? "white" : "black"} strokeWidth="2"/>
      </svg>
    </button>
  )
}