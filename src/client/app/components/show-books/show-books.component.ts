import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {Book} from '../../models/BookModel';
import {Response} from '../../models/ResponseModel';
import {User} from '../../models/UserModel';

@Component({
  selector: 'app-show-books',
  templateUrl: './show-books.component.html',
  styleUrls: ['./show-books.component.scss']
})
export class ShowBooksComponent implements OnInit {

  books: [Book];
  user: User;
  liked: [string];

  constructor(private httpService: HttpService) {
  }

  ngOnInit() {
    this.httpService.getBooks().subscribe((res: Response) => {
        this.books = res.data;
        this.books.forEach((book) => book.show = false);
        const token = localStorage.getItem('token');
        if (token) {
          this.httpService.getUser(token).subscribe((res: Response) => {
            if (res.status === 200 && res.data) {
              this.user = res.data;
              this.liked = this.user.likes || [];
            }
          });
        }
      },
      error => console.log(error)
    );
  }

  toggleShow(book) {
    book.show = !book.show;
  }

  like(book) {
    if (this.user) {
      if (this.likeCheck(book)) {
        book.likes--;
        this.liked.splice(this.liked.indexOf(book._id), 1);
        this.httpService.updateUserLikes(this.user._id, this.liked).subscribe((res: Response) => {});
        this.httpService.updateBookLikes(book._id, book.likes).subscribe((res: Response) => {});
      } else {
        book.likes++;
        this.liked.push(book._id);
        this.httpService.updateUserLikes(this.user._id, this.liked).subscribe((res: Response) => {});
        this.httpService.updateBookLikes(book._id, book.likes).subscribe((res: Response) => {});
      }
    }
  }

  likeCheck(book) {
    return (this.liked.find((elem) => elem === book._id));
  }

}
