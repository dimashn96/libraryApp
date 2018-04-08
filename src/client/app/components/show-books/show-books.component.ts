import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Book } from '../../models/BookModel';
import { Response } from '../../models/ResponseModel';

@Component({
  selector: 'app-show-books',
  templateUrl: './show-books.component.html',
  styleUrls: ['./show-books.component.scss']
})
export class ShowBooksComponent implements OnInit {

  books: [Book];

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.httpService.getBooks().subscribe((res: Response) => {
        this.books = res.data;
      },
      error => console.log(error)
    );
  }

}
