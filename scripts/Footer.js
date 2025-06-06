
// When the user scrolls down 20px from the top of the document, show the button
// window.onscroll = function () { scrollFunction() };

export class Footer {

    constructor() {
    }

    static scrollFunction() {
        let topButton = document.getElementById("topBtn");

        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            topButton.style.display = "block";
        } else {
            topButton.style.display = "none";
        }
    }

    // When the user clicks on the button, scroll to the top of the document
    static toTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
}