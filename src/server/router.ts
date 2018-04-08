import * as express from 'express';
import { DataBaseService } from './services/DataBaseService';
import { Response } from './models/ResponseModel';
import { Book } from './models/BookModel';

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



module.exports = router;
