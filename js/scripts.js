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

// Book object - converted to class per TOP classes exercise
class book {
  constructor(bookID, title, authorLast, authorFirst, pages, haveRead, dateRead, isbn13) {
    this.bookID = bookID;
    this.title = title;
    this.authorLast = authorLast;
    this.authorFirst = authorFirst;
    this.pages = pages;
    this.haveRead = haveRead;
    this.dateRead = dateRead;
    this.isbn13 = isbn13;
  }
}

// ORIGIN
// kindle KU
// pasco lib - HB or OV
// hoopla ebook

/*
class library {
  [authorLast] 
  constructor () {
   // 
  }
  //constructor (authorLast, bookArray) {
  //  [authorLast] = authorLast;
  //  bookArray = bookArray;  new Array() ???
  //}
  //
  addBookToLibrary(bookID, title, authorLast, authorFirst, pages, haveRead, dateRead, isbn13) {
  // first check if authorLast specified exists
  // if yes, then push book to array
  // if no, add authorLast: array[book] as new library object prop
    this.authorLast = authorLast;
    this.authorLast.push(new book(bookID, title, authorLast, authorFirst, pages, haveRead, dateRead, isbn13));
  } 
}
*/

// TEMP - clear local and session Storage 
// window.localStorage.clear();
// window.localStorage.removeItem('userLibrary');
// sessionStorage.clear();

// initilize library with some test/sample books
let libInit;
libInit = `[{"bookID":100,"title":"The Hobbit","authorLast":"Tolkien","authorFirst":"J.R.R.","pages":310,"haveRead":"false","dateRead":"0000/00/00", "isbn13": 9780044403371, "notes":"Classic fantasy, must read. Kids OK."},
            {"bookID":101,"title":"A Game of Thrones","authorLast":"Martin","authorFirst":"George R.R.","pages":694,"haveRead":"true","dateRead":"2016/10/01", "isbn13": 9780553573404, "notes":"Now classic fantasy with more adult themes"},
            {"bookID":102,"title":"On Basilisk Station","authorLast":"Weber","authorFirst":"David","pages":338,"haveRead":"true","dateRead":"2017/10/01", "isbn13": 9780671577933, "notes":"Action packed sci-fi, first in the Honorverse series."},
            {"bookID":103,"title":"The Last Wish","authorLast":"Sapkowski","authorFirst":"Andrzej","pages":288,"haveRead":"false","dateRead":"0000/00/00", "isbn13": 9780316438964, "notes":"Now classic fantasy with somewhat more mature themes"},
            {"bookID":104,"title":"Dune","authorLast":"Herbert","authorFirst":"Frank","pages":541,"haveRead":"false","dateRead":"0000/00/00", "isbn13": 9780441013593, "notes":"Classic sci-fi, political intrigue, deep, conceptual"},
            {"bookID":105,"title":"Leviathan Wakes","authorLast":"Corey","authorFirst":"James S.A.","pages":288,"haveRead":"false","dateRead":"0000/00/00", "isbn13": 9781611297560, "notes":"Expanse series book 1. Action sci-fi with political backdrop. Amazon TV series ongoing"},
            {"bookID":106,"title":"The Honor of the Queen","authorLast":"Weber","authorFirst":"David","pages":338,"haveRead":"true","dateRead":"2017/10/01", "isbn13": 9780743408233, "notes":"Action packed sci-fi, second in the Honorverse series."}
          ]`

// TODO update user library data structure to resemble map (or object) -> (k, v)=(authorName, authorBookArray)

let bookLibrary; // = JSON.parse(localStorage.getItem('userLibrary'));
let totalBooks; 
if (libInit) {
  bookLibrary = JSON.parse(libInit);
}

//userLibrary = new library(null);
//console.log(bookLibrary);
//bookLibrary.forEach(book => {
//  console.log(book.bookID, book.title, book.authorLast, book.authorFirst, book.pages, book.haveRead, book.dateRead, book.isbn13)
//  userLibrary.addBookToLibrary(book.bookID, book.title, book.authorLast, book.authorFirst, book.pages, book.haveRead, book.dateRead, book.isbn13)
//});

// init localStorage 'userLibrary' if it does not exist
if (localStorage.getItem('userLibrary') === null) {
  localStorage.setItem('userLibrary', JSON.stringify(bookLibrary));
}

function toggleModal(elementID) {
  let toggleElement = document.getElementById(elementID);
  if (toggleElement.classList.contains('visible')) toggleElement.classList.remove('visible');
  else toggleElement.classList.add('visible');
}

