import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin: auto;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
`;

const Input = styled.input``;

const AddButton = styled.button`
  margin-left: 20px;
`;

export type TodoInputProps = {
  onAdd: (todoContent: string) => void;
  isLoading: boolean;
};

export const TodoInput = ({
  onAdd,
  isLoading,
}: TodoInputProps): JSX.Element => {
  const [content, setContent] = useState("");

  const addTodo = () => {
    onAdd(content);
    setContent("");
  };

  return (
    <Container>
      <Row>
        <Input
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <AddButton onClick={addTodo}>Add</AddButton>
      </Row>

      {isLoading && <strong>Saving...</strong>}
    </Container>
  );
};
