import { Component } from '@angular/core';
import { Book } from '../../models/BookModel';
import { Response } from '../../models/ResponseModel';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent {

  book: Book = new Book();
  message: string;
  done = false;

  constructor(private httpService: HttpService) { }

  submit() {
    this.httpService.addBook(this.book).subscribe((res: Response) => {
        this.done = true;
        if (typeof res.data === 'string') {
          this.message = res.data;
        }
      },
      error => console.log(error)
    );
  }


}
