/*

  Library App for TOP

  Book object:
    book.title = string
    book.author  = string
    book.pages = int
    book.haveRead = bool 
    info() method to return above items

    v0.01 - Create initial book object per above object 
*/

function book(title, author, pages, haveRead) {
  // v0.01 object parameters
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
  // v0.01 object method(s) to return above parameters
  this.info = () => {
    return (title + ' by ' + author + ', ' + pages + ' pages ' + ', Read: ' + haveRead);
  }

}

// setup an array of bookLibrary to contain all book objects
// (could or should this be a map k->v type struc ?)
let bookLibrary = [];
let bookIndex = 0;
bookLibrary[bookIndex] = new book('The Hobbit', 'J.R.R. Tolkien', 295, false);
console.log(bookLibrary[bookIndex]);