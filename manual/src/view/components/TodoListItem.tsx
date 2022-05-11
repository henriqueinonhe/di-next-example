import styled from "styled-components";
import { Todo, TodoStatuses } from "../../domain/Todo";

const Container = styled.li`
  margin-top: 20px;
`;

const Button = styled.button`
  margin-left: 20px;
`;

const Field = styled.span`
  display: inline-block;
  margin-left: 20px;
`;

const Content = styled(Field)`
  width: 200px;
`;

const Status = styled(Field)`
  width: 70px;
`;

export type TodoListItemProps = {
  todo: Todo;
  updateTodo: (key: string, data: Omit<Todo, "key">) => void;
  deleteTodo: (key: string) => void;
};

export const TodoListItem = ({
  todo,
  updateTodo,
  deleteTodo,
}: TodoListItemProps) => {
  const toggleTodoStatus = () => {
    const newStatus =
      todo.status === TodoStatuses.Completed
        ? TodoStatuses.Pending
        : TodoStatuses.Completed;

    updateTodo(todo.key, {
      ...todo,
      status: newStatus,
    });
  };

  return (
    <Container>
      <Button onClick={toggleTodoStatus}>Toggle</Button>
      <Content>{todo.content}</Content>
      <Status>{todo.status}</Status>
      <Button onClick={() => deleteTodo(todo.key)}>Delete</Button>
    </Container>
  );
};
