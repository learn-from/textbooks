
window.addEventListener("hashchange", loadPage);
window.addEventListener("load", loadPage);

async function loadPage() {

  setCurrentArticle();
  buildSidebar();

  try {
    await initHeader();
    await loadContent();
  } catch (err) {
    // app.innerHTML = "<h2>404 - Page Not Found</h2>";
  }
}

/**
 * Loads the content of the current article
 * @returns 
 */
async function loadContent() {
  let article = findArticle();
  let textUrl = article.textUrl;
  let content = document.getElementById("content");
  try {
    await fetch(textUrl)
      .then(response => response.text())
      .then(data => content.innerHTML = data)
      .catch(error => console.error("Error loading header:", error));
  } catch (err) {
    // TODO load an error message page. 
  }
}

function findArticle() {
  let category, article;
  let book = ALL_BOOKS.books.find(item => item.bookId == CURRENT_ARTICLE.bookId);
  if (book) {
    category = book.categories.find(item => item.categoryId == CURRENT_ARTICLE.categoryId);
    if (category) {
      article = category.articles.find(item => item.articleId == CURRENT_ARTICLE.articleId);
      if (!article) {
        article = category.articles[0];
      }
    } else {
      category = book.categories[0];
      article = category.articles[0];
    }
  }
  return article;
}

/**
 * Builds a table of content of the selected category of the current article
 * @returns 
 */
function buildSidebar() {
  let book = ALL_BOOKS.books.find(item => item.bookId == CURRENT_ARTICLE.bookId);
  let sidebar = document.getElementById('sidebar');
  if (!book || book.bookId == 'home') {
    sidebar.style.display = 'none';
    return;
  } else {
    sidebar.style.display = 'block';
  }

  let category, categoryTitle, article, p, ul, li, link;
  let bookIdx = document.getElementById('book-index');
  bookIdx.innerHTML = '';

  // create a book title
  p = document.createElement('p');
  p.className = 'category-title';
  p.textContent = book.title;
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
    p.onclick = function () { showArticles(this.dataset.name); };

    // create a UL element and a list of LI elements for the article list
    ul = document.createElement('ul');
    ul.id = 'ul-' + categoryTitle;
    ul.className = 'article-list';
    ul.style.display = (i == 0 ? 'block' : 'none');
    for (let j = 0; j < category.articles.length; j++) {
      article = category.articles[j];
      link = '<a href="#' + book.bookId + '/' +
        category.categoryId + '/' +
        article.articleId + '">' +
        article.title + '</a>';
      li = document.createElement('li');
      li.innerHTML = link;
      ul.appendChild(li);
    }
    bookIdx.appendChild(p);
    bookIdx.appendChild(ul);
    // console.log(bookIdx.innerHTML);
  }
}


/**
 * Shows or hides the posts for the specified lable
 */
function showArticles(category) {
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
 * The URL hash could be like this path#bookId/categoryId/articleId (#esc6/1/1).
 * Parses the hash to set the current article (CURRENT_ARTICLE)
 * @returns 
 */
function setCurrentArticle() {
  let hash = window.location.hash.replace("#", "") || 'home';
  let names = hash.split('/');
  switch (names.length) {
    case 1:
      CURRENT_ARTICLE.bookId = names[0];
      CURRENT_ARTICLE.categoryId = CURRENT_ARTICLE.articleId = "1";
      break;
    case 2:
      CURRENT_ARTICLE.bookId = names[0];
      CURRENT_ARTICLE.categoryId = names[1];
      CURRENT_ARTICLE.articleId = "1";
      break;
    case 3:
    default:
      CURRENT_ARTICLE.bookId = names[0];
      CURRENT_ARTICLE.categoryId = names[1];
      CURRENT_ARTICLE.articleId = names[2];;
      break;
  }
}