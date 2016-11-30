var chance = require('chance').Chance();
var wrap = require('word-wrap');

const Markov = require('markov-strings');

function generate_text(text, nbr_verses, min_score, width_verses) {

	text = text.replace(/(\r\n|\n|\r)/gm," ")
	text = text.match( /[^\.!\?]+[\.!\?]+/g );

	const options = {
	  stateSize: 2, 
	  checker: sentence => {
	    return sentence.endsWith('.');
	  }
	};

	var markov = new Markov(text, options);
	markov.buildCorpusSync();

	var result = '';
	titles = [];

	for(var i = 0; i < nbr_verses; i++) {

		let option_title = {
		  minWords: 2,
		  maxWords: 4,
		  minScore: min_score
		};

		let title = markov.generateSentenceSync(option_title).string;

		if(title in titles) continue;
		titles.push(title);

		let option_verse = {
		  minWords: 2,
		  maxWords: chance.natural({min: 7, max: 25}),
		  minScore: min_score,
		  checker: sentence => {
		    return sentence.endsWith('.');
		  }	  
		};

		let verse = '';
		for(var j = 0; j < chance.natural({min: 3, max: 20}); j++) {
			verse += markov.generateSentenceSync(option_verse).string + ' ';
		}

		result += title.toUpperCase() + '\n\n';
		result += wrap(verse + '\n\n', {width: width_verses});

	}

	return result;	

}

exports.generate_text = generate_text;


