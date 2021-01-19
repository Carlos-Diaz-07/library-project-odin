// Library

let myLibrary = [
	{ title: "Los Marcadores", author: "Carlos Diaz", pages: 357, read: "" },
	{ title: "Los Marcadores 2", author: "Carlos Diaz", pages: 357, read: "" },
	{ title: "Los Marcadores 3", author: "Carlos Diaz", pages: 357, read: "" },
	{ title: "Los Marcadores 4", author: "Carlos Diaz", pages: 357, read: "" },
];

// Display myLibrary

const booksDisplay = document.querySelector("#books-display");

function createCard(title, author, pages) {
	let card = document.createElement("div");
	let cardTitle = document.createElement("h1");
	let cardAuthor = document.createElement("h2");
	let cardPages = document.createElement("h3");
	card.classList.add("book-card");
	card.setAttribute("id", `${title}`);
	card.appendChild(cardTitle);
	card.appendChild(cardAuthor);
	card.appendChild(cardPages);
	cardTitle.textContent = `${title}`;
	cardAuthor.textContent = `${author}`;
	cardPages.textContent = `${pages}`;
	booksDisplay.appendChild(card);
	
}

function displayBooks() {
	for (var book in myLibrary) {
		let title = myLibrary[book].title;
		let author = myLibrary[book].author;
		let pages = myLibrary[book].pages;
		console.log(author);
		createCard(title, author, pages);
	}
}

displayBooks();

// Book constructor

function book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.info = function () {
		return title + " by " + author + ", " + pages + " pages, " + read;
	};
}

// Push new submitted books to myLibrary Array

const myForm = document.getElementById("form");
myForm.addEventListener("submit", (e) => {
	e.preventDefault();
	let title = document.getElementById("book-title").value;
	let author = document.getElementById("author-name").value;
	let pages = document.getElementById("number-pages").value;
	let read = document.getElementById("read").value;
	let newBook = new book(title, author, pages, read);
	myLibrary.push(newBook);
	myForm.reset();
	createCard(title, author, pages);
	console.table(myLibrary);
	console.log("submitted!!!!");
});
