import { ObjectID } from 'mongodb';

export class User {
  _id: ObjectID;
  firstName: string;
  lastName: string;
  image: string;
  pdf: string;
}
