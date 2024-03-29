export const initialState = {
  books: [
    // { id: '1', title: 'MOCK BOOK I', isbn: '11111', summary: undefined }
  ],
  lastUpdateTime: new Date(),
  requestStatus: {
    postBook: {
      pending: false,
      error: false
    },
    putBook: {
      pending: false,
      error: false
    },
    delBook: {
      pending: false,
      error: false
    },
    getBooks: {
      pending: false,
      error: false
    },
    clearStore: {
      pending: false,
      error: false
    },
    loadSampleData: {
      pending: false,
      error: false
    }
  }
};
