import axios from "axios";

export const apiMestre = axios.create({
  baseURL: 'http://localhost:3000'
})