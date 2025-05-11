import { Footer } from './Footer.js';
import { Loader } from './Loader.js';
import { Speaker } from './Speaker.js';

/**
 * Sets some globally used event listeners.
 */
window.addEventListener("hashchange", Loader.loadPage);
window.addEventListener("DOMContentLoaded", Loader.loadPage);
window.addEventListener('DOMContentLoaded', Speaker.initAudioPlayer);

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { Footer.scrollFunction() };
const footer = document.getElementById('topBtn');
footer.addEventListener('click', Footer.toTop);

// Close menu if user clicks outside
// window.onclick = function (event) {
// 	if (AppUtils.isMobile()) {
// 		if (!event.target.matches('.hamburger')) {
// 			let sidebar = document.getElementById("sidebar");
// 			if (sidebar) {
// 				let isOn = sidebar.style.display = 'block';
// 				sidebar.style.display = (isOn ? 'none' : 'block');
// 			}
// 		}
// 	}
// }