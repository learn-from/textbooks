import { AllBooks } from './AllBooks.js';

export class AppUtils {

  constructor() {
  }

  /**
  * Checks the device is a mobile device (iPhone or Android phone)
  */
  static isMobile() {
    let userAgent = navigator.userAgent.toLowerCase();
    let isTouch = 'ontouchstart' in window;
    let width = window.innerWidth;

    let isMobile = ((/iphone|ipad|ipod/.test(userAgent)
      || /android/.test(userAgent)
      || isTouch && width <= 768
      || isTouch && width > 768)) && (!AppUtils.isIpadPro());
    console.log(userAgent, 'isTouch:', isTouch, 'width:', width, 'isMobile:', isMobile);
    return isMobile;
  }

  static isIpadPro() {
    let width = window.screen.width;
    let height = window.screen.height;
    let pixelRatio = window.devicePixelRatio;

    // 12.9" iPad Pro
    // 11" iPad Pro
    return (width == 1024 && height == 1366 && pixelRatio == 2) ||
      (width == 834 && height == 1194 && pixelRatio == 2);
  }

  /**
  * Sets the window.location.hash to trigger reloading a page
  */
  static setWindowHash(hash) {
    window.location.hash = hash;
  }

  /**
   * Builds a book specific window.location.hash to repload a book page
   * The full window.location.hash looks like this #book/category/article
   * @returns
   */
  static buildHash(bookId) {
    let article = AllBooks.getCurrentArticle();
    let hash = '#' + bookId + '/' + article.categoryId + '/' + article.articleId;
    return hash;
  }
}