'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Image,
} = React;

var CourseDetail = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.summary} numberOfLines={1}>{this.props.courseName}</Text>
        <Image style={styles.thumb} source={{uri: this.props.picUrl}} />
      </View>
    );
  },
})

var styles = StyleSheet.create({
  container: {
    marginTop:64,
    flex: 1,
  },
  summary: {
    marginTop:10,
    marginLeft:20,
    marginRight:20,
    fontSize:30,
    width:280,
  },
  thumb: {
    width: 375,
    height: 500,
    alignSelf:'flex-end'
  },
});

module.exports = CourseDetail;