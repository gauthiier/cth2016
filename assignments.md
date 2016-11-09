---
title: CTH-2016 / Assignments
---

## Assignment #1

For this assignment you will be developing a command line interface for a fake "bookstore". Using the node library [commander](https://www.npmjs.com/package/commander) you will make available a command line interface to your program which, when executed, will output information of books that match the following criteria: (1) book title, (2) author name, (3) price, and (4) kind (paperback or hardcover).

In order to gather data for your script, select 5 books from either the [Athenaeum Boekhandel](http://www.athenaeum.nl) or the [American Book Center](http://www.abc.nl) and construct a simple "hardcoded" database out of these (see example from the class).

Below are two examples of inputs and outputs where the data was taken from the Athenaeum Boekhandel

```
$ node bookstore.js --author "Hans Ulrich Orbist"

Title: Ways of Curating
Author: Hans Ulrich Orbist
Price: 16.95
Kind: Paperback

```

```
$ node bookstore.js --title "The Hatred of Poetry"

Title: The Hatred of Poetry
Author: Ben Lerner
Price: 13.95
Kind: Paperback
```

### Grading

This assignment will be graded on three aspects: 1) does the code work and execute as intended, 2) is the code clearly structured and documented (don't forget your README!) and 3) is the code efficient.

You will hand in your assignment through your account on Github. Please refer to [CTH-2016 / Assignments Configuration](./assignments-conf.html) on how to set up your assignments portfolio properly. 

The dues date for this assignment is — Tuesday November 8 2016 at 13:00.

## Assignment #2

In this assignment you will write a script that will generate a love letter each time it is executed, producing similar letters, yet not exactly the same, as the ones of computing pioneer Christopher Strachey's. 

The basic sentence structure of your letter will resemble this: "determiner + adjective + noun + adverb + verb + determiner + adjective + noun". Based on this, as an example, your script could output a sentence such as the following: "MY SWEET LONGING BREATHLESSLY ADORES YOUR ANXIOUS WISH". Furthermore, your script should  allow for variations of this sentence structure, that is, exclude (or not) certain components depending on randomness and yet keep the sentence grammatically correct. For example the sentence above could become: "MY SWEET LONGING ADORES YOUR WISH".

The output of your script (what is printed on the terminal) needs to be well formatted, meaning that it needs to resemble a letter with margins and spaces. Moreover, the number of sentences and their width needs to be parametric, that is, your script will have options for both number of sentences and sentence width (in characters). 

As an example (based on Strachey's), below is a generated letter of 80 characters wide and of 5 sentence:

```
$ node letter.js -w 80 -s 5


DEAR DUCK


  YOUR ARE MY ADORABLE YEARNING. MY AMBITION HOLDS DEAR YOUR FOND YEARNING. MY 
  RAPTURE CHERISHES YOUR INFATUATION. YOUR ARE MY KEEN AFFECTION. : MY AVID FANCY. 


																YOURS KEENLY
																M.U.C.

```

Please be creative with your choice of words and sentence composition. As mentioned above, the default theme of the letter is a love one, though you are more than welcome to come up with another theme (Bank letter, Government letter, Birthday letter, etc.) as long as it produces grammatically correct sentences and addresses the reader meaningfully. 

### Grading

This assignment will be graded on three aspects: 1) does the code work and execute as intended, 2) is the code clearly structured and documented (is the output well formatted) and 3) is the code efficient and generative.

You will hand in your assignment through your account on Github (as in week 1). 

The dues date for this assignment is — Tuesday November 15 2016 at 13:00.

### Helpful links

* [Determiners and quantifiers](https://learnenglish.britishcouncil.org/en/english-grammar/determiners-and-quantifiers)
* [Adverbials](https://learnenglish.britishcouncil.org/en/english-grammar/adverbials)
* [(General) English Grammar](https://learnenglish.britishcouncil.org/en/english-grammar)
* [Archive of emulated Christopher Strachey's Love Letters](http://www.alpha60.de/art/love_letters/archive/muc/)






