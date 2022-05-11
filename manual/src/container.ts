import Axios from "axios";
import { todosInMemoryRepository } from "./infrastructure/repositories/TodosInMemoryRepository";
import { makeTodosRestRepository } from "./infrastructure/repositories/TodosRestRepository";
import { makeUseTodos } from "./view/hooks/useTodos";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const axiosClient = Axios.create({
  baseURL: apiBaseUrl,
});
const todosRestRepository = makeTodosRestRepository({
  axiosClient,
});
const useTodos = makeUseTodos({
  todosRepository: todosRestRepository,
});

export const container = {
  useTodos,
};

export type Container = typeof container;
