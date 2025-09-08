import type { Todo } from '@pta/utils';

let todos: Todo[] = [];
let nextId = 1;

export const addTodo = (text: string): Todo => {
  const newTodo: Todo = {
    id: nextId++,
    text,
    done: false,
  };
  todos.push(newTodo);
  return newTodo;
};

export const listTodos = (): Todo[] => {
  return todos;
};
