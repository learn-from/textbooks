import { Footer } from './Footer.js';
import { Loader } from './Loader.js';

/**
 * Sets some globally used event listeners.
 */
window.addEventListener("hashchange", Loader.loadPage);
window.addEventListener("DOMContentLoaded", Loader.loadPage);

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { Footer.scrollFunction() };
const footer = document.getElementById('topBtn');
footer.addEventListener('click', Footer.toTop);

// initialze the email agint
(function () {
    emailjs.init({
        publicKey: "54CdPFBDuE0c3HesF",
    });
})();
