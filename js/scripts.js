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
// TEMP - clear local and session Storage 
window.localStorage.clear();
window.localStorage.removeItem('userLibrary');
sessionStorage.clear();

// initilize library with some test/sample books
let libInit;
libInit = `[{"Book ID":100,"Title":"The Hobbit","Author":"J.R.R. Tolkien","Pages":310,"Have Read":"false","Date Read":"0000/00/00", "ISBN 13": 9780044403371},
            {"Book ID":101,"Title":"A Game of Thrones","Author":"George R.R. Martin","Pages":694,"Have Read":"true","Date Read":"2016/10/01", "ISBN 13": 9780553573404}
            ]`

// let userFile = "./data/library.json"; // not used yet

// TODO update user library data structure to resemble map (or object) -> (k, v)=(authorName, authorBookArray)

let bookLibrary = JSON.parse(localStorage.getItem('userLibrary'));
let totalBooks; 
if (libInit) {
  bookLibrary = JSON.parse(libInit);
}

// init localStorage 'userLibrary' if it does not exist
if (localStorage.getItem('userLibrary') === null) {
  localStorage.setItem('userLibrary', JSON.stringify(bookLibrary));
}

// class userLibrary {
//  constructor (){
//    this. = ;
//  }
//}


// Book object - converted to class per TOP classes exercise
class book {
  constructor(bookID, title, author, pages, haveRead, dateRead) {
    this['Book ID'] = bookID;
    this['Title'] = title;
    this['Author'] = author;
    this['Pages'] = pages;
    this['Have Read'] = haveRead;
    this['Date Read'] = dateRead;
    //this.info = () => { // NOT USED
    //  return (title + ' by ' + author + ', ' + pages + ' pages' + ', Read: ' + haveRead);
  }
}

function toggleModal(elementID) {
  let toggleElement = document.getElementById(elementID);
  if (toggleElement.classList.contains('visible')) toggleElement.classList.remove('visible');
  else toggleElement.classList.add('visible');
}

// for table creation 
let tableTest;
let tableDiv;
let _table = document.createElement('table');
let _tr = document.createElement('tr');
let _th = document.createElement('th');
let _td = document.createElement('td');
const checkbox = document.createElement('input');
checkbox.type = 'checkbox';

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
  btnDel.innerText = 'Delete';
  btnDel.setAttribute('class', 'btn btn-outline-danger');
  newDiv.setAttribute('id', bookLibrary[book]['Book ID']);
  newDiv.setAttribute('class', 'card-div');

  if (bookLibrary[book]['Have Read'] == 'true') {
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
    if (bookLibrary[book]['Have Read'] == 'true') {
      bookLibrary[book]['Have Read'] = 'false';
      btnEdit.classList.remove('btn-outline-success');
      btnEdit.classList.add('btn-outline-secondary');
    } 
    else {
      bookLibrary[book]['Have Read'] == 'false';
      bookLibrary[book]['Have Read'] = 'true';
      btnEdit.classList.remove('btn-outline-secondary');
      btnEdit.classList.add('btn-outline-success');
    }
  }, false);
  // grab a cover graphic from https://openlibrary.org/dev/docs/api/covers using ISBN 13 and S, M, L image size
  const coverURL = `http://covers.openlibrary.org/b/ISBN/${bookLibrary[book]['ISBN 13']}-S.jpg`
  newDiv.innerHTML = `<p> <img src=${coverURL} </p>` +
                    //'<p>Book ID: ' + bookLibrary[i]['Book ID'] + '</p>' +
                    '<p>' + bookLibrary[book]['Title'] + '<br> by ' +
                    bookLibrary[book]['Author'] + '</p>' +
                    bookLibrary[book]['Pages'] + ' Pages</p>' +
                    '<p>ISBN 13: ' + bookLibrary[book]['ISBN 13'] + '</p>' +
                    '<p>Date Read: ' + bookLibrary[book]['Date Read'] + '</p>';
  // btnRead.setAttribute('data-bookID', bookLibrary[i]['Book ID']); // for later editing
  // btnDel.setAttribute('data-bookID', bookLibrary[i]['Book ID']);
  // add event listener for Delete
  btnDel.setAttribute('onclick', `removeBook(bookLibrary[${book}])`);
  // append the buttons for Read/Not Read status and Delete
  newDiv.appendChild(btnEdit);
  newDiv.appendChild(btnDel);
  // append the new book div for display
  tableDiv.appendChild(newDiv);
}

function addBook(toggleID) {
  if ((!document.getElementById('bTitle').value) || (!document.getElementById('bAuthor').value)) {
    alert('Book Title and Author are required!');
    return;
    // TODO clean up this validation, add working HTML5 form validation 
  }
  let addBook = new book;
  totalBooks = bookLibrary.length;
  addBook['Book ID'] = totalBooks + 100;  // this is not used for anything, but may be "later on"
  addBook['Title'] = document.getElementById('bTitle').value;
  addBook['Author'] = document.getElementById('bAuthor').value;
  addBook['Pages'] = document.getElementById('bPages').value;
  addBook['Have Read'] = (document.querySelector('.form-check-input').checked).toString();
  addBook['Date Read'] = document.getElementById('bDateRead').value;
  addBook['ISBN 13'] = document.getElementById('bISBN').value;
  bookLibrary.push(addBook);
  localStorage.setItem('userLibrary', JSON.stringify(bookLibrary));
  addBookDiv(totalBooks);
  toggleModal(toggleID);
}

function removeBook(removeID) {
  console.log(removeID);
  bookLibrary.splice(bookLibrary.indexOf(removeID), 1);
  bookLibrary = bookLibrary.filter(function (e) {
    return e != null;
  });
  localStorage.setItem('userLibrary', JSON.stringify(bookLibrary));
  listBooks();
}

function searchBooks() {
  // a function to accept a search term and the type of search, then return an array of matches
  // TO DO
  alert('Not Yet Implemented.');
  // listBooks();
}

function listBooks(authorName, authorBookArray) {  
  // TODO update user library data structure to resemble map (or object) -> (k, v)=(authorName, authorBookArray)
  if (document.getElementById('libraryTable').firstChild) {
    while (document.getElementById('libraryTable').firstChild) {
      document.getElementById('libraryTable').removeChild(document.getElementById('libraryTable').firstChild);
    }
  }
  for (let i = 0; i < bookLibrary.length; i++) {
    addBookDiv(i);
  }

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
  listBooks();
}




