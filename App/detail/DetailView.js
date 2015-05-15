'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
} = React;

var HTMLView = require('react-native-htmlview');


var DetailModel = require('./model/DetailModel');
var styles = require('./style/detail.css');

var DetailHeaderView = require('./DetailHeaderView');

var detailModel = new DetailModel();


var DetailView = React.createClass({
  getInitialState: function() {
    return {
      isLoading: true,
      data: {},
    };
  },

  componentWillMount: function() {
    var storyId = this.props.storyId;
    detailModel.getDetailInfo(storyId)
      .then((responseData) => {
        this.setState({
          isLoading: false,
          data: responseData
        });
      })
  },


  render: function() {
    if (this.state.isLoading) {
      return null;
    };

    return (
      <ScrollView 
        automaticallyAdjustContentInsets={true}
        style={styles.container}>

        {/* 头部图片展示区 */}
        <DetailHeaderView detailData={this.state.data}/>

        {/* 推荐作者信息 */}
        <RecomanderView detailData={this.state.data}/>

        {/* 内容部分 */}
        <DetailContentView detailData={this.state.data}/>

      </ScrollView>
      )
  }

});



var RecomanderView = React.createClass({

  render: function() {
    var data = this.props.detailData;
    if (typeof data.recommenders == 'undefined') {
      return null;
    };
    return (
      <View style={styles.recommenderInfo}>
        <Text style={styles.recommenderTitle}>推荐者</Text>
        <Image style={styles.recommenderAvatar} source={{uri: data.recommenders[0].avatar}}/>
      </View>
    );
  }

});


var DetailContentView = React.createClass({

  render: function() {
    var data = this.props.detailData;
    data.body = data.body.replace(/\s+/g, '');
    return (
      <View style={htmlViewStyles.infoDetail}>
        <HTMLView
          value={data.body}
          onLinkPress={(url) => console.log('navigating to: ', url)}
          stylesheet={htmlViewStyles}
        />
      </View>
    );
  }

});

var htmlViewStyles = StyleSheet.create({
  infoDetail: {
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
  },

  p: {
    lineHeight: 20,
    fontSize: 14,
    borderLeftColor: '#eee',
    borderLeftWidth: 1,
  },

  a: {
    fontWeight: '300',
    color: '#FF3366', // pink links
  },
})

module.exports = DetailView;