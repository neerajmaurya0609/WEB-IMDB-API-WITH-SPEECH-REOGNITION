//API stands for Application Programming Interface.
// An API is a software intermediary that allows two
// applications to talk to each other.In other words,
// an API is the messenger that delivers your request
// to the provider that you're requesting it from and
// then delivers the response back to you.

//A RESTful API is an application program interface
// (API) that uses HTTP requests to GET, PUT, POST and
// DELETE data. ...REST technology is generally preferred
// over the more robust Simple Object Access Protocol(SOAP(simple object access protocol))
// technology because REST uses less bandwidth, making it
// more suitable for efficient internet usage.

//methods to fetch data from sever
//axios //window.fetch //ajax call

//it is bulitin method within window object
//The Fetch API provides a fetch() method defined on
// the window object, which you can use to perform
// requests.This method returns a Promise that you can
// use to retrieve the response of the request.
// The fetch method only has one mandatory argument,
// which is the URL of the resource you wish to fetch.

//Axios is a Promise-based HTTP client for JavaScript
// which can be used in your front - end application and
// in your Node.js backend. ...The Axios library can be
// used in your plain JavaScript application or can be
// used together with more advanced frameworks like
// Vue.js.

//An Ajax call is an asynchronous request initiated by
// the browser that does not directly result in a page
// transition.A servlet request is a Java - specifc
// term(servlets are a Java specification) for servicing
// an HTTP request that could get a simple GET or
// POST(etc) or an Ajax request.

//....................................................

//IMDB SERVER DATA FETCHING

let search = document.querySelector('#search');

search.addEventListener('keyup', e => {
	//console.log(e.target.value);
	let searchText = e.target.value;
	SearchMovies(searchText);
	//when key press hide from text and h1
	let formText = document.getElementById('divBlock');
	formText.style.display = 'none';
	search.classList.add('afterkeyPress');
	document.querySelector('#formBlock').classList.add('afterkey_formBlock');
});
//speech Recognition api
let speechSearch = document.getElementById('speechIcon');
speechSearch.addEventListener('click', e => {
	let formText = document.getElementById('divBlock');
	formText.style.display = 'none';
	search.classList.add('afterkeyPress');
	document.querySelector('#formBlock').classList.add('afterkey_formBlock');
	
	window.SpeechRecognition =
		window.SpeechRecognition || window.webkitSpeechRecognition;
	let recognition = new SpeechRecognition();
	let p = document.createElement('p');
	recognition.interimResults = true;

	recognition.addEventListener('result', (e) => {
		let transcript = [...e.results]
			.map(result => result[0])
			.map(result => result.transcript)
			.join();		
		search.value = transcript;
		if (e.results[0].isFinal) {
			p = document.createElement("p");
			p.innerHTML = transcript;
			let searchText = transcript;
			SearchMovies(searchText);
		}
	});
	recognition.start();
});
function SearchMovies(searchText) {
	let imdbAPi = `http://www.omdbapi.com/?s=${searchText}&apikey=193a69c9`;
	window
		.fetch(imdbAPi)
		.then(data => {
			data
				.json()
				.then(movie => {
					let movies = movie.Search;
					let output = [];
					for (let m of movies) {
						m.Poster === "N/A" ? "NO MOVIE" : m.Poster;
						output += `
						<div>
						<img src="${m.Poster}" />
						<h1>${m.Title}</h1>
						<p>${m.Year}</p>
						<a href = "http://www.omdbapi.com/?s=${m.id}&apikey=193a69c9">Movie detail</a>
						</div>
                        `;
						document.getElementById('template').innerHTML = output;
					}
				})
				.catch(err => console.log(err));
		})
		.catch(err => console.log(err));
}
