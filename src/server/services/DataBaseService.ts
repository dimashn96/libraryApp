import { MongoClient } from 'mongodb';
import { config } from '../config';

const dbUri = process.env.MONGODB_ADDON_URI || config.db.uri;
const dbName = process.env.MONGODB_ADDON_DB || config.db.name;

export class DataBaseService {

  private static connect = (func) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(dbUri, (err, client) => {
        const db = client.db(dbName);
        if (err) {
          reject(err);
        } else {
          resolve(func(db));
        }
        client.close();
      });
    });
  }

  public static addBook = (book) => {
    return DataBaseService.connect((db) => db.collection(config.db.collections.books)
      .insertOne(book));
  }

  public static getBooks = () => {
    return DataBaseService.connect((db) => db.collection(config.db.collections.books)
      .find()
      .toArray());
  }

  // public static getUser = (firstName) => {
  //   return DataBaseService.connect((db) => db.collection(config.db.collections.users)
  //     .findOne({frstNm: firstName}));
  // }
  //
  // public static addPdf = (firstName, pdfB) => {
  //   return DataBaseService.connect((db) => db.collection(config.db.collections.users)
  //     .updateOne({frstNm: firstName}, {$set: {pdf: pdfB}}));
  // }

}
