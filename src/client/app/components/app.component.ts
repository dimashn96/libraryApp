import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  public auth = false;
  public admin = false;

  constructor() {
  }

  ngOnInit() {
    this.checkAuth();
  }

  checkAuth(admin?) {
    const token = window.localStorage.token;
    if (token && typeof token === 'string') {
      this.auth = true;
      this.admin = admin || false;
    } else {
      this.auth = false;
      this.admin = false;
    }
  }

}
