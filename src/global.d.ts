interface Todo {
  id: number,
  content: string,
  isComplete: boolean,
  isUpdating: boolean,
}

interface BtnProps {
  onClick: ()=> void
}

interface User {
  id?: number,
  name: string,
  email: string,
  password: string
}