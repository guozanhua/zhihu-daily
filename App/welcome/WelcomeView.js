'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableHighlight,
  SliderIOS,
} = React;

var styles = require('./style/welcome.css');

var WelcomeModel = require('./model/WelcomeModel');
var Swiper = require('react-native-swiper');
var welcomeModel = new WelcomeModel({
  initialState: {
    index: 0
  }
});


var DetailView = require('../detail/DetailView');


var WelcomeView = React.createClass({

  getInitialState: function() {

    return {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      topStories: [],
      stories: [],
      date: this.getDateFormat(new Date()),
    };
  },

  getDateFormat: function(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
    var day = date.getDate();

    return '' + year + month + day;
  },

  componentWillMount: function () {
    welcomeModel.getLatestNews()
        .then((responseData) => {
          this.state.stories = this.state.stories.concat(responseData.stories);
          this.setState({
            stories: this.state.stories,
            dataSource: this.state.dataSource.cloneWithRows(this.state.stories),
            topStories: responseData.top_stories,
          });
        })
        .done();
  },

  render: function() {
    if (this.state.topStories.length <= 0) {
      return null;
    };

    return (
      <ListView
        dataSource={this.state.dataSource}
        pageSize={10}
        onEndReached={this.endReached}
        onEndReachedThreshold={100}
        renderHeader={this.renderHeader}
        renderRow={this.renderRow} />
    );
  },

  renderHeader: function() {
    var topStories = this.state.topStories;
    return (
        <Swiper style={styles.wrapper} 
          height={220}
          dot={<View style={styles.dot} />}
          activeDot={<View style={styles.activeDot} />}
          paginationStyle={styles.pagination} 
          loop={true}>
          { 
            this.state.topStories.map((story) => {
              return (
                <View style={styles.slide} title={<Text numberOfLines={2} style={styles.topStoryTitle}>{story.title}</Text>}>
                  <TouchableHighlight
                    onPress={this.navToDetail.bind(this, story)}
                  >
                    <Image style={styles.image} source={{uri: story.image}} />
                  </TouchableHighlight>
                  <TouchableHighlight
                    onPress={this.navToDetail.bind(this, story)}
                    style={styles.mask}
                    underlayColor='transparent'
                  >
                    <View style={styles.mask}></View>
                  </TouchableHighlight>
                </View>
                )
            })
          }
        </Swiper>
      )
  },

  renderRow: function(stories) {
    if (!stories.images || stories.images.length <= 0) {
      return null;
    };
    return (
      <TouchableHighlight 
        onPress={this.navToDetail.bind(this, stories)}
        underlayColor='transparent'
        >
        <View style={styles.list} >
          <Text style={styles.title}>{stories.title}</Text>
          <Image
            style={styles.cover}
            source={{uri: stories.images[0]}}
          />
        </View>
      </TouchableHighlight>
      )
  },

  endReached: function() {

    var index = welcomeModel.get('index');
    var searchDay = new Date(new Date() - 24*60*60*1000 * (++index));
    welcomeModel.set('index', index);

    welcomeModel.getNewsByDate(this.getDateFormat(searchDay))
        .then((responseData) => {
          this.state.stories = this.state.stories.concat(responseData.stories);
          console.log(this.state);
          this.setState({
            stories: this.state.stories,
            dataSource: this.state.dataSource.cloneWithRows(this.state.stories),
          });
        })
        .done();
  },

  navToDetail: function(stories) {
    this.props.navigator.push({
      title: '详情页' + stories.id,
      component: DetailView,
      passProps: {storyId: stories.id},
      leftButtonTitle: '返回',
      onLeftButtonPress: () => this.props.navigator.pop(),
    })
  },

});

module.exports = WelcomeView;