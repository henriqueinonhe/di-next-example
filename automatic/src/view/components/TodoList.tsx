import { Todo } from "../../domain/Todo";
import { TodoListItem } from "./TodoListItem";

export type TodoListProps = {
  isLoading: boolean;
  error: unknown;
  todos: Array<Todo> | undefined;
  updateTodo: (key: string, data: Omit<Todo, "key">) => void;
  deleteTodo: (key: string) => void;
};

export const TodoList = ({
  error,
  isLoading,
  todos,
  deleteTodo,
  updateTodo,
}: TodoListProps) => {
  if (isLoading) {
    return <strong>Loading...</strong>;
  }

  if (error) {
    return <strong>Error!</strong>;
  }

  return (
    <ul>
      {todos!.map((todo) => (
        <TodoListItem
          key={todo.key}
          todo={todo}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      ))}
    </ul>
  );
};
