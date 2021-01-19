// Library

let myLibrary = [
	{ title: "Los Marcadores", author: "Carlos Diaz", pages: 357, read: true },
	{ title: "Los Marcadores 2", author: "Carlos Diaz", pages: 357, read: false },
	{ title: "Los Marcadores 3", author: "Carlos Diaz", pages: 357, read: false },
	{ title: "Los Marcadores 4", author: "Carlos Diaz", pages: 357, read: false },
];

// Create Cards

function createCard(title, author, pages, read) {
	let card = document.createElement("div");
	let cardTitle = document.createElement("h1");
	let cardAuthor = document.createElement("h2");
	let cardPages = document.createElement("h3");
	let removeBtn = document.createElement("button");
	let changeRead = document.createElement("button");

	card.classList.add("book-card");
	card.setAttribute("id", `${title}`);
	card.appendChild(cardTitle);
	card.appendChild(cardAuthor);
	card.appendChild(cardPages);
	card.appendChild(removeBtn);
	card.appendChild(changeRead);
	cardTitle.textContent = `${title}`;
	cardAuthor.textContent = `${author}`;
	cardPages.textContent = `${pages}`;

	// Create remove btn & functionalities within the new card

	removeBtn.textContent = "Delete";
	removeBtn.classList.add("remove-btn");
	removeBtn.addEventListener("click", () => {
		cardToRemove = document.getElementById(`${title}`);
		cardToRemove.remove();
		let newLibrary = myLibrary.filter((book) => book.title != `${title}`);
		myLibrary = newLibrary;
	});

	// Create a button to change read status at any time within the new card

	
	// changeRead.classList.add("read-btn");
	// changeRead.addEventListener("click", () => {
	// 	if (read === true) {
	// 		changeRead.textContent = "Read";
	// 	} else {

	// 	}
	// });

	booksDisplay.appendChild(card);
}

// Display myLibrary

const booksDisplay = document.querySelector("#books-display");

function displayBooks() {
	for (var book in myLibrary) {
		let title = myLibrary[book].title;
		let author = myLibrary[book].author;
		let pages = myLibrary[book].pages;
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

// Submit pushes new books to myLibrary Array and create and display a card

const myForm = document.getElementById("form");
myForm.addEventListener("submit", (e) => {
	e.preventDefault();
	let title = document.getElementById("book-title").value;
	let author = document.getElementById("author-name").value;
	let pages = document.getElementById("number-pages").value;
	let read = document.getElementById("read").checked;
	let newBook = new book(title, author, pages, read);
	myLibrary.push(newBook);
	myForm.reset();
	createCard(title, author, pages, read);
	document.getElementById("form").style.display = "none";
	addBtn.style.display = "unset";
	console.table(myLibrary);
});

// Add book button

const addBtn = document.querySelector("#add-btn");

addBtn.addEventListener("click", () => {
	addBtn.style.display = "none";
	document.getElementById("form").style.display = "unset";
});
