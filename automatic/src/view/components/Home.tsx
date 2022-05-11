import { useContainer } from "../hooks/useContainer";
import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: auto;
`;

const Title = styled.h1`
  text-align: center;
`;

export const Home = (): JSX.Element => {
  const { useTodos } = useContainer();

  const {
    todos,
    getTodosIsLoading,
    getTodosError,
    saveTodosIsLoading,
    addTodo,
    deleteTodo,
    updateTodo,
  } = useTodos();

  return (
    <Container>
      <Title>Todos</Title>

      <TodoInput onAdd={addTodo} isLoading={saveTodosIsLoading} />

      <TodoList
        isLoading={getTodosIsLoading}
        error={getTodosError}
        todos={todos}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    </Container>
  );
};
