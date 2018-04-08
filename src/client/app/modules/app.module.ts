import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { HttpService } from '../services/http.service';

import { AppComponent } from '../components/app.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { HomeComponent } from '../components/home/home.component';
import { ShowBooksComponent } from '../components/show-books/show-books.component';
import { AddBookComponent } from '../components/add-book/add-book.component';
import { AddUserComponent} from '../components/add-user/add-user.component';
import { AuthComponent} from '../components/auth/auth.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-book', component: AddBookComponent },
  { path: 'show-books', component: ShowBooksComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'auth', component: AuthComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    ShowBooksComponent,
    AddBookComponent,
    AddUserComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})

export class AppModule {}
