const { nanoid } = require('nanoid');
let bookselft = require('./books');

const saveBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
    return response;
  }
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;
  bookselft.push({
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt
  });
  const isSuccess = bookselft.filter((book) => book.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      }
    }).code(201);
    return response;
  }
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  }).code(500);
  return response;
};
const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  if (name) {
    const bookshelft = bookselft.filter((b) => b.name.toLowerCase() === name.toLowerCase());
    return h.response({
      status: 'success',
      data: {
        books: bookshelft
          .filter((r) => r.reading === false)
          .map((books) => ({
            id: books.id,
            name: books.name,
            publisher: books.publisher,
          })),
      },
    }).code(200);
  }
  if (reading) {
    const bookshelft = bookselft.filter((b) => Number(b.reading) === reading);
    return h.response({
      status: 'success',
      data: {
        books: bookshelft
          .filter((f) => f.finished === true)
          .map((books) => ({
            id: books.id,
            name: books.name,
            publisher: books.publisher,
          })),
      },
    }).code(200);
  }
  if (finished) {
    const bookshelft = bookselft.filter((b) => Number(b.finished) === finished);
    return h.response({
      status: 'success',
      data: {
        books: bookshelft
          .filter((f) => f.finished === false)
          .map((books) => ({
            id: books.id,
            name: books.name,
            publisher: books.publisher,
          })),
      },
    }).code(200);
  }
  if (!name && !reading && !finished) {
    return h.response({
      status: 'success',
      data: {
        books: bookselft.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    }).code(200);
  }
};

const getBookByIdHandler = (request, h) => {
  const { Id } = request.params;

  const book = bookselft.filter((n) => n.id === Id)[0];
  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  }).code(404);
  return response;
};

const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
    return response;
  }
  const updatedAt = new Date().toISOString();
  const index = bookselft.findIndex((book) => book.id === bookId);
  if (index !== -1) {
    bookselft[index] = {
      ...bookselft[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    }).code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  }).code(404);
  return response;
};

const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    bookselft.splice(index, 1);

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    }).code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  }).code(404);
  return response;
};

module.exports = {
  saveBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
