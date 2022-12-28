import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { setApiStatus } from 'src/app/shared/store/app.action';
import { selecAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { BookInterface } from '../store/book';
import { invokeUpdateBookAPI } from '../store/books.action';
import { selectBookById } from '../store/books.selector';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private appStore: Store<Appstate>
  ) {}

  bookForm: BookInterface = {
    id: 0,
    author: '',
    title: '',
    cost: 0,
  };

  ngOnInit(): void {
    let fetchFromData$ = this.route.paramMap.pipe(
      switchMap((param) => {
        var id = Number(param.get('id'));
        return this.store.pipe(select(selectBookById(id)));
      })
    );

    fetchFromData$.subscribe((data) => {
      if (data) {
        this.bookForm = { ...data };
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  update() {
    this.store.dispatch(invokeUpdateBookAPI({ payload: { ...this.bookForm } }));
    let appState$ = this.appStore.pipe(select(selecAppState));
    appState$.subscribe((data) => {
      if (data.apiStatus === 'success') {
        this.appStore.dispatch(
          setApiStatus({
            apiStatus: { apiStatus: '', apiResponseMessage: '' },
          })
        );
        this.router.navigate(['/']);
      }
    });
  }
}
