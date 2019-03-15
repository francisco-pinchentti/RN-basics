const uuidv4 = require("uuid/v4");
import { AsyncStorage } from "react-native";

export const SAMPLEBOOK = {
  id: uuidv4(),
  title: "Sample One",
  isbn: "9783161484100",
  summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
};

export function getBooks() {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("books", (err, result) => {
      let books;
      if (!err && result) {
        books = JSON.parse(result);
      } else {
        books = [];
      }
      resolve({
        books,
        page: 1,
        pageSize: books.length,
        totalPages: 1
      });
    });
  });
}

export function postBook(book) {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("books", (err, result) => {
      let books;
      if (!err && result) {
        books = JSON.parse(result);
      } else {
        books = [];
      }

      const newBook = { ...book, id: uuidv4() };

      books.push(newBook);

      AsyncStorage.setItem(
        "books",
        JSON.stringify(books),
        (saveErr, saveResult) => {
          resolve(newBook);
        }
      );
    });
  });
}

export function putBook(updateBook) {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("books", (err, result) => {
      let books;
      if (!err && result) {
        books = JSON.parse(result);
      } else {
        books = [];
      }
      const updatedBooksCollection = books
        .filter(b => b.id !== updateBook.id)
        .concat([updateBook]);
      AsyncStorage.setItem(
        "books",
        JSON.stringify(updatedBooksCollection),
        (updateErr, updateResult) => {
          resolve(updateBook);
        }
      );
    });
  });
}

export function delBook(book) {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("books", (err, result) => {
      let books;
      if (!err && result) {
        books = JSON.parse(result);
      } else {
        books = [];
        reject("No books found");
      }
      books = books.filter(b => b.id !== book.id);
      AsyncStorage.setItem(
        "books",
        JSON.stringify(books),
        (updateErr, updateResult) => {
          resolve(book);
        }
      );
    });
  });
}

export function clearBooks() {
  return new Promise((resolve, reject) => {
    localStorage.clear();
    setTimeout(() => {
      resolve(true);
    }, 100);
  });
}

export function loadSampleData() {
  return new Promise((resolve, reject) => {
    const books = [SAMPLEBOOK];
    localStorage.setItem("books", JSON.stringify(books));
    setTimeout(() => {
      resolve(true);
    }, 100);
  });
}
