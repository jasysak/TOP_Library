/*

  Library App for TOP

  Book object:
    book.title = string
    book.author  = string
    book.pages = int
    book.haveRead = bool 
    book.readDate = date MM/DD/YY
    info() method to return above items

    v0.01 - Create initial book object per above object 
*/
// TEMP - clear local and session Storage for testing only
localStorage.clear();
sessionStorage.clear();

// initilize library with some test books
let libInit;
libInit = ` [{"Book ID":100,"Title":"The Hobbit","Author":"J.R.R. Tolkien","Pages":310,"Have Read":"No","Date Read":""},
            {"Book ID":101,"Title":"A Game of Thrones","Author":"George R.R. Martin","Pages":694,"Have Read":"Yes","Date Read":"2016/10/01"}
            ]`

// let userFile = "./data/library.json"; // not used yet

let bookLibrary = [];
if (libInit) {
  bookLibrary = JSON.parse(libInit);
}

// init localStorage 'userLibrary' if it does not exist
if (localStorage.getItem('userLibrary') === null) {
  localStorage.setItem('userLibrary', JSON.stringify(bookLibrary));
}

let totalBooks = bookLibrary.length; 

// Book object
function book(bookID, title, author, pages, haveRead, dateRead) {
  this['Book ID'] = bookID;
  this['Title'] = title;
  this['Author'] = author;
  this['Pages'] = pages;
  this['Have Read'] = haveRead;
  this['Date Read'] = dateRead;
 
  //this.info = () => {
  //  return (title + ' by ' + author + ', ' + pages + ' pages' + ', Read: ' + haveRead);
}
  
  // Simple method as example - NOT USED
book.prototype.info = function() {
    return (this.title + ' by ' + this.author + ', ' + this.pages + ' pages' + ', Read: ' + this.haveRead);
}

// some event listeners NOT USED
//document.getElementById('add-book').addEventListener('click', addBook());

// for Bootstrap popover functionality
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})

// for table creation
let tableTest;
let tableDiv;
let _table = document.createElement('table');
let _tr = document.createElement('tr');
let _th = document.createElement('th');
let _td = document.createElement('td');
const btn = document.createElement('button');

// setup table for formatting
_table.setAttribute('id', 'libraryTable');

btn.classList.add('btn', 'btn-primary');  

// credit to stack overflow for table creation code (with slight edits by JAS/me):
// https://stackoverflow.com/questions/5180382/convert-json-data-to-a-html-table
// Builds the HTML Table out of bookLibrary array / json data.
 function buildHtmlTable(arr) {
     var table = _table.cloneNode(false),
         columns = addAllColumnHeaders(arr, table);
     for (var i=0, maxi=arr.length; i < maxi; i++) {
         var tr = _tr.cloneNode(false);
         for (var j=0, maxj=columns.length; j < maxj ; j++) {
             var td = _td.cloneNode(false);
                 cellValue = arr[i][columns[j]];
             td.appendChild(document.createTextNode(arr[i][columns[j]]));
             //if (j === (maxj-1)) { 
             // td.appendChild(document.createElement("button")); // not working
             // }
             tr.appendChild(td);
             
         }
         // tr.appendChild(btn);
         table.appendChild(tr);
         
     }
     return table;
 }
 function addAllColumnHeaders(arr, table)
 {
     var columnSet = [],
         tr = _tr.cloneNode(false);
     for (var i=0, l=arr.length; i < l; i++) {
         for (var key in arr[i]) {
             if (arr[i].hasOwnProperty(key) && columnSet.indexOf(key)===-1) {
                 columnSet.push(key);
                 var th = _th.cloneNode(false);
                 th.appendChild(document.createTextNode(key));
                 tr.appendChild(th);
             }
         }
     }
     table.appendChild(tr);
     // TEST OK console.log(columnSet);
     return columnSet;
 }

 // below curtesy of https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
 // and https://stackoverflow.com/questions/48073151/read-local-json-file-into-variable

/* function loadLibrary(callback) {

  let request = new XMLHttpRequest();
  request.overrideMimeType("application/json");
  request.open("GET", userFile, true);  // TODO allow varyinh userFile
  
  request.onreadystatechange = function() {
    if ( request.readyState === 4 && request.status === 200 ) {
      
      callback(JSON.parse(request.responseText));
      // console.log(Object.values(result));
      // console.log("Result = " + result);
      // return result;
      // return (Object.values(result));
    }
    
  };
  request.send(null);
  
}

function init() {
  loadLibrary(function(response) {
    console.log(response);
  
  });
}
*/

 // END code from Stack overflow

function addBook() {
  // function to add a book to the library 
  // popup a modal form entry box
  // accepts title, author, pages, haveRead, readDate
  // then appends to bookLibrary array
  totalBooks = bookLibrary.length;
  let _addBook = new book;
  _addBook['Book ID'] = totalBooks + 100;
  _addBook['Title'] = document.getElementById('bTitle').value;
  _addBook['Author'] = document.getElementById('bAuthor').value;
  _addBook['Pages'] = document.getElementById('bPages').value;
  _addBook['Have Read'] = document.querySelector('.form-check-input').checked;
  _addBook['Date Read'] = document.getElementById('bDateRead').value;
  // TEST OK console.log("_addBook = " + _addBook.pages);
  bookLibrary.push(_addBook);
  listBooks();
  
}

function removeBook() {
  // as above, but remove instead of add.
  // remove selected book
  // compact bookLibrary array
  // TO DO
  listBooks();

}

function findBooks() {
  // a function to accept a search term and the type of search, then return an array of matches
  // TO DO

}

function listBooks() {
  // TEST OK console.log(bookLibrary);
  // a function to list all books in a given array
  // array can be all books in library or any subset thereof
  // For now this just lists all books in the library
  //console.log(document.getElementById('libraryTable'))
  if (document.getElementById('libraryTable')) {
    document.getElementById('libraryTable').remove();
  }
  //console.log(document.getElementById('libraryTable'))
  tableTest = buildHtmlTable(bookLibrary);
  tableTest.classList.add('table');
  tableTest.classList.add('table-striped');
  tableTest.classList.add('sortable');
  tableDiv = document.getElementById('table-container');
  tableDiv.appendChild(tableTest);
} 

function displayDash() {
  //to display and update a user dashboard/landing page

}

if (document.getElementById('libraryTable')) {
  listBooks();
}
//console.log(bookLibrary);



