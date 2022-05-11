import { TodosRepository } from "./TodosRepository";
import { AxiosInstance } from "axios";
import { Todo } from "../../domain/Todo";
import { nanoid } from "nanoid";

type Dependencies = {
  axiosClient: AxiosInstance;
};

type RestTodo = {
  id: string;
  content: string;
  status: RestTodoStatus;
};

type RestTodoStatus = "Pending" | "Completed";

export const makeTodosRestRepository = ({
  axiosClient,
}: Dependencies): TodosRepository => ({
  getTodos: async () => {
    const response = await axiosClient.request<Array<RestTodo>>({
      url: "/todos",
      method: "GET",
    });

    const restTodos = response.data;
    const todos = restTodos.map((todo) => ({
      key: nanoid(),
      ...todo,
    }));

    return todos;
  },

  saveTodos: async (todos: Array<Todo>) => {
    await axiosClient.request<Array<RestTodo>>({
      url: "/todos",
      method: "PATCH",
      data: todos,
    });
  },
});