function setEventListeners() {
  let tempElement;
  // set a few event listeners. This allows for HTML5 form validation over setting
  // an "onclick=function(...)" in the HTML form directly
  tempElement = document.getElementById('add-book-btn');
  tempElement.addEventListener('click', (e) => {
    e.preventDefault(); 
    addBook('add-book-modal');
   }); 
}

// for table creation 
// let tableTest;
// let tableDiv;
let _table = document.createElement('table');
// let _tr = document.createElement('tr');
// let _th = document.createElement('th');
// let _td = document.createElement('td');
// const checkbox = document.createElement('input');
// checkbox.type = 'checkbox';

// setup table for formatting
_table.setAttribute('id', 'libraryTable');

//btn.classList.add('btn', 'btn-primary');  

// credit to stack overflow for table creation code (with slight edits by JAS/me):
// https://stackoverflow.com/questions/5180382/convert-json-data-to-a-html-table
// Builds the HTML Table out of bookLibrary array / json data.
/* NOT USED
function buildHtmlTable(arr) {
  var table = _table.cloneNode(false);
  console.log(table);
  var columns = addAllColumnHeaders(arr, table);
  console.log(typeof columns);
  for (var i=0, maxi=arr.length; i < maxi; i++) {
    var tr = _tr.cloneNode(false);
    for (var j=0, maxj=columns.length; j <= maxj ; j++) {
      var td = _td.cloneNode(false);
      console.log(i + ' ' + j + ' ' + arr[i][columns[j]]);
      if (j < maxj) td.appendChild(document.createTextNode(arr[i][columns[j]]));
      else td.appendChild(checkbox); // add a checkbox for selecting
      tr.appendChild(td);      
    }
    table.appendChild(tr);
  }
  return table;
}
*/

/* NOT USED - For buildHtmlTable
function addAllColumnHeaders(arr, table) {
  var columnSet = [];
  var tr = _tr.cloneNode(false);
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
  let selectCheck = document.createElement('th');
  selectCheck.innerText = 'Select';
  tr.appendChild(selectCheck); // add extra column for chose button
  table.appendChild(tr);
  return columnSet;
}
*/
// END code from Stack overflow

function addBookDiv(book) {
  tableDiv = document.getElementById('libraryTable');
  let newDiv = document.createElement('div'); 
  let btnEdit = document.createElement('button');
  let btnDel = document.createElement('button');
  btnEdit.innerText = 'Edit';
  btnEdit.setAttribute('class', 'btn btn-outline-warning');
  btnDel.innerText = 'Delete';
  btnDel.setAttribute('class', 'btn btn-outline-danger');
  newDiv.setAttribute('id', book['bookID']);
  newDiv.setAttribute('class', 'card-div');

  /* REMOVED haveRead logic - User feedback indicates this is not a desired or useful behavior
  // TODO haveRead button to EDIT BOOK
  if (book['haveRead'] == 'true') {
    btnEdit.innerText = 'Read';
    btnEdit.setAttribute('class', 'btn btn-outline-success');
    btnEdit.setAttribute('data-text-original', 'Read');
    btnEdit.setAttribute('data-text-swap', 'Not Read');
  }
  else {
    btnEdit.innerText = 'Not Read';
    btnEdit.setAttribute('class', 'btn btn-outline-secondary');
    btnEdit.setAttribute('data-text-original', 'Not Read');
    btnEdit.setAttribute('data-text-swap', 'Read');
  }
  // add an event listener to toggle read status and button appearance (i.e. toggle)
  btnEdit.addEventListener('click', function() {
    if (btnEdit.getAttribute('data-text-swap') == btnEdit.innerHTML) {
      btnEdit.innerHTML = btnEdit.getAttribute('data-text-original');
    } else {
      btnEdit.setAttribute('data-text-original', btnEdit.innerHTML);
      btnEdit.innerHTML = btnEdit.getAttribute('data-text-swap');
    }
    // toggle Have Read in bookLibrary[]
    if (book['haveRead'] == 'true') {
      book['haveRead'] = 'false';
      btnEdit.classList.remove('btn-outline-success');
      btnEdit.classList.add('btn-outline-secondary');
    } 
    else {
      book['haveRead'] == 'false';
      book['haveRead'] = 'true';
      btnEdit.classList.remove('btn-outline-secondary');
      btnEdit.classList.add('btn-outline-success');
    }
  }, false);
    */
  // grab a cover graphic from https://openlibrary.org/dev/docs/api/covers using ISBN 13 and S, M, L image size
  const coverURL = `http://covers.openlibrary.org/b/ISBN/${book['isbn13']}-M.jpg`
  newDiv.innerHTML = `<p> <img src=${coverURL} </p>` +
                    //'<p>Book ID: ' + bookLibrary[i]['Book ID'] + '</p>' +
                    '<p>' + book['title'] + ', ' + book['pages'] + ' Pages' +
                    '<br> by ' +
                    book['authorLast'] + ', ' + book['authorFirst'] + '</p>' +
                    
                    // '<p>ISBN 13: ' + book['isbn13'] + '</p>' +
                    '<p>Date Read: ' + book['dateRead'] + '</p>' +
                    '<p>Notes: ' + book['notes'];

  // btnRead.setAttribute('data-bookID', bookLibrary[i]['Book ID']); // for later editing
  // btnDel.setAttribute('data-bookID', bookLibrary[i]['Book ID']);
  btnDel.setAttribute('onclick', `removeBook(${bookLibrary.indexOf(book)})`);
  newDiv.appendChild(btnEdit);
  newDiv.appendChild(btnDel);
  tableDiv.appendChild(newDiv);
}

