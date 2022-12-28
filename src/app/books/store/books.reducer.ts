import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { BookInterface } from './book';
import {
  booksFetchApiSuccess,
  deleateBookAPISuccess,
  saveBookAPISUccess,
  updateBookAPISuccess,
} from './books.action';

export const initialState: ReadonlyArray<BookInterface> = [];

export const BookReducer = createReducer(
  initialState,
  on(booksFetchApiSuccess, (state, { allBooks }) => {
    return allBooks;
  }),
  on(saveBookAPISUccess, (state, { response }) => {
    let newState = [...state];
    newState.unshift(response);
    return newState;
  }),
  on(updateBookAPISuccess, (state, { response }) => {
    let newState = state.filter((_) => _.id !== response.id);
    newState.unshift(response);
    return newState;
  }),
  on(deleateBookAPISuccess, (state, { id }) => {
    let newState = state.filter((_) => _.id !== id);
    return newState;
  })
);
