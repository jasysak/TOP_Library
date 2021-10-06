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
libInit = ` [{"Book ID":100,"Title":"The Hobbit","Author":"J.R.R. Tolkien","Pages":310,"Have Read":"false","Date Read":"0000/00/00", "ISBN 13": 9780044403371},
            {"Book ID":101,"Title":"A Game of Thrones","Author":"George R.R. Martin","Pages":694,"Have Read":"true","Date Read":"2016/10/01", "ISBN 13": 9780553573404}
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

let totalBooks; 

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

// for Bootstrap popover functionality NOT USED
//var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
//var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
//  return new bootstrap.Popover(popoverTriggerEl)
//});

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
  console.log(table);
  return columnSet;
}

 // below courtesy of https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
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

 function addBookDiv(i) {
  tableDiv = document.getElementById('libraryTable');
  let newDiv = document.createElement('div'); 
  let btnRead = document.createElement('button');
  let btnDel = document.createElement('button');
  btnDel.innerText = 'Delete';
  btnDel.setAttribute('class', 'btn btn-outline-danger');
  let dateRead; // local only
  newDiv.setAttribute('id', bookLibrary[i]['Book ID']);
  newDiv.setAttribute('class', 'card-div');
  if (bookLibrary[i]['Have Read'] == 'true') {
    btnRead.innerText = 'Read';
    dateRead = bookLibrary[i]['dateRead'];
    btnRead.setAttribute('class', 'btn btn-outline-success');
    btnRead.setAttribute('data-text-original', 'Read');
    btnRead.setAttribute('data-text-swap', 'Not Read');
  }
  else {
    btnRead.innerText = 'Not Read';
    dateRead = bookLibrary[i]['0000/00/00'];
    btnRead.setAttribute('class', 'btn btn-outline-secondary');
    btnRead.setAttribute('data-text-swap', 'Read');
  }
  // add an event listener to toggle read status and read status button (i.e. toggle)
  btnRead.addEventListener('click', function() {
    if (btnRead.getAttribute('data-text-swap') == btnRead.innerHTML) {
      btnRead.innerHTML = btnRead.getAttribute('data-text-original');

    } else {
      btnRead.setAttribute('data-text-original', btnRead.innerHTML);
      btnRead.innerHTML = btnRead.getAttribute('data-text-swap');
    }
    // toggle Have Read in bookLibrary[] NOT WORKING
    if (bookLibrary[i]['Have Read'] == 'true') {
      bookLibrary[i]['Have Read'] = 'false';
      btnRead.classList.remove('btn-outline-success');
      btnRead.classList.add('btn-outline-secondary');
    } 
    else {
      bookLibrary[i]['Have Read'] == 'true';
      btnRead.classList.remove('btn-outline-secondary');
      btnRead.classList.add('btn-outline-success');
    }
    console.log(bookLibrary[i]['Have Read'])
  }, false);
  // grab a cover graphic from https://openlibrary.org/dev/docs/api/covers
  const coverURL = `http://covers.openlibrary.org/b/ISBN/${bookLibrary[i]['ISBN 13']}-S.jpg`
  newDiv.innerHTML = `<p> <img src=${coverURL} </p>` +
                    //'<p>Book ID: ' + bookLibrary[i]['Book ID'] + '</p>' +
                    '<p>' + bookLibrary[i]['Title'] + '<br> by ' +
                    bookLibrary[i]['Author'] + '</p>' +
                    bookLibrary[i]['Pages'] + ' Pages</p>' +
                    '<p>ISBN 13: ' + bookLibrary[i]['ISBN 13'] + '</p>' +
                    '<p>Date Read: ' + bookLibrary[i]['Date Read'] + '</p>';
  btnRead.setAttribute('data-bookID', bookLibrary[i]['Book ID']); // for later editing

  btnDel.setAttribute('data-bookID', bookLibrary[i]['Book ID']);
  btnDel.setAttribute('onclick', `removeBook(bookLibrary[${i}])`);
  // add buttons for Read/Not Read status and Delete
  newDiv.appendChild(btnRead);
  newDiv.appendChild(btnDel);
  // add the new book div
  tableDiv.appendChild(newDiv);
}

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
  _addBook['ISBN 13'] = document.getElementById('bISBN').value;
  // TEST OK console.log("_addBook = " + _addBook.pages);
  bookLibrary.push(_addBook);
  addBookDiv(totalBooks);
  totalBooks = bookLibrary.length;  // should increment by 1
  //listBooks();
}

function removeBook(removeID) {
  // TEST OK console.log(removeID);
  bookLibrary.splice(bookLibrary.indexOf(removeID), 1);
  bookLibrary = bookLibrary.filter(function (e) {
    return e != null;
  });
  listBooks();
}

function findBooks() {
  // a function to accept a search term and the type of search, then return an array of matches
  // TO DO
  alert('Not Yet Implemented.');
  listBooks();
}

function listBooks() {
  // this function is written to dump the entire array as div's.
  // for listing a sub-set (i.e. keyword search) it will need re-working
  // the following if block checks if child div's exist and if they do
  // (i.e. library has been displayed) it will clear them all and recreate
  // this is not particularly efficient and only works in this case -> refactoring needed!!!
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

function displayDash() {
  //to display and update a user dashboard/landing page

}

if (document.getElementById('libraryTable')) {
  listBooks();
}
//console.log(bookLibrary);



