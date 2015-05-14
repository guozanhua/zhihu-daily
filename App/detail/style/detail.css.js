'use strict';

var React = require('react-native');
var {
  StyleSheet,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // 推荐者信息
  recommenderInfo: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  recommenderAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 10,
  }

});

module.exports = styles;