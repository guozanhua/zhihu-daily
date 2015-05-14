'use strict';

var React = require('react-native');
var {
  StyleSheet,
} = React;

var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#fffff',
  },

  // 轮播图部分
  wrapper: { 

  },
  slide: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  image: {
    height: 220,
  },
  dot: {
    backgroundColor:'rgba(0,0,0,.2)', 
    width: 5, 
    height: 5,
    borderRadius: 4, 
    marginLeft: 3, 
    marginRight: 3, 
    marginTop: 3, 
    marginBottom: 3,
  },
  activeDot: {
    backgroundColor: '#fff', 
    width: 8, 
    height: 8, 
    borderRadius: 4, 
    marginLeft: 3, 
    marginRight: 3, 
    marginTop: 3, 
    marginBottom: 3,
  },
  pagination: {
    flex: 1,
    bottom: 10, 
    right: 10,
  },
  topStoryTitle: {
    bottom: 60,
    left: 15,
    position: 'absolute',
    fontSize: 16,
    color: '#ffffff',
    width: screenWidth - 30,
  },

  // 今日推荐列表 
  list: {
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    paddingBottom: 15,
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee', 
  },
  title: {
    color: '#000000',
    fontSize: 16,
    flex: 1,
    marginRight: 3,
    lineHeight: 20,
  },
  cover: {
    width: 80,
    height: 70,
  },

});

module.exports = styles;