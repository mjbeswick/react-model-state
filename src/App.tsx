

import { FC, Fragment } from 'react';
import './App.css';
import TodoList from './TodoList';

export const App: FC<{ name: string }> = () => {
  return (
    <Fragment>
      <h1>To Do List</h1>
      <TodoList />
    </Fragment>
  );
};
