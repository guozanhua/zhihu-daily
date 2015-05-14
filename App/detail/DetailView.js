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

var HtmlView = require('react-native-htmlview');

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

    return (
      <View style={htmlVeiwStyles.infoDetail}>
        <Text>{data.body}</Text>
      </View>
    );
  }

});

var htmlVeiwStyles = StyleSheet.create({
  infoDetail: {
    flex: 1,
  },

  a: {
    fontWeight: '300',
    color: '#FF3366', // pink links
  },
})


// class DetailView extends React.Component {

//   getInitialState() {
//     return {
//       isLoading: true,
//       data: {},
//     };
//   }

//   componentWillMount() {
//     var storyId = this.props.storyId;
//     detailModel.getDetailInfo(storyId)
//       .then((responseData) => {
//         console.log(responseData);
//       })
//   }

//   render() {
//     alert(this.state);


//     return (
//       <ScrollView 
//         automaticallyAdjustContentInsets={true}
//         style={styles.container}>

//         {/* 头部图片展示区 */}
//         <DetailHeaderView />

//         {/* 推荐作者信息 */}
//         <RecomanderView />

//         {/* 内容部分 */}
//         <DetailContentView />

//       </ScrollView>
//       )
//   }
// }

module.exports = DetailView;