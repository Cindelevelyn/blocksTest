import { apiMestre } from "../api/api-mestre"
import { IToDo } from "../interfaces/todo";

export const updateToDo = async (toDo: IToDo) => {
  apiMestre.put<IToDo>(`/tarefas/${toDo.id}`, toDo).
  then((response) => {
    return response.data;
  }).catch((error) => {
    throw error;
  })
}