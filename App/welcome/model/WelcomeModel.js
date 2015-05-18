var React = require('react-native');

var Model = require('leezq-react-model');

class WelcomeModel extends Model {
  constructor(options) {
      super(options);

      this.API = {
          NEWS_LATEST: 'http://news-at.zhihu.com/api/4/news/latest', // 首页日报列表
          NEWS_DATE: 'http://news-at.zhihu.com/api/4/news/before/', // 首页日报列表
      };
  }

  /**
   * 获取最新的日报列表
   * @return {[type]} [description]
   */
  getLatestNews() {
    return fetch(this.API.NEWS_LATEST)
            .then((response) => response.json());
  }

  /**
   * 根据日期获取历史新闻数据
   */
  getNewsByDate(date) {
    console.log(this.API.NEWS_DATE + date);
    return fetch(this.API.NEWS_DATE + date)
      .then((response) => response.json());
  }

}

module.exports = WelcomeModel;