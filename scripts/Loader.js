
import { AllBooks } from './AllBooks.js';
import { Footer } from './Footer.js';
import { Speaker } from './Speaker.js';
import { AppUtils } from './AppUtils.js';

export class Loader {

  constructor() {
    this.touchStartY = 0;
    this.touchEndY = 0;
  }

  static getInstance() {
    if (!Loader._instance) {
      Loader._instance = new Loader();
    }
    return Loader._instance;
  }

  /**
   * Loads header, sidebar and content dynamically according to the value of window.location.hash.
   */
  static async loadPage() {
    const loader = Loader.getInstance();
    loader.setCurrentArticle()
    try {
      await loader.loadHeader();
      await loader.loadContent();
      if (!AppUtils.isMobile()) {
        await loader.loadPlayer();
      }
    } catch (err) {
      console.error("Error loading a content page:", err);
    }
  }

  /**
   * Shows or hides the articles of the specified category
   */
  static showArticles(category) {
    if (category.length > 0) {
      let pid = 'p-' + category;
      let ulId = 'ul-' + category;
      let p = document.getElementById(pid);
      let ul = document.getElementById(ulId);
      let display = ul.style.display;
      if (display == 'block') {
        ul.style.display = 'none';
        p.textContent = '+ ' + category;
      } else {
        ul.style.display = 'block';
        p.textContent = '- ' + category;
      }
    }
  }

  /**
   * Initializes the header, listeners and the content pages.
   */
  async loadHeader() {

    const pageName = AllBooks.getCurrentArticle().bookId;
    let headerName = 'htmls/book-header.html';
    if (pageName == 'home') {
      headerName = 'htmls/home-header.html';
    }

    const header = document.getElementById("header");
    await fetch(headerName)
      .then(response => response.text())
      .then(data => header.innerHTML = data)
      .catch(error => console.error("Error loading header:", error));

    const desc = document.getElementById('book-desc');
    desc.textContent = AllBooks.findBookDesc(pageName);
  }

  /**
   * Loads the content of the current article
   * @returns 
   */
  async loadContent() {

    const loader = Loader.getInstance();
    const article = AllBooks.findArticle();
    const textUrl = article.textUrl;
    let content = document.getElementById("content");

    try {
      await fetch(textUrl)
        .then(response => response.text())
        .then(data => content.innerHTML = data)
        .catch(error => content.innerHTML = error);
      await loader.buildTableOfContent();
      Footer.toTop();
    } catch (err) {
      await this.loadErrorPage(content, err);
    }
  }

  /**
   * Loads a modal element as a pop-up window for audio player and voice recognization.
   */
  async loadPlayer() {
    const loader = Loader.getInstance();
    const pageName = 'htmls/voice.html';
    let modal = document.getElementById("my-voice");
    try {
      await fetch(pageName)
        .then(response => response.text())
        .then(data => modal.innerHTML = data)
        .catch(error => console.error("Error loading modal:", error));
    } catch (err) {
      await this.loadErrorPage(modal, err);
    }

    // add some event handlers to the modal element
    if (AppUtils.isMobile()) {
      // pretty buggy running this on a mobile device
      // - conflict with device's touchstart and touchend events
      // - highlight unexpected area 
      // - etc.
      // turn it off for mobile devices.
      const selectionHeight = 50; // a user is able to highlight 2-3 lines of texts
      const selectionLength = 100; // a user is able to highlight upto 100 characters
      document.addEventListener('touchstart', (e) => {
        loader.touchStartY = e.touches[0].clientY;
      });

      document.addEventListener('touchend', (e) => {
        loader.touchEndY = e.changedTouches[0].clientY;
        if (Math.abs(loader.touchEndY - loader.touchStartY) < selectionHeight) {
          const selection = window.getSelection();
          const selectedText = selection.toString().trim();
          if (selectedText.length > 0 && selectedText.length < selectionLength) {
            Speaker.sayHighlighted();
          }
        }
      });
    } else {
      // desktop: those event listeners work well.
      document.addEventListener('mouseup', Speaker.sayHighlighted);
      document.addEventListener('keyup', Speaker.sayHighlighted);
    }

    // Close the modal when the user clicks the "x"
    let span = document.getElementById("close-modal");
    span.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Close if clicked outside the modal content
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  /**
   * Loads the pre-defined error page (DOES NOT WORK)
   * @param page 
   * @param {*} error 
   */
  async loadErrorPage(page, error) {
    await fetch('htmls/page404.html')
      .then(response => response.text())
      .then(data => page.innerHTML = data)
      .catch(error => console.error("Error loading 404 error page:", error));
  }

  /**
   * Builds a table of content of the selected category of the current article
   * @returns 
   */
  async buildTableOfContent() {

    // if the article list is aready set for this book, leave it as it is
    let bookIdx = document.getElementById('book-index');

    // turn on/off sidebar accordingly
    let book = AllBooks.getBooks().find(item => item.bookId == AllBooks.getCurrentArticle().bookId);
    let sidebar = document.getElementById('sidebar');
    if (!book || book.bookId == 'home') {
      sidebar.style.display = 'none';
      return;
    }
    sidebar.style.display = 'block';

    let category, categoryTitle, article, p, ul, li, link;
    bookIdx.innerHTML = '';

    // create a book title
    p = document.createElement('p');
    p.id = book.bookId;
    p.textContent = book.title;
    p.className = 'book-title';
    bookIdx.appendChild(p);

    for (let i = 0; i < book.categories.length; i++) {
      // create a P element as the category title
      category = book.categories[i];
      categoryTitle = category.title;
      p = document.createElement('p');
      p.id = 'p-' + categoryTitle;
      p.dataset.name = categoryTitle;
      p.title = 'Click to expand/hide';
      p.className = 'category-title';
      p.textContent = '+ ' + categoryTitle;
      p.onclick = function () { Loader.showArticles(this.dataset.name); };

      // create a UL element and a list of LI elements for the article list
      ul = document.createElement('ul');
      ul.id = 'ul-' + categoryTitle;
      ul.className = 'article-list';
      ul.style.display = (i == 0 ? 'block' : 'none');
      for (let j = 0; j < category.articles.length; j++) {
        article = category.articles[j];
        if (article.selected) {
          link = '<a href="#' + book.bookId + '/' +
            category.categoryId + '/' +
            article.articleId + '">' +
            article.title + '</a>';
          li = document.createElement('li');
          li.innerHTML = link;
          ul.appendChild(li);
        }
      }
      bookIdx.appendChild(p);
      bookIdx.appendChild(ul);
      // console.log(bookIdx.innerHTML);
    }
  }

  /**
   * The URL hash looks like this path#bookId/categoryId/articleId (e.g. #esc6/1/1).
   * Parses the hash to set the current article (CURRENT_ARTICLE)
   * @returns 
   */
  setCurrentArticle() {
    const hash = window.location.hash.replace("#", "") || 'home';
    const names = hash.split('/');
    let currentArticle = AllBooks.getCurrentArticle();
    switch (names.length) {
      case 1:
        currentArticle.bookId = names[0];
        currentArticle.categoryId = currentArticle.articleId = "1";
        currentArticle.articleId = "1";
        break;
      case 2:
        currentArticle.bookId = names[0];
        currentArticle.categoryId = names[1];
        currentArticle.articleId = "1";
        break;
      case 3:
      default:
        currentArticle.bookId = names[0];
        currentArticle.categoryId = names[1];
        currentArticle.articleId = names[2];;
        break;
    }
  }
}

window.Loader = Loader;