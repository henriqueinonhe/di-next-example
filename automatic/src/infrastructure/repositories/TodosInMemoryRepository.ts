import { Todo } from "../../domain/Todo";
import { TodosRepository } from "./TodosRepository";

let todos: Array<Todo> = [];

export const todosInMemoryRepository: TodosRepository = {
  getTodos: () => {
    return Promise.resolve(todos);
  },

  saveTodos: (todosToSave: Array<Todo>) => {
    todos = todosToSave.map((todo) => ({
      ...todo,
    }));

    return Promise.resolve(undefined);
  },
};
