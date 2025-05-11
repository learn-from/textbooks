/**
 * This class is for storing a book information collection and provides some static
 * methods to access the collection.
 */
export class AllBooks {

  constructor() {
  }

  // The current article
  static CURRENT_ARTICLE =
    {
      "bookId": "home",
      "categoryId": "1",
      "articleId": "1"
    }

  // The book info collection
  static ALL_BOOKS = Object.freeze(
    {
      "books":
        [
          {
            "bookId": "home",
            "title": "home",
            "image": "images/sites/classroom.jpg",
            "description": "Textbooks Online",
            "categories": [
              {
                "categoryId": "1",
                "title": "home",
                "articles": [
                  {
                    "articleId": "1",
                    "title": "home",
                    "selected": true,
                    "textUrl": "htmls/home.html"
                  }
                ]
              }
            ]
          },
          {
            "bookId": "esc6",
            "title": "轻松学中文(6)",
            "image": "images/sites/esc6-cover.jpg",
            "description": "《轻松学中文》是一套专门为非华裔学生学习汉语编写的国际汉语教材。第六册的内容有学校、课程、学汉语、过年、新科技等跟高中生日常生活紧密相关的话题。另外我们还选了一些不同风格的文章和小故事作为本学年的扩展阅读材料，目的是进一步提高同学们的阅读能力和学习兴趣。",
            "categories": [
              {
                "categoryId": "1",
                "title": "课文",
                "articles": [
                  {
                    "articleId": "1",
                    "title": "学校",
                    "selected": true,
                    "textUrl": "books/esc6/lessons/lesson-01-学校.html"
                  },
                  {
                    "articleId": "2",
                    "title": "课程",
                    "selected": true,
                    "textUrl": "books/esc6/lessons/lesson-02-课程.html"
                  },
                  {
                    "articleId": "3",
                    "title": "学汉语",
                    "selected": true,
                    "textUrl": "books/esc6/lessons/lesson-03-学汉语.html"
                  },
                  {
                    "articleId": "4",
                    "title": "去北京",
                    "selected": false,
                    "textUrl": "books/esc6/lessons/lesson-04-去北京.html"
                  },
                  {
                    "articleId": "5",
                    "title": "游学",
                    "selected": false,
                    "textUrl": "books/esc6/lessons/lesson-05-游学.html"
                  }, {
                    "articleId": "6",
                    "title": "过年",
                    "selected": false,
                    "textUrl": "books/esc6/lessons/lesson-06-过年.html"
                  }, {
                    "articleId": "7",
                    "title": "义卖会",
                    "selected": false,
                    "textUrl": "books/esc6/lessons/lesson-07-义卖会.html"
                  }, {
                    "articleId": "8",
                    "title": "挑战",
                    "selected": false,
                    "textUrl": "books/esc6/lessons/lesson-08-挑战.html"
                  }, {
                    "articleId": "9",
                    "title": "露营",
                    "selected": false,
                    "textUrl": "books/esc6/lessons/lesson-09-露营.html"
                  }, {
                    "articleId": "10",
                    "title": "青年人",
                    "selected": false,
                    "textUrl": "books/esc6/lessons/lesson-10-青年人.html"
                  }, {
                    "articleId": "11",
                    "title": "压力",
                    "selected": false,
                    "textUrl": "books/esc6/lessons/lesson-11-压力.html"
                  }, {
                    "articleId": "12",
                    "title": "烦恼",
                    "selected": false,
                    "textUrl": "books/esc6/lessons/lesson-12-烦恼.html"
                  }, {
                    "articleId": "13",
                    "title": "新科技",
                    "selected": true,
                    "textUrl": "books/esc6/lessons/lesson-13-新科技.html"
                  }, {
                    "articleId": "14",
                    "title": "健康",
                    "selected": false,
                    "textUrl": "books/esc6/lessons/lesson-14-健康.html"
                  }, {
                    "articleId": "15",
                    "title": "环保",
                    "selected": false,
                    "textUrl": "books/esc6/lessons/lesson-15-环保.html"
                  }
                ]
              },
              {
                "categoryId": "2",
                "title": "短文",
                "articles": [
                  {
                    "articleId": "1",
                    "title": "中文强化班",
                    "selected": false,
                    "textUrl": "books/esc6/reading/中文强化班.html"
                  }, {
                    "articleId": "2",
                    "title": "台北",
                    "selected": true,
                    "textUrl": "books/esc6/reading/台北.html"
                  }, {
                    "articleId": "3",
                    "title": "我所了解的西安",
                    "selected": true,
                    "textUrl": "books/esc6/reading/我所了解的西安.html"
                  }, {
                    "articleId": "4",
                    "title": "在北京地球村做义工",
                    "selected": true,
                    "textUrl": "books/esc6/reading/在北京地球村做义工.html"
                  }, {
                    "articleId": "5",
                    "title": "数码教学",
                    "selected": true,
                    "textUrl": "books/esc6/reading/数码教学.html"
                  }, {
                    "articleId": "6",
                    "title": "中国人的饮食变化",
                    "selected": false,
                    "textUrl": "books/esc6/reading/中国人的饮食变化.html"
                  }, {
                    "articleId": "7",
                    "title": "世界地球日",
                    "selected": false,
                    "textUrl": "books/esc6/reading/世界地球日.html"
                  }, {
                    "articleId": "8",
                    "title": "中国人的面条",
                    "selected": true,
                    "textUrl": "books/esc6/reading/中国人的面条.html"
                  }
                ]
              },
              {
                "categoryId": "3",
                "title": "扩展阅读",
                "articles": [
                  {
                    "articleId": "1",
                    "title": "他和她",
                    "selected": true,
                    "textUrl": "books/esc6/additional-reading/他和她.html"
                  }, {
                    "articleId": "2",
                    "title": "余光中诗二首",
                    "selected": true,
                    "textUrl": "books/esc6/additional-reading/余光中诗二首.html"
                  },
                  {
                    "articleId": "3",
                    "title": "大年初一没下雪",
                    "selected": false,
                    "textUrl": "books/esc6/additional-reading/大年初一没下雪.html"
                  }, {
                    "articleId": "4",
                    "title": "小王子",
                    "selected": true,
                    "textUrl": "books/esc6/additional-reading/小王子.html"
                  }, {
                    "articleId": "5",
                    "title": "来了个老外",
                    "selected": true,
                    "textUrl": "books/esc6/additional-reading/来了个老外.html"
                  }, {
                    "articleId": "6",
                    "title": "扒手",
                    "selected": true,
                    "textUrl": "books/esc6/additional-reading/扒手.html"
                  }, {
                    "articleId": "7",
                    "title": "写作文",
                    "selected": false,
                    "textUrl": "books/esc6/additional-reading/作文.html"
                  }, {
                    "articleId": "8",
                    "title": "凯瑟琳·柯美尔",
                    "selected": false,
                    "textUrl": "books/esc6/additional-reading/凯瑟琳·柯美尔.html"
                  }, {
                    "articleId": "9",
                    "title": "父与子",
                    "selected": false,
                    "textUrl": "books/esc6/additional-reading/父与子.html"
                  }, {
                    "articleId": "10",
                    "title": "老兄，我醒着",
                    "selected": true,
                    "textUrl": "books/esc6/additional-reading/老兄，我醒着.html"
                  }, {
                    "articleId": "11",
                    "title": "越界了",
                    "selected": true,
                    "textUrl": "books/esc6/additional-reading/越界了.html"
                  }, {
                    "articleId": "12",
                    "title": "卖火柴的小女孩",
                    "selected": true,
                    "textUrl": "books/esc6/additional-reading/卖火柴的小女孩.html"
                  }
                ]
              },
              {
                "categoryId": "4",
                "title": "小故事",
                "articles": [
                  {
                    "articleId": "1",
                    "title": "粗心大意",
                    "selected": true,
                    "textUrl": "books/esc6/story/粗心大意.html"
                  }, {
                    "articleId": "2",
                    "title": "装腔作势",
                    "selected": true,
                    "textUrl": "books/esc6/story/装腔作势.html"
                  }, {
                    "articleId": "3",
                    "title": "将错就错",
                    "selected": true,
                    "textUrl": "books/esc6/story/将错就错.html"
                  }, {
                    "articleId": "4",
                    "title": "失而复得",
                    "selected": true,
                    "textUrl": "books/esc6/story/失而复得.html"
                  }, {
                    "articleId": "5",
                    "title": "顺其自然",
                    "selected": true,
                    "textUrl": "books/esc6/story/顺其自然.html"
                  }, {
                    "articleId": "6",
                    "title": "温水青蛙",
                    "selected": true,
                    "textUrl": "books/esc6/story/温水青蛙.html"
                  }, {
                    "articleId": "7",
                    "title": "守株待兔",
                    "selected": true,
                    "textUrl": "books/esc6/story/守株待兔.html"
                  }, {
                    "articleId": "8",
                    "title": "画蛇添足",
                    "selected": true,
                    "textUrl": "books/esc6/story/画蛇添足.html"
                  }, {
                    "articleId": "9",
                    "title": "刻舟求剑",
                    "selected": true,
                    "textUrl": "books/esc6/story/刻舟求剑.html"
                  }, {
                    "articleId": "10",
                    "title": "惊弓之鸟",
                    "selected": true,
                    "textUrl": "books/esc6/story/惊弓之鸟.html"
                  }
                ]
              }
            ]
          },
          {
            "bookId": "workshop",
            "title": "阅读与写作",
            "image": "images/sites/independent-study.jpg",
            "description": "今年的《阅读与写作》课主要是帮助同学们提高阅读和写作的能力。这里是一组文章供大家在这个学年阅读。在每篇文章后，有一些帮助理解文章的问题和作业。另外，除了平时作业中有作文外，每个同学还要写一篇较长的作文《我与长城中文学校》作为毕业班同学的毕业作文。",
            "categories": [
              {
                "categoryId": "1",
                "title": "课文",
                "articles": [
                  {
                    "articleId": "1",
                    "title": "天梯",
                    "selected": true,
                    "textUrl": "books/workshop/天梯.html"
                  }, {
                    "articleId": "2",
                    "title": "梦是美丽的",
                    "selected": true,
                    "textUrl": "books/workshop/梦是美丽的.html"
                  },
                  {
                    "articleId": "3",
                    "title": "他和她",
                    "selected": true,
                    "textUrl": "books/workshop/他和她.html"
                  },
                  {
                    "articleId": "4",
                    "title": "来了个老外",
                    "selected": true,
                    "textUrl": "books/workshop/来了个老外.html"
                  },
                  {
                    "articleId": "5",
                    "title": "大年初一没下雪",
                    "selected": true,
                    "textUrl": "books/workshop/大年初一没下雪.html"
                  },
                  {
                    "articleId": "6",
                    "title": "扒手",
                    "selected": true,
                    "textUrl": "books/workshop/扒手.html"
                  },
                  {
                    "articleId": "7",
                    "title": "棉花糖实验",
                    "selected": true,
                    "textUrl": "books/workshop/棉花糖实验.html"
                  },
                  {
                    "articleId": "8",
                    "title": "最后的野骆驼",
                    "selected": true,
                    "textUrl": "books/workshop/最后的野骆驼.html"
                  },
                  {
                    "articleId": "9",
                    "title": "新素食主义来了",
                    "selected": true,
                    "textUrl": "books/workshop/新素食主义来了.html"
                  },
                  {
                    "articleId": "10",
                    "title": "无价的狸狸",
                    "selected": true,
                    "textUrl": "books/workshop/无价的狸狸.html"
                  },
                  {
                    "articleId": "11",
                    "title": "二、三事（节选）",
                    "selected": true,
                    "textUrl": "books/workshop/二、三事.html"
                  },
                  {
                    "articleId": "12",
                    "title": "微博、微信",
                    "selected": true,
                    "textUrl": "books/workshop/微博、微信.html"
                  },
                  {
                    "articleId": "13",
                    "title": "卖火柴的小女孩",
                    "selected": true,
                    "textUrl": "books/workshop/卖火柴的小女孩.html"
                  },
                  {
                    "articleId": "14",
                    "title": "余光中诗二首",
                    "selected": true,
                    "textUrl": "books/workshop/余光中诗二首.html"
                  },
                  {
                    "articleId": "15",
                    "title": "凯瑟琳·柯美尔",
                    "selected": true,
                    "textUrl": "books/workshop/凯瑟琳·柯美尔.html"
                  },
                  {
                    "articleId": "16",
                    "title": "赛车冠军",
                    "selected": true,
                    "textUrl": "books/workshop/赛车冠军.html"
                  },
                  {
                    "articleId": "17",
                    "title": "五味",
                    "selected": true,
                    "textUrl": "books/workshop/五味.html"
                  },
                  {
                    "articleId": "18",
                    "title": "祝你情人节快乐",
                    "selected": true,
                    "textUrl": "books/workshop/祝你情人节快乐.html"
                  },
                  {
                    "articleId": "19",
                    "title": "我与长城中文学校",
                    "selected": true,
                    "textUrl": "books/workshop/我与长城中文学校.html"
                  }
                ]
              }
            ]
          },
          {
            "bookId": "reading",
            "title": "课外阅读",
            "image": "images/sites/reading.jpg",
            "description": "这里是一些程度不同的课外阅读材料，选自国内外不同题材的文章，内容有散文、童话、科幻和中短篇小说等，供教师在教学过程中配合教材使用。",
            "categories": [
              {
                "categoryId": "1",
                "title": "散文",
                "articles": [
                  {
                    "articleId": "1",
                    "title": "他和她",
                    "selected": true,
                    "textUrl": "books/reading/散文/他和她.html"
                  },
                  {
                    "articleId": "2",
                    "title": "爱吹牛的北京男人",
                    "selected": true,
                    "textUrl": "books/reading/散文/爱吹牛的北京男人.html"
                  },
                  {
                    "articleId": "3",
                    "title": "上海人",
                    "selected": true,
                    "textUrl": "books/reading/散文/上海人.html"
                  },
                  {
                    "articleId": "4",
                    "title": "爆竹声声",
                    "selected": true,
                    "textUrl": "books/reading/散文/爆竹声声.html"
                  }
                ]
              },
              {
                "categoryId": "2",
                "title": "侦探",
                "articles": [
                  {
                    "articleId": "1",
                    "title": "扒手",
                    "selected": true,
                    "textUrl": "books/reading/侦探/扒手.html"
                  },
                  {
                    "articleId": "2",
                    "title": "巴斯克维尔的猎犬",
                    "selected": true,
                    "textUrl": "books/reading/侦探/巴斯克维尔的猎犬.html"
                  },
                  {
                    "articleId": "3",
                    "title": "回归记",
                    "selected": true,
                    "textUrl": "books/reading/侦探/回归记.html"
                  },
                  {
                    "articleId": "4",
                    "title": "四签名",
                    "selected": true,
                    "textUrl": "books/reading/侦探/四签名.html"
                  },
                  {
                    "articleId": "5",
                    "title": "ABC谋杀案",
                    "selected": true,
                    "textUrl": "books/reading/侦探/ABC谋杀案.html"
                  },
                  {
                    "articleId": "6",
                    "title": "无人生还",
                    "selected": true,
                    "textUrl": "books/reading/侦探/无人生还.html"
                  },
                  {
                    "articleId": "7",
                    "title": "东方快车谋杀案",
                    "selected": true,
                    "textUrl": "books/reading/侦探/东方快车谋杀案.html"
                  },
                  {
                    "articleId": "8",
                    "title": "罗杰疑案",
                    "selected": true,
                    "textUrl": "books/reading/侦探/罗杰疑案.html"
                  },
                  {
                    "articleId": "9",
                    "title": "沉睡谋杀案",
                    "selected": false,
                    "textUrl": "books/reading/侦探/沉睡谋杀案.html"
                  }
                ]
              },
              {
                "categoryId": "3",
                "title": "童话",
                "articles": [
                  {
                    "articleId": "1",
                    "title": "卖火柴的小女孩",
                    "selected": true,
                    "textUrl": "books/reading/童话/卖火柴的小女孩.html"
                  },
                  {
                    "articleId": "2",
                    "title": "三十六万五千天",
                    "selected": true,
                    "textUrl": "books/reading/童话/三十六万五千天.html"
                  },
                  {
                    "articleId": "3",
                    "title": "皇帝的新装",
                    "selected": true,
                    "textUrl": "books/reading/童话/皇帝的新装.html"
                  },
                  {
                    "articleId": "4",
                    "title": "小王子",
                    "selected": true,
                    "textUrl": "books/reading/童话/小王子.html"
                  }
                ]
              },
              {
                "categoryId": "4",
                "title": "小说",
                "articles": [
                  {
                    "articleId": "1",
                    "title": "竞选州长",
                    "selected": true,
                    "textUrl": "books/reading/小说/竞选州长.html"
                  },
                  {
                    "articleId": "2",
                    "title": "撒哈拉的故事",
                    "selected": true,
                    "textUrl": "books/reading/小说/撒哈拉的故事.html"
                  },
                  {
                    "articleId": "3",
                    "title": "长虫二颤",
                    "selected": true,
                    "textUrl": "books/reading/小说/长虫二颤.html"
                  },
                  {
                    "articleId": "4",
                    "title": "我与地坛",
                    "selected": true,
                    "textUrl": "books/reading/小说/我与地坛.html"
                  }
                ]
              },
              {
                "categoryId": "5",
                "title": "科幻",
                "articles": [
                  {
                    "articleId": "1",
                    "title": "朝闻道",
                    "selected": true,
                    "textUrl": "books/reading/科幻/朝闻道.html"
                  },
                  {
                    "articleId": "2",
                    "title": "北京折叠",
                    "selected": true,
                    "textUrl": "books/reading/科幻/北京折叠.html"
                  }
                ]
              }
            ]
          }
        ]
    })

  /**
   * Gets the current article
   */
  static getBooks() {
    return AllBooks.ALL_BOOKS.books;
  }

  /**
   * Gets the current article
   */
  static getCurrentArticle() {
    return AllBooks.CURRENT_ARTICLE;
  }

  /**
   * Finds the description of the specified book
   */
  static findBookDesc(bookId) {
    let book = AllBooks.ALL_BOOKS.books.find(item => item.bookId == bookId);
    if (book) {
      return book.description;
    }
    return AllBooks.ALL_BOOKS.books[0].description;
  }

  /**
   * Finds an article from the book index, and returns the first article if not found.
   * @returns 
   */
  static findArticle() {
    let category, article;
    let book = AllBooks.ALL_BOOKS.books.find(item => item.bookId == AllBooks.CURRENT_ARTICLE.bookId);
    if (book) {
      category = book.categories.find(item => item.categoryId == AllBooks.CURRENT_ARTICLE.categoryId);
      if (category) {
        article = category.articles.find(item => item.articleId == AllBooks.CURRENT_ARTICLE.articleId);
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

}