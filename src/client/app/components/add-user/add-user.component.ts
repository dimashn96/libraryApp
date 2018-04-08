import { Component } from '@angular/core';
import { User } from '../../models/UserModel';
import { Response } from '../../models/ResponseModel';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

  user: User = new User();
  message: string;
  done = false;

  constructor(private httpService: HttpService) { }

  submit() {
    this.httpService.addUser(this.user).subscribe((res: Response) => {
        this.done = true;
        if (typeof res.data === 'string') {
          this.message = res.data;
        }
      },
      error => console.log(error)
    );
  }


}
