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
  show: boolean;
}
