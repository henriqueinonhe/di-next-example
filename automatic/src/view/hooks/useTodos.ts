import { useCallback, useEffect, useState } from "react";
import { Todo, TodoStatus as TodoStatus } from "../../domain/Todo";
import { TodosRepository } from "../../infrastructure/repositories/TodosRepository";
import { nanoid } from "nanoid";

type Dependencies = {
  todosRepository: TodosRepository;
};

export const makeUseTodos =
  ({ todosRepository }: Dependencies) =>
  () => {
    const [todos, setTodos] = useState<Array<Todo>>([]);
    const [getTodosIsLoading, setGetTodosIsLoading] = useState(false);
    const [getTodosError, setGetTodosError] = useState<unknown>();
    const [saveTodosIsLoading, setSaveTodosIsLoading] = useState(false);
    const [saveTodosError, setSaveTodosError] = useState<unknown>();

    const getTodos = useCallback(async () => {
      setGetTodosIsLoading(true);
      try {
        const fetchedTodos = await todosRepository.getTodos();
        setTodos(fetchedTodos);
      } catch (error) {
        setGetTodosError(error);
      } finally {
        setGetTodosIsLoading(false);
      }
    }, []);

    const saveTodos = useCallback(async (updatedTodos: Array<Todo>) => {
      try {
        setSaveTodosIsLoading(true);
        await todosRepository.saveTodos(updatedTodos);
      } catch (error) {
        setSaveTodosError(error);
      } finally {
        setSaveTodosIsLoading(false);
      }
    }, []);

    const addTodo = useCallback(
      async (todoContent: string) => {
        const todoInitialStatus: TodoStatus = "Pending";
        const newTodo: Todo = {
          key: nanoid(),
          content: todoContent,
          status: todoInitialStatus,
        };

        setTodos((todos) => {
          const updatedTodos = [...todos, newTodo];
          saveTodos(updatedTodos);
          return updatedTodos;
        });
      },
      [saveTodos]
    );

    const deleteTodo = useCallback(
      (key: string) => {
        setTodos((todos) => {
          const updatedTodos = [...todos].filter((todo) => todo.key !== key);
          saveTodos(updatedTodos);
          return updatedTodos;
        });
      },
      [saveTodos]
    );

    const updateTodo = useCallback(
      (key: string, data: Omit<Todo, "key">) => {
        setTodos((todos) => {
          const updatedTodos = [...todos];
          const todoToBeUpdatedIndex = updatedTodos.findIndex(
            (todo) => todo.key === key
          );
          const todoToBeUpdated = updatedTodos[todoToBeUpdatedIndex];
          const updatedTodo = {
            ...todoToBeUpdated,
            ...data,
          };

          updatedTodos.splice(todoToBeUpdatedIndex, 1, updatedTodo);

          saveTodos(updatedTodos);

          return updatedTodos;
        });
      },
      [saveTodos]
    );

    useEffect(() => {
      getTodos();
    }, [getTodos]);

    return {
      todos,
      getTodosIsLoading,
      getTodosError,
      saveTodosIsLoading,
      saveTodosError,
      addTodo,
      deleteTodo,
      updateTodo,
      refetch: getTodos,
    };
  };

export type UseTodos = ReturnType<typeof makeUseTodos>;
