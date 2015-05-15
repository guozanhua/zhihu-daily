'use strict';

var React = require('react-native');
var {
  StyleSheet,
} = React;

var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;

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
    color: '#fff',
    fontSize: 16,
    width: screenWidth - 30,
    lineHeight: 20,
  },
  mask: {
    flex: 1,
    height: 220,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0, 
    right: 0,
    backgroundColor: 'rgba(0,0,0,.4)',
  },

});

module.exports = styles;