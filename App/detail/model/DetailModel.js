'use strict';

var React = require('react-native');
var Model = require('leezq-react-model');

class DetailModel extends Model {
  constructor(options) {
    super(options);

    this.API = {
      STORY_DETAIL: 'http://news-at.zhihu.com/api/4/news/' //日报详情
    }
  }

  /**
   * 获取详情页信息
   * @return {[type]} [description]
   */
  getDetailInfo(storyId) {
    console.log(this.API.STORY_DETAIL + storyId);
    return fetch(this.API.STORY_DETAIL + storyId)
            .then((response) => response.json());
  }
}

module.exports = DetailModel;