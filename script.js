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
	let card = document.createElement("div");
	let cardTitle = document.createElement("h1");
	let cardAuthor = document.createElement("h2");
	let cardPages = document.createElement("h3");
	let removeBtn = document.createElement("button");
	let cardBtnContainer = document.createElement("div");
	let changeReadBtn = document.createElement("button");

	card.classList.add("book-card");
	cardBtnContainer.classList.add("card-btn-container");
	removeBtn.classList.add("in-card-btn");
	changeReadBtn.classList.add("in-card-btn");
	card.setAttribute("id", `${title}`);
	card.appendChild(cardTitle);
	card.appendChild(cardAuthor);
	card.appendChild(cardPages);
	card.appendChild(cardBtnContainer);
	cardBtnContainer.appendChild(removeBtn);
	cardBtnContainer.appendChild(changeReadBtn);

	cardTitle.textContent = `${title}`;
	cardAuthor.textContent = `${author}`;
	cardPages.textContent = `${pages}`;
	if (read) {
		card.style.backgroundColor = "green";
		changeReadBtn.textContent = "Read";
	} else {
		card.style.backgroundColor = "red";
		changeReadBtn.textContent = "Not Read";
	}

	changeReadBtn.classList.add("read-btn");
	changeReadBtn.addEventListener("click", () => {
		if (read) {
			changeReadStatus(title, false);
			read = false;
			card.style.backgroundColor = "red";
			changeReadBtn.textContent = "Not Read";
			console.table(myLibrary);
			saveInLocal();
		} else {
			changeReadStatus(title, true);
			read = true;
			card.style.backgroundColor = "green";
			changeReadBtn.textContent = "Read";
			console.table(myLibrary);
			saveInLocal();
		}
	});

	// Create remove btn & functionalities within the new card

	removeBtn.textContent = "Delete";
	removeBtn.classList.add("remove-btn");
	removeBtn.addEventListener("click", () => {
		cardToRemove = document.getElementById(`${title}`);
		cardToRemove.remove();
		let newLibrary = myLibrary.filter((book) => book.title != `${title}`);
		myLibrary = newLibrary;
		saveInLocal();
	});

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

// Submit pushes new books to myLibrary Array and create & display a new card

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

// Save in local storage function

function saveInLocal() {
	localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}
