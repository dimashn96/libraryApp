import { ObjectID } from 'mongodb';

export class Book {

  _id: ObjectID;
  name: string;
  author: string;
  genre: string;
  description: string;
  link: string;
  image: string;
  likes: number;

  constructor(book?: any, fromRawData?: boolean) {
    if (!book) {
      return;
    } else {
      this._id = book._id;
      if (fromRawData) {
        this.name = book.nm;
        this.author = book.authr;
        this.genre = book.gnr;
        this.description = book.dsc;
        this.link = book.lnk;
        this.image = book.img;
        this.likes = book.lks;
      } else {
        this.name = book.name;
        this.author = book.author;
        this.genre = book.genre;
        this.description = book.description;
        this.link = book.link;
        this.image = book.image;
        this.likes = book.likes || 0;
      }
    }
  }

  public toRawData() {
    const rawUser: any = {};
    rawUser.nm = this.name;
    rawUser.authr = this.author;
    rawUser.gnr = this.genre;
    rawUser.dsc = this.description;
    rawUser.lnk = this.link;
    rawUser.img = this.image;
    rawUser.lks = this.likes;
    return rawUser;
  }

}
