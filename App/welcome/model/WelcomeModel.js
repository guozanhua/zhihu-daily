var React = require('react-native');

var Model = require('leezq-react-model');

class WelcomeModel extends Model {
    constructor(options) {
        super(options);

        this.API = {
            NEWS_LATEST: 'http://news-at.zhihu.com/api/4/news/latest'
        };
    }

    getLatestNews() {

      return fetch(this.API.NEWS_LATEST)
        .then((response) => response.json());
    }
}

module.exports = WelcomeModel;