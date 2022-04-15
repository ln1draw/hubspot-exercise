import '../styles/index.css';
import '../styles/index.scss';

console.log('App Ready');

var GENRES = {};
var YEARS = {};
var FILTER = { genres: [], years: [], mediaType: '' };
const MEDIADATA = require('./data/data.json').media.sort(alphabeticalByTitle);

window.onload = function() {
	// inefficient!! but, time constraints. small one-time cost.
	MEDIADATA.forEach(item => {
		buildGenreAndYear(item);
	});

	buildFilters();
	buildAllMediaCards();
}

// FUNCTIONS ARE ALPHABETICAL

// only sort-of alphabetical--a better function would handle things like articles (A, The, etc)
function alphabeticalByTitle(a, b) {
	var titleA = a['title'].toUpperCase();
	var titleB = b['title'].toUpperCase();
	return (titleA < titleB) ?  -1 : (titleA > titleB) ? 1 : 0;
}

function buildAllMediaCards() {
	var contentDiv = document.getElementById("media-contents");
	contentDiv.innerHTML = "";

	buildFilteredMedia().forEach(item => {
		contentDiv.appendChild(buildMediaCard(item));
	})
}

// builds the media data block and applies appropriate filters
function buildFilteredMedia() {
	var mediaData = MEDIADATA;

	if (FILTER['mediaType'] !== '') {
		mediaData = mediaData.filter(item => FILTER['mediaType'] === item.type);
	}

	if (FILTER['years'].length > 0) {
		mediaData = mediaData.filter(item => FILTER['years'].indexOf(item.year) > -1);
	}

	if (FILTER['genres'].length > 0) {
		mediaData = mediaData.filter(function(item) {
			var selecteGenre = false;
			item['genre'].forEach(genre => {
				if (FILTER['genres'].indexOf(genre) > -1) {
					selecteGenre = true;
				}
			});
			return selecteGenre;
		});
	}

	return mediaData;
}

// could be DRYer; at this point not worth the time to change
function buildFilters() {
	var movieButton = document.getElementById('media-movie');
	movieButton.addEventListener('change', onFilterChange, false);

	var bookButton = document.getElementById('media-book');
	bookButton.addEventListener('change', onFilterChange, false);

	var genresBox = document.getElementById("genre-box");
	genresBox.style.display = 'none';
	document.getElementById('genre-toggle').addEventListener('click', function(e) {
		var hiding = genresBox.style.display !== 'none';
		if (hiding) {
			genresBox.style.display = 'none';
			e.target.setAttribute('aria-expanded', false);
		} else {
			genresBox.style.display = 'inline-block';
			e.target.setAttribute('aria-expanded', true);
		}
	})

	Object.keys(GENRES).sort().forEach(genre => {
		var inputWrapper = document.createElement('li');
		inputWrapper.className = 'input-wrapper';

		var genreInput = document.createElement('input');
		genreInput.type = 'checkbox';
		genreInput.name = 'genre';
		genreInput.id = genre;
		genreInput.value = genre;
		genreInput.addEventListener('change', onFilterChange, false);

		var genreLabel = document.createElement('label');
		genreLabel.htmlFor = genre;
		genreLabel.innerHTML = genre;
		genreLabel.className = 'uppercase';
		genreLabel.id = genre + '-label';

		inputWrapper.appendChild(genreInput);
		inputWrapper.appendChild(genreLabel);
		genresBox.appendChild(inputWrapper);
	})

	var yearBox = document.getElementById('year-box');
	yearBox.style.display = 'none';

	document.getElementById('year-toggle').addEventListener('click', function(e) {
		var hiding = yearBox.style.display !== 'none';
		if (hiding) {
			yearBox.style.display = 'none';
			e.target.setAttribute('aria-expanded', false);
		} else {
			yearBox.style.display = 'inline-block';
			e.target.setAttribute('aria-expanded', true);
		}
	})

	Object.keys(YEARS).sort().reverse().forEach(year => {
		var inputWrapper = document.createElement('li');
		inputWrapper.className = 'input-wrapper';

		var yearInput = document.createElement('input');
		yearInput.type = 'checkbox';
		yearInput.name = 'year';
		yearInput.id = year;
		yearInput.value = year;
		yearInput.addEventListener('change', onFilterChange, false);

		var yearLabel = document.createElement('label');
		yearLabel.htmlFor = year;
		yearLabel.innerHTML = year;
		yearLabel.className = 'uppercase';

		inputWrapper.appendChild(yearInput);
		inputWrapper.appendChild(yearLabel);
		yearBox.appendChild(inputWrapper);
	})

	var form = document.getElementById("filter-form");

	form.addEventListener("reset", (event) => {
	  event.preventDefault();
	  resetFilters();
	});
}

function buildGenreAndYear(item) {
	item.genre.forEach(item => {
		GENRES[item] = true
	})
	YEARS[item.year] = true
}

function buildMediaCard(itemData) {
	var card = document.createElement('p');
	card.className = 'card';

	var poster = document.createElement('img');
	poster.src = itemData.poster;
	card.appendChild(poster)

	var title = document.createElement('h5');
	title.innerHTML = itemData.title + " (" + itemData.year + ")"
	card.appendChild(title);

	var itemGenres = document.createElement('p');
	itemGenres.innerHTML = 'Genres: ' + itemData.genre.join(', '); // should fix plurals here
	itemGenres.className = 'capitalize'
	card.appendChild(itemGenres);

	return card;
}

function onFilterChange(e) {
	var filterType = e.target.name; // technically unnecessary, but more readable!
	var toggledValue = e.target.value;

	if (filterType === 'genre') {
		var i = FILTER['genres'].indexOf(toggledValue);
		if (i > -1) {
			FILTER['genres'].splice(i, 1);
		} else {
			FILTER['genres'].push(toggledValue)
		}
	}

	if (filterType === 'year') {
		var i = FILTER['years'].indexOf(toggledValue);
		if (i > -1) {
			FILTER['years'].splice(i, 1);
		} else {
			FILTER['years'].push(toggledValue)
		}
	}

	if (filterType === 'media-type') {
		FILTER['mediaType'] = toggledValue;
	}

	// if (filterType === 'some shit')
	
	buildAllMediaCards();

}

function resetOneFilter(itemId) {
	console.log(itemId)
	console.log(document.getElementById(itemId))
	document.getElementById(itemId).checked = false;
}

function resetFilters() {
	if (FILTER['genres'].length > 0) {
		FILTER['genres'].forEach(genre => {
			resetOneFilter(genre);
		});
	}

	if (FILTER['years'].length > 0) {
		FILTER['years'].forEach(year => {
			resetOneFilter(year);
		});
	}

	if (FILTER['mediaType'] !== '') {
		resetOneFilter('media-' + FILTER['mediaType']);
	}

	FILTER = { genres: [], years: [], mediaType: '' };

	buildAllMediaCards();
}