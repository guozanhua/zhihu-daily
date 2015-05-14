'use strict';

var React = require('react-native');
var {
  StyleSheet,
} = React;

var styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 200,
    backgroundColor: 'transparent',
  },

  title: {
    bottom: 10,
    left: 15,
    position: 'absolute',
    color: '#eee',
    fontSize: 16,
  },

});

module.exports = styles;