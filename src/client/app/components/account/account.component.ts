import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Book } from '../../models/BookModel';
import { Response } from '../../models/ResponseModel';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

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
