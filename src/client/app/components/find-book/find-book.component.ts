import {Component, OnInit} from '@angular/core';
import {Book} from '../../models/BookModel';
import {HttpService} from '../../services/http.service';
import {ActivatedRoute} from '@angular/router';
import {Response} from '../../models/ResponseModel';
import {User} from '../../models/UserModel';

@Component({
  selector: 'app-find-book',
  templateUrl: './find-book.component.html',
  styleUrls: ['./find-book.component.scss']
})
export class FindBookComponent implements OnInit {

  books: [Book];
  message: string;
  done = false;
  keyword: string;
  user: User;
  liked: [string];

  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.httpService.getUser(token).subscribe((res: Response) => {
        if (res.status === 200 && res.data) {
          this.user = res.data;
          this.liked = this.user.likes || [];
        }
      });
    }
  }

  submit() {
    this.httpService.findBooks(this.keyword.toLowerCase()).subscribe((res: Response) => {
        this.books = res.data;
        this.done = true;
        if (typeof res.data === 'string') {
          this.message = res.data;
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
