import { Todo } from "../../domain/Todo";

export interface TodosRepository {
  getTodos: () => Promise<Array<Todo>>;
  saveTodos: (todos: Array<Todo>) => Promise<void>;
}
