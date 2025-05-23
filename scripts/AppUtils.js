import { AllBooks } from './AllBooks.js';

export class AppUtils {

  constructor() {
  }

  /**
  * Checks the device is a mobile device (iPhone or Android phone)
  */
  static isMobile() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isTouch = 'ontouchstart' in window;
    const width = window.innerWidth;

    let isMobile = ((/iphone|ipad|ipod/.test(userAgent)
      || /android/.test(userAgent)
      || isTouch && width <= 768
      || isTouch && width > 768)) && (!AppUtils.isIpadPro());
    console.log(userAgent, 'isTouch:', isTouch, 'width:', width, 'isMobile:', isMobile);
    return isMobile;
  }

  static isIpadPro() {
    const width = window.screen.width;
    const height = window.screen.height;
    const pixelRatio = window.devicePixelRatio;

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
    const article = AllBooks.getCurrentArticle();
    const hash = '#' + bookId + '/' + article.categoryId + '/' + article.articleId;
    return hash;
  }

  /**
   * Sends an email using EmailJS service.
   * @param {*} message 
   */
  static sendEmail(message) {
    if (AppUtils.isMobile()) {
      //   const serviceId = 'service_uqlw5qk';
      //   const templateId = "template_9x150b6";
      //   const from = 'Textbook';
      //   const replyTo = "c9@greatwallchineseacademy.org";

      //   emailjs.send(serviceId, templateId, {
      //     from_name: from,
      //     message: message,
      //     reply_to: replyTo
      //   })
      //     .then(function (response) {
      //       console.log("Sent an email!", response.status, response.text);
      //     }, function (error) {
      //       console.error("Failed sending an email", error);
      //     });
    }
  }
}