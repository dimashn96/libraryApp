import {Component} from '@angular/core';
import {Book} from '../../models/BookModel';
import {HttpService} from '../../services/http.service';
import {ActivatedRoute} from '@angular/router';
import {Response} from '../../models/ResponseModel';

@Component({
  selector: 'app-find-book',
  templateUrl: './find-book.component.html',
  styleUrls: ['./find-book.component.scss']
})
export class FindBookComponent {

  books: [Book];
  message: string;
  done = false;
  keyword: string;

  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute) {
  }

  submit() {
    this.httpService.findBooks(this.keyword).subscribe((res: Response) => {
        this.books = res.data;
        this.done = true;
        if (typeof res.data === 'string') {
          this.message = res.data;
        }
      },
      error => console.log(error)
    );
  }

}
