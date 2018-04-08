import {Component} from '@angular/core';
import {User} from '../../models/UserModel';
import {Response} from '../../models/ResponseModel';
import {HttpService} from '../../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  user: User = new User();
  message: string;
  done = false;

  constructor(private httpService: HttpService, private router: Router) {
  }

  submit() {
    this.httpService.auth(this.user).subscribe((res: Response) => {
        if (res.status === 200) {
          this.done = true;
          if (res.data && typeof res.data === 'string') {
            window.localStorage.setItem('token', res.data);
            this.router.navigate(['account']);
          }
        }
      },
      error => console.log(error)
    );
  }

}