function addBook(toggleElementID) {
  if ((!document.getElementById('bTitle').value) || (!document.getElementById('bAuthorLast').value)) {
    alert('Book Title and Author are required!');
    return;
  // TODO clean up this validation, consider adding a working HTML5 form validation 
  }
  let bookToAdd = new book;
  totalBooks = bookLibrary.length;
  bookToAdd['bookID'] = totalBooks + 100;  // this is not used for anything, but may be "later on"
  bookToAdd['title'] = document.getElementById('bTitle').value;
  bookToAdd['authorLast'] = document.getElementById('bAuthorLast').value;
  bookToAdd['authorFirst'] = document.getElementById('bAuthorFirst').value;
  bookToAdd['pages'] = document.getElementById('bPages').value;
  // bookToAdd['haveRead'] = (document.querySelector('.form-check-input').checked).toString();
  bookToAdd['dateRead'] = document.getElementById('bDateRead').value;
  bookToAdd['isbn13'] = document.getElementById('bISBN').value;
  bookToAdd['notes'] = document.getElementById('book-notes').value;
  //console.log(bookToAdd);
  bookLibrary.push(bookToAdd);
  localStorage.setItem('userLibrary', JSON.stringify(bookLibrary));
  addBookDiv(bookToAdd);
  toggleModal(toggleElementID);
}

function removeBook(removeID) {
  bookLibrary.splice(removeID, 1);
  bookLibrary = bookLibrary.filter(function (e) {
    return e != null;
  });
  localStorage.setItem('userLibrary', JSON.stringify(bookLibrary));
  listBooks();
}

function searchBooks() {
  // a function to accept a search term and the type of search, then return an array of matches
  // TO DO
  // alert('Not Yet Implemented.');
  let listArray;
  let searchTerm = document.getElementById('search-term').value;
  console.log(searchTerm);
  if (searchTerm) listArray = bookLibrary.filter( obj => (obj.authorLast.toString() === searchTerm.toString()));
  else listArray = null;
  listBooks(listArray);
}

function listBooks(bookArray) {  
  // use the passed array or bookLibrary (all books) if none/null
  if (bookArray) listBooksArray = bookArray; 
  else listBooksArray = bookLibrary;
  // clear libraryTable element
  if (document.getElementById('libraryTable').firstChild) {
    while (document.getElementById('libraryTable').firstChild) {
      document.getElementById('libraryTable').removeChild(document.getElementById('libraryTable').firstChild);
    }
  }
  // repopulate book list
  if (listBooksArray) listBooksArray.forEach(i => addBookDiv(i));

  /* TABLE code below - replaced with card div view
  if (document.getElementById('libraryTable')) {
    document.getElementById('libraryTable').remove();
  }
  tableTest = buildHtmlTable(bookLibrary);
  tableTest.classList.add('table');
  tableTest.classList.add('table-striped');
  //tableTest.classList.add('sortable');
  tableTest.classList.add('js-sort-table');
  tableDiv = document.getElementById('table-container');
  tableDiv.appendChild(tableTest);
  */
} 

if (document.getElementById('libraryTable')) {
  setEventListeners();
  listBooks();
}




