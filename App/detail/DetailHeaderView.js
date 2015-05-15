'use strict';

var React = require('react-native');

var DetailModel = require('./model/DetailModel');
var styles = require('./style/detail.header.css');

var {
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
} = React;


var DetailHeaderView = React.createClass({

  render: function() {
    var data = this.props.detailData;
    return (
        <Image style={styles.image} source={{uri: data.image}}>
        <View style={styles.mask}></View>
          <Text style={styles.title}>{data.title}</Text>
        </Image>
    );
  }

});

module.exports = DetailHeaderView;