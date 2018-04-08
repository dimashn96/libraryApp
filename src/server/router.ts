import * as express from 'express';
import {config} from './config';
import {DataBaseService} from './services/DataBaseService';
import {Response} from './models/ResponseModel';
import {Book} from './models/BookModel';
import {User} from './models/UserModel';

const bcrypt = require('bcrypt');
const jwt = require('json-web-token');

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

// Update book
router.post('/book', (req, res) => {
  const book = new Book(req.body);
  DataBaseService.updateBook(book.toRawData(), book._id)
    .then((result) => {
      sendResponse(res);
    })
    .catch((err) => {
      sendError(res, err);
    });
});

// Get book
router.get('/book/:bookId', (req, res) => {
  DataBaseService.getBook(req.params.bookId)
    .then((book) => {
      sendResponse(res, undefined, undefined, new Book(book, true));
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
      if (!result) {
        sendError(res, undefined, 401, 'User not found');
      } else {
        const user = new User(result, true);
        bcrypt.compare(userReq.password, user.passH, function (err, valid) {
          if (err) {
            return sendError(res, err);
          }
          if (!valid) {
            return sendError(res, err, 401, 'Invalid password');
          }
          jwt.encode(config.auth.secret, {name: user.name}, function (err, token) {
            sendResponse(res, undefined, undefined, token);
          });
        });
      }
    })
    .catch((err) => sendError(res, err));
});

// Get user
router.get('/user', (req, res) => {
  if (!req.headers['x-auth']) {
    return sendError(res, undefined, 401);
  } else {
    jwt.decode(config.auth.secret, req.headers['x-auth'], function (err, decodedPayload) {
      if (err) {
        return sendError(res, undefined, 401);
      } else {
        DataBaseService.getUser(decodedPayload.name)
          .then((user: User) => {
            return sendResponse(res, undefined, undefined, new User(user, true));
          })
          .catch((err) => {
            return sendError(res, err, 401, 'User not found');
          });
      }
    });
  }
});

module.exports = router;
