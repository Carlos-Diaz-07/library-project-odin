"use strict";

// Library array

let myLibrary = [
	{
		title: "The Hitchhiker's Guide to the Galaxy",
		author: "Douglas Adams",
		pages: 357,
		read: true,
	},
	{
		title: "The Restaurant at the End of the Universe",
		author: "Douglas Adams",
		pages: 250,
		read: false,
	},
];

//  change read status in myLibrary array

function changeReadStatus(bookTitle, newValue) {
	for (var book in myLibrary) {
		if (myLibrary[book].title === bookTitle) {
			myLibrary[book].read = newValue;
			break;
		}
	}
}

// Create Cards

function createCard(title, author, pages, read) {
	
	//Create all the elements within a card

	let card = document.createElement("div");
	let cardTitle = document.createElement("h1");
	let cardAuthor = document.createElement("h2");
	let cardPages = document.createElement("h3");
	let removeBtn = document.createElement("button");
	let cardBtnContainer = document.createElement("div");
	let changeReadBtn = document.createElement("button");

	//Adding Class to elements

	card.classList.add("book-card");
	cardBtnContainer.classList.add("card-btn-container");
	removeBtn.classList.add("in-card-btn");
	changeReadBtn.classList.add("in-card-btn");
	changeReadBtn.classList.add("read-btn");
	removeBtn.classList.add("remove-btn");

	// Adding ID to elements

	card.setAttribute("id", `${title}`);

	// Append elements to new card

	card.appendChild(cardTitle);
	card.appendChild(cardAuthor);
	card.appendChild(cardPages);
	card.appendChild(cardBtnContainer);
	cardBtnContainer.appendChild(removeBtn);
	cardBtnContainer.appendChild(changeReadBtn);

	// Adding Content to elements

	cardTitle.textContent = `${title}`;
	cardAuthor.textContent = `${author}`;
	cardPages.textContent = `${pages}`;
	removeBtn.textContent = "Delete";

	// Display book card and btn according to read status

	if (read) {
		card.style.backgroundImage = `url('/cover1.jpg')`;
		changeReadBtn.textContent = "Read";
	} else {
		card.style.backgroundImage = `url('/cover2.jpg')`;
		changeReadBtn.textContent = "Not Read";
	}

	// read? button event listener and functionality
	
	changeReadBtn.addEventListener("click", () => {
		if (read) {
			changeReadStatus(title, false);
			read = false;
			card.style.backgroundImage = `url('/cover2.jpg')`;
			changeReadBtn.textContent = "Not Read";
			console.table(myLibrary);
			saveInLocal();
		} else {
			changeReadStatus(title, true);
			read = true;
			card.style.backgroundImage = `url('/cover1.jpg')`;
			changeReadBtn.textContent = "Read";
			console.table(myLibrary);
			saveInLocal();
		}
	});

	// Create remove btn event listener and funtionality

	removeBtn.addEventListener("click", () => {
		let deleteCheck = document.getElementById("delete-check");
		deleteCheck.style.display = "flex";

		let confirm = document.getElementById("delete-check-yes");
		let cancel = document.getElementById("delete-check-no");

		confirm.addEventListener("click", () => {
			let cardToRemove = document.getElementById(`${title}`);
			cardToRemove.remove();
			let newLibrary = myLibrary.filter((book) => book.title != `${title}`);
			myLibrary = newLibrary;
			saveInLocal();
			deleteCheck.style.display = 'none';
		});

		cancel.addEventListener('click', () => {
			deleteCheck.style.display = 'none';
		})
	});

	//Save and display new card

	saveInLocal();
	booksDisplay.appendChild(card);
}

// Display myLibrary

const booksDisplay = document.querySelector("#books-display");

function displayBooks() {
	if (localStorage.getItem("myLibrary")) {
		var savedLibrary = localStorage.getItem("myLibrary");
		myLibrary = JSON.parse(savedLibrary);
	}
	for (var book in myLibrary) {
		let title = myLibrary[book].title;
		let author = myLibrary[book].author;
		let pages = myLibrary[book].pages;
		let read = myLibrary[book].read;
		createCard(title, author, pages, read);
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

// Submit form pushes new books to myLibrary Array and create & display a new card

const myForm = document.getElementById("form");
myForm.addEventListener("submit", (e) => {

	//Prevent default submit-btn behaviour

	e.preventDefault();

	// Is the "read" checkbox checked? => return booleans (True/False)

	let isItRead = () => {
		if (document.querySelector('input[id="read"]').checked) {
			return true;
		} else {
			return false;
		}
	};

	// Grab input values

	let title = document.getElementById("book-title").value;
	let author = document.getElementById("author-name").value;
	let pages = document.getElementById("number-pages").value;
	let read = isItRead();

	// Create book object, save it and reset-hide form

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
	document.getElementById("form").style.display = "inherit";
});

// Save in local storage function

function saveInLocal() {
	localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}
