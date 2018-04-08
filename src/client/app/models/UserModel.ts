import { ObjectID } from 'mongodb';

export class User {
  _id: ObjectID;
  name: string;
  firstName: string;
  lastName: string;
  newPassword: string;
}
