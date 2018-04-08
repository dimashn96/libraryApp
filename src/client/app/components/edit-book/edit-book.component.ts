import {Component, OnInit} from '@angular/core';
import {Book} from '../../models/BookModel';
import {HttpService} from '../../services/http.service';
import {ActivatedRoute} from '@angular/router';
import {Response} from '../../models/ResponseModel';
import {ObjectID} from 'mongodb';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  book: Book;
  message: string;
  done = false;
  private bookId: ObjectID;

  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.bookId = this.activatedRoute.snapshot.paramMap.get('book-id');
    console.log(this.bookId);
    this.httpService.getBook(this.bookId).subscribe((res: Response) => {
      this.book = res.data;
    });

  }

  submit() {
    this.httpService.updateBook(this.book).subscribe((res: Response) => {
        this.done = true;
        if (typeof res.data === 'string') {
          this.message = res.data;
        }
      },
      error => console.log(error)
    );
  }

}
