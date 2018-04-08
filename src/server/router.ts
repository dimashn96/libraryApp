import * as express from 'express';
const bcrypt = require('bcrypt');
const jwt = require('json-web-token');
import { config } from './config';
import { DataBaseService } from './services/DataBaseService';
import { Response } from './models/ResponseModel';
import { Book } from './models/BookModel';
import { User } from './models/UserModel';

// Router
const router = express.Router();

// Error handling
const sendError = (res, err, status = 501, mes?) => {
  const message = mes || (typeof err === 'object' ? err.message : err);
  const response = new Response(status, message);
  res.status(status).json(response);
};

// Response handling
const sendResponse = (res, status = 200, mes = 'ok', data?) => {
  const response = new Response(status, mes, data);
  res.status(status).json(response);
};

// Add book
router.put('/book', (req, res) => {
  const book = new Book(req.body);
  DataBaseService.addBook(book.toRawData())
    .then((result) => {
      sendResponse(res, undefined, undefined, result);
    })
    .catch((err) => {
      sendError(res, err);
    });
});

// Get books
router.get('/books', (req, res) => {
  DataBaseService.getBooks()
    .then((books: [any]) => {
      const data = books.map((book) => new Book(book, true));
      sendResponse(res, undefined, undefined, data);
    })
    .catch((err) => {
      sendError(res, err);
    });
});

// Add user
router.put('/user', (req, res) => {
  const user = new User(req.body);
  user.role = 'user';
  bcrypt.hash(req.body.password, 10, function (err, passH) {
    if (err) {
      sendError(res, err);
    } else {
      user.passH = passH;
      DataBaseService.addUser(user.toRawData())
        .then((result) => {
          sendResponse(res, undefined, undefined, result);
        })
        .catch((err) => {
          sendError(res, err);
        });
    }
  });
});

// Auth
router.post('/user', (req, res) => {
  const userReq = req.body;
  DataBaseService.getUser(userReq.name)
    .then((result) => {
      const user = new User(result, true);
      bcrypt.compare(userReq.password, user.passH, function (err, valid) {
        if (err) {
          return sendError(res, err);
        }
        if (!valid) {
          return sendError(res, err, 401);
        }
        jwt.encode(config.auth.secret, {name: user.name}, function (err, token) {
          sendResponse(res, undefined, undefined, token);
        });
      });
    })
    .catch((err) => sendError(res, err));
});

module.exports = router;
