const {
    saveBookHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    editBookByIdHandler,
    deleteBookByIdHandler,
} = require('./handler')
  
  const routes = [
    {
      method: 'GET',
      path: '/',
      handler: () => {
        return 'ini halaman home'
      }
    },
    {
      method: 'POST',
      path: '/books',
      handler: saveBookHandler
    },
    {
      method: 'GET',
      path: '/books',
      handler: getAllBooksHandler
    },
    {
      method: 'GET',
      path: '/books/{bookId}',
      handler: getBookByIdHandler
    },
    {
      method: 'PUT',
      path: '/books/{bookId}',
      handler: editBookByIdHandler
    },
    {
      method: 'DELETE',
      path: '/books/{bookId}',
      handler: deleteBookByIdHandler
    },
  ];
  
  module.exports = routes
  