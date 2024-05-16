import { apiMestre } from "../api/api-mestre"
import {  IToDoRequest } from "../interfaces/todo";

export const createToDo = async (toDo: IToDoRequest) => {
  toDo.createdAt = Math.floor(new Date().getTime() / 1000)
  apiMestre.post('/tarefas', toDo).
  then((response) => {
    return response.data;
  }).catch((error) => {
    throw error;
  })
}