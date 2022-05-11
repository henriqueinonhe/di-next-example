import { ValuesType } from "utility-types";

export type Todo = {
  key: string;
  content: string;
  status: TodoStatus;
};

export const TodoStatuses = {
  Pending: "Pending" as const,
  Completed: "Completed" as const,
};

export type TodoStatus = ValuesType<typeof TodoStatuses>;
