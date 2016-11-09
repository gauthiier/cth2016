/*
	file: 	bookstore.js
	desc: 	simple script that matches incoming arguments about books 
			(--name) with a simple hardcoded database
	author: gauthier
	date: 	03/11/16
*/

// import 'commander' (https://www.npmjs.com/package/commander)
var program = require('commander');

/*
var book1_title = "Ways of Curating";
var book1_price = 16.95;
var book1_author = "Hans Ulrich Orbist";

var book2_title = "Ardor";
var book2_price = 39.5;
var book2_author = "Roberto Calasso";

var book3_title = "Why Grow Up?";
var book3_price = 15.95;
var book3_author = "Susan Neiman";

etc...

*/

// database of books
var books = [
	{'title': "Ways of Curating",
	 'author': "Hans Ulrich Orbist",
	 'price': 16.95,
	 'kind': "Paperback"
	},
	{'title': "Ardor",
	 'author': "Roberto Calasso",
	 'price': 39.50,
	 'kind': "Hardcover"
	},
	{'title': "Why Grow Up?",
	 'author': "Susan Neiman",
	 'price': 15.95,
	 'kind': "Paperback"
	},
	{'title': "The Complete Stories",
	 'author': "Flannery O'connor",
	 'price': 19.95,
	 'kind': "Paperback"
	},
	{'title': "The Hatred of Poetry",
	 'author': "Ben Lerner",
	 'price': 13.95,
	 'kind': "Paperback"
	}
];

// initialise program (aka commander)
program
  .version('0.1')
  .option('-a, --author [name]', "Book author's name")
  .option('-p, --price [price]', 'Book price')
  .option('-t, --title [name]', 'Book title')
  .option('-k, --kind [kind]', 'Kind of book')
  .option('-m, --max [price]', 'Maximum price for a book')
  .parse(process.argv);

if(program.title) {
	for(let i = 0; i < books.length; i++) {
		if(program.title === books[i].title) {
			print_book(books[i]);
		}
	}
}  
else if(program.author) {
	for(let i = 0; i < books.length; i++) {
		if(program.author === books[i].author) {
			print_book(books[i]);
		}
	}	
}
else if(program.kind) {
	for(let i = 0; i < books.length; i++) {
		if(program.kind === books[i].kind) {
			print_book(books[i]);
		}
	}	
} 
else if(program.max) {
	for(let i = 0; i < books.length; i++) {
		if(books[i].price < program.max) {
			print_book(books[i]);
		}
	}	
} 
else {
	console.log("nothing...");
}


function print_book(book) {
	console.log('- - - - - - - ');
	console.log('Title: ' + book.title);
	console.log('Author: ' + book.author);
	console.log('Price: ' + book.price);
	console.log('Kind: ' + book.kind);
}