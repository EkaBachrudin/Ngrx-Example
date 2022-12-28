import { createAction, props } from '@ngrx/store';
import { BookInterface } from './book';

export const invokeBooksAPI = createAction(
  '[Books API] invoke books fetch api'
);

export const booksFetchApiSuccess = createAction(
  '[Books API] books fetch api success',
  props<{ allBooks: BookInterface[] }>()
);

export const invokeSaveBookAPI = createAction(
  '[Books API] invoke save book API',
  props<{ payload: BookInterface }>()
);

export const saveBookAPISUccess = createAction(
  '[Books API] Save Book Api Success',
  props<{ response: BookInterface }>()
);

export const invokeUpdateBookAPI = createAction(
  '[Books API] invoke update book API',
  props<{ payload: BookInterface }>()
);

export const updateBookAPISuccess = createAction(
  '[Books API] update book API success',
  props<{ response: BookInterface }>()
);

export const invokeDeleateBookAPI = createAction(
  '[Books API] invoke Deleate book API',
  props<{ id: number }>()
);

export const deleateBookAPISuccess = createAction(
  '[Books API] Deleate book API success',
  props<{ id: number }>()
);
