import { apiMestre } from "../api/api-mestre";
import { IToDo } from "../interfaces/todo";

export const updateStatusToDo = async (id: number, done: boolean) => {
  apiMestre
    .patch<IToDo>(`/tarefas/${id}`, { done })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
