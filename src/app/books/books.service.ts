import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookInterface } from './store/book';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<BookInterface[]>('http://localhost:3000/books');
  }

  create(payload: BookInterface) {
    return this.http.post<BookInterface>(
      'http://localhost:3000/books',
      payload
    );
  }

  update(payload: BookInterface) {
    return this.http.put<BookInterface>(
      `http://localhost:3000/books/${payload.id}`,
      payload
    );
  }

  delete(id: number) {
    return this.http.delete(`http://localhost:3000/books/${id}`);
  }
}
