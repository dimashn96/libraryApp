export const config = {

  server: {
    port: 3000,
    path: {
      api: '../../build/server/router',
      angularOutput: '../../build/client',
      angularIndex: '../../build/client/index.html'
    }
  },
  db: {
    name: 'library',
    uri: 'mongodb://localhost:27017/library',
    collections: {
      books: 'books',
      users: 'users'
    }
  },
  auth: {
    secret: 'TTTTOOOOPPPPSSSSEEEECCCCRRRREEEETTTT'
  }

};
