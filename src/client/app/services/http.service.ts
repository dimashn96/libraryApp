import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/UserModel';
import {Book} from '../models/BookModel';

@Injectable()

export class HttpService {

  constructor(private http: HttpClient) {
  }

  addBook(book: Book) {
    return this.http.put('../api/book', book);
  }

  updateBook(book: Book) {
    return this.http.post('../api/book', book);
  }

  getBook(bookId) {
    return this.http.get('../api/book/' + bookId);
  }

  getBooks() {
    return this.http.get('../api/books');
  }

  findBooks(keyword) {
    return this.http.get('../api/books/' + keyword);
  }

  addUser(user: User) {
    return this.http.put('../api/user', user);
  }

  auth(user: User) {
    return this.http.post('../api/user', user);
  }

  getUser(token: string) {
    return this.http.get('../api/user', {headers: {'x-auth': token}});
  }

  updateUserLikes(userId, likes) {
    return this.http.post('../api/user-likes', {id: userId, likes: likes});
  }

  updateBookLikes(bookId, likes) {
    return this.http.post('../api/book-likes', {id: bookId, likes: likes});
  }

}
