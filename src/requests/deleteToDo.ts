import { apiMestre } from "../api/api-mestre"

export const deleteToDo = async (id: number) => {
  apiMestre.delete(`/tarefas/${id}`).
  then((response) => {
    return response.data;
  }).catch((error) => {
    throw error;
  })
}