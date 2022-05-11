import { Home } from "./Home";
import { render, screen } from "@testing-library/react";
import { UseTodos } from "../hooks/useTodos";
import { Todo, TodoStatuses } from "../../domain/Todo";
import { ContainerProvider } from "../hooks/useContainer";
import { asValue } from "awilix";
import { createContainerMock } from "../../testUtils/containerMock";

describe("Home", () => {
  describe("When rendering todos", () => {
    it("Renders todos correctly", async () => {
      const todos: Array<Todo> = [
        {
          key: "1",
          content: "Some Todo",
          status: TodoStatuses.Completed,
        },
        {
          key: "2",
          content: "Other Todo",
          status: TodoStatuses.Pending,
        },
      ];

      const useTodos = (() => ({
        todos,
        getTodosIsLoading: false,
        getTodosError: undefined,
        saveTodosIsLoading: false,
        saveTodosError: undefined,
        addTodo: jest.fn(),
        deleteTodo: jest.fn(),
        updateTodo: jest.fn(),
        refetch: jest.fn(),
      })) as unknown as UseTodos;

      const mockedDependencies = {
        useTodos: asValue(useTodos),
      };

      const mockedContainer = createContainerMock(mockedDependencies);

      render(
        <ContainerProvider container={mockedContainer}>
          <Home />
        </ContainerProvider>
      );

      expect(screen.getByText("Some Todo")).toBeInTheDocument();
      expect(screen.getByText("Other Todo")).toBeInTheDocument();
    });
  });
});
