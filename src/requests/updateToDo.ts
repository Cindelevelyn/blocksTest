import { apiMestre } from "../api/api-mestre";
import { IToDo, IToDoRequest } from "../interfaces/todo";

export const updateToDo = async (id: number, toDo: IToDoRequest) => {
  apiMestre
    .put<IToDo>(`/tarefas/${id}`, toDo)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
