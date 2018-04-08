import { ObjectID } from 'mongodb';

export class User {

  public _id: ObjectID;
  public name: string;
  public firstName: string;
  public lastName: string;
  public passH: string;
  public role: string;

  constructor(user?: any, fromRawData?: boolean) {
    if (!user) {
      return;
    } else {
      this._id = user._id;
      if (fromRawData) {
        this.name = user.nm;
        this.firstName = user.frstNm;
        this.lastName = user.lstNm;
        this.passH = user.pssH;
        this.role = user.rl;
      } else {
        this.name = user.name;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.passH = user.passH;
        this.role = user.role;
      }
    }
  }

  public toRawData() {
    const rawUser: any = {};
    rawUser.nm = this.name;
    rawUser.frstNm = this.firstName;
    rawUser.lstNm = this.lastName;
    rawUser.pssH = this.passH;
    rawUser.rl = this.role;
    return rawUser;
  }

}
