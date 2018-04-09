import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {Response} from '../../models/ResponseModel';
import {User} from '../../models/UserModel';

@Component({
  selector: 'app-user-likes',
  templateUrl: './user-likes.component.html',
  styleUrls: ['./user-likes.component.scss']
})
export class UserLikesComponent implements OnInit {

  books = [];
  user: User;

  constructor(private httpService: HttpService) {
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.httpService.getUser(token).subscribe((res: Response) => {
        if (res.status === 200 && res.data) {
          this.user = res.data;
          this.user.likes.forEach((elem) => {
            this.httpService.getBook(elem).subscribe((res: Response) => {
                this.books.push(res.data);
              },
              error => console.log(error)
            );
          });
        }
      });
    }
  }

  toggleShow(book) {
    book.show = !book.show;
  }

}
