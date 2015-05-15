/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
} = React;

var ImageList = require('./imageList');

var ReactNativeDemo = React.createClass({
  render: function() {
    return (
      <NavigatorIOS style={styles.container}
          initialRoute={{
            component: ImageList,
            title: 'imooc学习课程',
            passProps: { myProp: 'foo' },
          }}
      ></NavigatorIOS>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('ReactNativeDemo', () => ReactNativeDemo);
