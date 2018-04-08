import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/UserModel';
import { Book } from '../models/BookModel';

@Injectable()

export class HttpService {

  constructor(private http: HttpClient) {}

  addBook(book: Book) {
    return this.http.put('../api/book', book);
  }

  getBooks() {
    return this.http.get('../api/books');
  }

  addUser(user: User) {
    return this.http.put('../api/user', user);
  }

}
