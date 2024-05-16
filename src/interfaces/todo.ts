export interface IToDo{
  id: number,
  nome: string,
  done: boolean,
  createdAt: number
}

export interface IToDoRequest {
  nome: string,
  done: boolean,
  createdAt: number
}