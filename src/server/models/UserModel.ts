import { ObjectID } from 'mongodb';

export class User {

  public _id: ObjectID;
  public firstName: string;
  public lastName: string;
  public image: string;
  public pdf: string;

  constructor(user?: any, fromRawData?: boolean) {
    if (!user) {
      return;
    } else {
      this._id = user._id;
      this.pdf = user.pdf;
      if (fromRawData) {
        this.firstName = user.frstNm;
        this.lastName = user.lstNm;
        this.image = user.img;
      } else {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.image = user.image;
      }
    }
  }

  public toRawData() {
    const rawUser: any = {};
    rawUser.frstNm = this.firstName;
    rawUser.lstNm = this.lastName;
    rawUser.img = this.image;
    rawUser.pdf = this.pdf;
    return rawUser;
  }

}
