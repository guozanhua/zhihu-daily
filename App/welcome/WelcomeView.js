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
var welcomeModel = new WelcomeModel();

var DetailView = require('../detail/DetailView');


var WelcomeView = React.createClass({

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      value: 0,
      topStories: [],
    };
  },

  componentWillMount: function () {
    welcomeModel.getLatestNews()
        .then((responseData) => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.stories),
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