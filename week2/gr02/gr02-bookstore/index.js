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
*/

var book1 = {
	'title': "Ways of Curating",
	'price': 16.95,
	'author': "Hans Ulrich Orbist"
};

var book2 = {
	'title': "Ardor",
	'price': 39.5,
	'author': "Roberto Calasso"
};

var book3 = {
	'title': "Why Grow Up?",
	'price': 15.95,
	'author': "Susan Neiman"
};

var array_of_books = [
	{ 'title': "Ways of Curating",
	'price': 16.95,
	'author': "Hans Ulrich Orbist"
	}, 
	{ 'title': "Ardor",
	'price': 39.5,
	'author': "Roberto Calasso"
	}, 
	{'title': "Why Grow Up?",
	'price': 15.95,
	'author': "Susan Neiman"
	}
];

function print_the_book(a_book) {
	console.log("----------");
	console.log("Title: " + a_book.title);
	console.log("Price: " + a_book.price);
	console.log("Author: " + a_book.author);
}

// LOOP

for(var i = 0; i < array_of_books.length; i++) {
	print_the_book(array_of_books[i]);
}



//--------------------------------------------

// old code

/*
console.log(array_of_books[0]);
console.log(array_of_books[1]);
console.log(array_of_books[2]);
*/


//console.log(array_of_books.length);

//console.log(book3_price);

//console.log(book3);
