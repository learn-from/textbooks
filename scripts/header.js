
// document.addEventListener('DOMContentLoaded', initHeader);

/**
 * Checks the device is a mobile device (iPhone or Android phone)
 */
function isMobile() {
	let userAgent = navigator.userAgent.toLowerCase();
	let isTouch = 'ontouchstart' in window;
	let width = window.innerWidth;

	let isMobile = ((/iphone|ipad|ipod/.test(userAgent)
		|| /android/.test(userAgent)
		|| isTouch && width <= 768
		|| isTouch && width > 768)) && (!isIpadPro());
	console.log(userAgent, 'isTouch:', isTouch, 'width:', width, 'isMobile:', isMobile);
	return isMobile;
}

/**
 * Initializes the header, listeners and the content pages.
 */
async function initHeader() {

	let pageName = CURRENT_ARTICLE.bookId;
	let headerName = 'htmls/book-header.html';
	if (pageName == 'home') {
		headerName = 'htmls/home-header.html';
	}

	let header = document.getElementById("header");
	await fetch(headerName)
		.then(response => response.text())
		.then(data => header.innerHTML = data)
		.catch(error => console.error("Error loading header:", error));

	let desc = document.getElementById('book-desc');
	desc.textContent = findBookDesc(pageName);
}

/**
 * Finds the description of the specified book
 */
function findBookDesc(bookId) {
	let book = ALL_BOOKS.books.find(item => item.bookId == bookId);
	if (book) {
		return book.description;
	}
	return ALL_BOOKS.books[0].description;
}
