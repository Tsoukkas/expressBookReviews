const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Get the book list available in the shop
public_users.post("/register", (req,res) => {
  //Write your code here
  //TASK1
  public_users.get('/', function (req, res) {
    res.send(JSON.stringify(books, null, 4));
   });

  return res.status(300).json({message: "Yet to be implemented"});
});



   
  


// Get book details based on ISBN
//TASK2
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn; // Retrieve the ISBN from the request parameters
  
    if (books.hasOwnProperty(isbn)) {
      const book = books[isbn]; // Get the book details using the ISBN as the key
      res.send(JSON.stringify(book, null, 4));
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  });
  
  
// Get book details based on author
//TASK3
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author; // Retrieve the author from the request parameters
  
    const booksByAuthor = Object.values(books).filter(book => book.author === author);
  
    if (booksByAuthor.length > 0) {
      res.send(JSON.stringify(booksByAuthor, null, 4));
    } else {
      res.status(404).json({ message: "Books by the author not found" });
    }
  });
  
// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    public_users.get('/author/:author', function (req, res) {
        const title = req.params.title; // Retrieve the author from the request parameters
      
        const booksBytitle = Object.values(books).filter(book => book.title === title);
      
        if (booksBytitle.length > 0) {
          res.send(JSON.stringify(booksByAuthor, null, 4));
        } else {
          res.status(404).json({ message: "Books by the title not found" });
        }
      });
      
    });

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    public_users.get('/review/:isbn', function (req, res) {
        const isbn = req.params.isbn; // Retrieve the ISBN from the request parameters
      
        if (books.hasOwnProperty(isbn)) {
          const book = books[isbn]; // Get the book details using the ISBN as the key
          const reviews = book.reviews; // Get the reviews for the book
      
          res.send(JSON.stringify(reviews, null, 4));
        } else {
          res.status(404).json({ message: "Book not found" });
        }
      });
      
});

module.exports.general = public_users;
