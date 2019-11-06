/* import { createSelector } from 'reselect';

const todoSelector = state => state.todo.todo;

export const todosWithMilk = createSelector([todoSelector], todos => {
  return todos.filter(todo => todo.title.toLowerCase().includes('milk'));
});

export const todosWithMilkAndBread = createSelector([todosWithMilk], todos => {
  return todos.filter(todo => todo.title.toLowerCase().includes('bread'));
}); */

/* import React from 'react';
import { createSelector } from 'reselect';


const getVisibilityFilter = (state, props) =>
  state.todoLists[props.listId].visibilityFilter;

const getTodos = (state, props) => state.todoLists[props.listId].todos;

const makeGetVisibleTodos = () => {
  return createSelector(
    [getVisibilityFilter, getTodos],
    (visibilityFilter, todos) => {
      switch (visibilityFilter) {
        case 'SHOW_COMPLETED':
          return todos.filter(todo => todo.completed);
        case 'SHOW_ACTIVE':
          return todos.filter(todo => !todo.completed);
        default:
          return todos;
      }
    }
  );
};

export default makeGetVisibleTodos;
 */
