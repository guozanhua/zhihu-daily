/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS,
} = React;

var WelcomeView = require('./App/welcome/WelcomeView');

var ZhihuDaily = React.createClass({
  render: function() {
  return (
    <NavigatorIOS
      style={{flex: 1,}}
      barTintColor='#09e'
      titleTextColor='#fff'
      tintColor='#fff'
      initialRoute={{
        component: WelcomeView,
        title: '知乎日报',
      }}
    />
    ); 
  }
});

AppRegistry.registerComponent('ZhihuDaily', () => ZhihuDaily);
