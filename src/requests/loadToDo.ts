import { apiMestre } from "../api/api-mestre";
import { IToDo } from "../interfaces/todo";

export const loadToDo = async (): Promise<IToDo[]> => {
  return apiMestre
    .get<IToDo[]>("/tarefas")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
