/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Image,
} = React;

var CourseDetail = require('./courseDetail');

var ImageList = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
      courseList:[],
    };
  },
  render: function() {
    return (
      <View style={styles.container}>
        <ListView dataSource={this.state.dataSource} renderRow={this._renderRow} />
      </View>
    );
  },

  componentDidMount: function() {
    this._fetchData();
  },

  _renderRow: function(rowData: Object, sectionID: number, rowID: number) {
    var imgSource = rowData;
    return (
      <TouchableHighlight  onPress={() => this._pressRow(rowID)}>
        <View>
          <View style={styles.row}>
            <Image style={styles.thumb} source={{uri: 'http://img.mukewang.com/'+ rowData.pic +'.jpg'}} />
            <Text style={styles.summary} numberOfLines={5}>{rowData.name}</Text>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  },

  _dataHandler:function(responseData) {
    if (responseData) {
          var list = responseData.list;
          this.state.courseList = list;
          this.setState({
            dataSource:this.state.dataSource.cloneWithRows(list),
          });
      } else {
        this.setState({
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
          });
      }
  },

  _fetchData: function() {
    fetch('http://www.imooc.com/course/ajaxlist', {
      method:'post',
      body:JSON.stringify({
        cat_id:0,
        lange_id:0,
        sort:'last',
        pagesize:30,
        page:1,
        is_easy:0
      })
    }).then(function(response){
      return response.json();
    }).catch(function(error){
      console.log(error);
    }).then((responseData) => {
        this._dataHandler(responseData);
    }).done();
  },

  _pressRow:function(rowID) {
    var course = this.state.courseList[rowID];
      this.props.navigator.push({
        component:CourseDetail,
        backButtonTitle:'全部课程',
        title:'课程详情页',
        passProps:{
          picUrl:'http://img.mukewang.com/'+ course.pic +'.jpg',
          courseName:course.name
        }
      });
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems:'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  summary: {
    marginLeft:20,
    marginRight:20,
    width:280,
  },
  thumb: {
    width: 64,
    height: 64,
  },
});

module.exports=ImageList;