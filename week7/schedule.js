/*
    file:   schedule.js
    desc:   simple script that produces a randomized presentation schedule
    author: gauthier
    date:   14/12/16
*/

// import 'commander' (https://www.npmjs.com/package/commander)
var program = require('commander');

// import chance (http://chancejs.com)
var chance = require('chance').Chance(); // npm install --save chance

// initialise program (aka commander) 
program
  .version('0.1')
  .option('-g, --group [string]', 'Group to schedule', 'empty')
  .parse(process.argv);


var groups = [

	[
		"Rahul & Randy",
		"Inés & John",
		"Cecilie & Joanna",
		"Eva & Nicole",
		"Lenka, Vivien and Laura",
	],
	[
		"Julia & Johanna",
		"Martin & Bram",
		"Wietske, Dave & Judith",
		"Annabel & Maxim",
		"Cassandra & Léna"
	]
];

function choice(array) {
	var index = chance.natural({'min': 0, 'max': array.length - 1});  // **** NOTE: 'max': array.length - 1
	return array[index];
}

function schedule(array) {
	var i = 1;
	while(array.length > 0) {
		var c = choice(array);
		console.log('	' + i++ + '. ' + c);
		array.splice(array.indexOf(c),1);

	}
}

console.log('\n\n\n\n');
switch(program.group)
{
	case '01':
		console.log('Final presentation CTH-2016 Group 01\n');
		schedule(groups[0]);
		break;
	case '02':
		console.log('Final presentation CTH-2016 Group 02\n');
		schedule(groups[1]);
		break;
	default:
		'Nothing...';
}
console.log('\n\n\n\n');


