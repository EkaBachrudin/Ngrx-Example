import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookInterface } from './book';

export const selectBooks = createFeatureSelector<BookInterface[]>('mybooks');

export const selectBookById = (bookId: number) => {
  return createSelector(selectBooks, (books: BookInterface[]) => {
    var bookById = books.filter((_) => _.id == bookId);

    if (bookById.length == 0) {
      return null;
    }

    return bookById[0];
  });
};
