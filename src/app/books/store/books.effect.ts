import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, switchMap, withLatestFrom } from 'rxjs';
import { setApiStatus } from 'src/app/shared/store/app.action';
import { Appstate } from 'src/app/shared/store/appstate';
import { BooksService } from '../books.service';
import {
  booksFetchApiSuccess,
  deleateBookAPISuccess,
  invokeBooksAPI,
  invokeDeleateBookAPI,
  invokeSaveBookAPI,
  invokeUpdateBookAPI,
  saveBookAPISUccess,
  updateBookAPISuccess,
} from './books.action';
import { selectBooks } from './books.selector';

@Injectable()
export class BooksEffect {
  constructor(
    private actions$: Actions,
    private bookService: BooksService,
    private appStore: Store<Appstate>,
    private store: Store
  ) {}

  loadAllBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeBooksAPI),
      withLatestFrom(this.store.pipe(select(selectBooks))),
      switchMap(([, booksFromStore]) => {
        if (booksFromStore.length > 0) {
          return EMPTY;
        }
        return this.bookService
          .get()
          .pipe(map((data) => booksFetchApiSuccess({ allBooks: data })));
      })
    )
  );

  saveNewBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeSaveBookAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setApiStatus({
            apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
          })
        );
        return this.bookService.create(action.payload).pipe(
          map((data) => {
            return saveBookAPISUccess({ response: data });
          })
        );
      })
    )
  );

  updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeUpdateBookAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setApiStatus({
            apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
          })
        );
        return this.bookService.update(action.payload).pipe(
          map((data) => {
            return updateBookAPISuccess({ response: data });
          })
        );
      })
    )
  );

  deleteBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeDeleateBookAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setApiStatus({
            apiStatus: { apiResponseMessage: '', apiStatus: '' },
          })
        );
        return this.bookService.delete(action.id).pipe(
          map((data) => {
            this.appStore.dispatch(
              setApiStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );

            return deleateBookAPISuccess({ id: action.id });
          })
        );
      })
    )
  );
}
