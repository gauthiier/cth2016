/*
    file:   person.js
    desc:   simple script that matches incoming arguments (--name) 
            with a simple database
    author: gauthier
    date:   03/11/16
*/

// import 'commander' (https://www.npmjs.com/package/commander)
var program = require('commander');

// database of persons
var person1_name = "James";
var person1_age = 25;
var person1_lan = "english";

var person2_name = "Rita";
var person2_age = 7;
var person2_lan = "danish";

var person3_name = "Geert";
var person3_age = 51;
var person3_lan = "dutch";

// initialise program (aka commander) 
program
  .version('0.1')
  .option('-n, --name [string]', 'Name of the person to match', 'empty') // add option --name with default value "empty"
  .parse(process.argv);

// check what the value of name is regardless of if it matches or not
console.log(program.name); // this line can be commented out

// match value of input's "name" argument
switch(program.name)
{
    case person1_name:
        // input match person1
        console.log(person1_name);  // print name
        console.log(person1_age);   // print age
        console.log(person1_lan);   // print language
        break;
    case person2_name:
        // input match person2
        console.log(person2_name);
        console.log(person2_age);
        console.log(person2_lan);
        break;
    case person3_name:
        // input match person3
        console.log(person3_name);
        console.log(person3_age);
        console.log(person3_lan);
        break;
    default:
        // default message if no match
        console.log('...');
        break;
}

