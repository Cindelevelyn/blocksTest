import { apiMestre } from "../api/api-mestre"
import { IToDo } from "../interfaces/todo";

export const loadToDoById = async (id: number) => {
  apiMestre.get<IToDo>(`/tarefas/${id}`).
  then((response) => {
    return response.data;
  }).catch((error) => {
    throw error;
  })
}