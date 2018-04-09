import {MongoClient, ObjectID} from 'mongodb';
// import { Cursor } from 'mongodb';
import {config} from '../config';

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
  };

  public static addBook = (book) => {
    return DataBaseService.connect((db) => db.collection(config.db.collections.books)
      .insertOne(book));
  };

  public static updateBook = (book, bookId) => {
    return DataBaseService.connect((db) => db.collection(config.db.collections.books)
      .updateOne({_id: ObjectID(bookId)}, {$set: book}));
  };

  public static getBook = (bookId) => {
    return DataBaseService.connect((db) => db.collection(config.db.collections.books)
      .findOne({_id: ObjectID(bookId)}));
  };

  public static getBooks = () => {
    return DataBaseService.connect((db) => db.collection(config.db.collections.books)
      .find()
      .toArray());
  };

  public static findBooks = (keyword) => {
    const books = [];
    return DataBaseService.connect((db) => db.collection(config.db.collections.books)
      .find({})
      .map((book) => {
        if (book.nm.toLowerCase().indexOf(keyword) !== -1 || book.gnr.toLowerCase().indexOf(keyword) !== -1) {
          return book;
        } else {
          return {};
        }
      })
      .toArray()
    );
  };

  public static addUser = (user) => {
    return DataBaseService.connect((db) => db.collection(config.db.collections.users)
      .insertOne(user));
  };

  public static getUser = (name) => {
    return DataBaseService.connect((db) => db.collection(config.db.collections.users)
      .findOne({nm: name}));
  };

  public static updateBookLikes = (id, likes) => {
    return DataBaseService.connect((db) => db.collection(config.db.collections.books)
      .updateOne({_id: ObjectID(id)}, {$set: {lks: likes}}));
  };

  public static updateUserLikes = (id, likes) => {
    return DataBaseService.connect((db) => db.collection(config.db.collections.users)
      .updateOne({_id: ObjectID(id)}, {$set: {lks: likes}}));
  };

}
