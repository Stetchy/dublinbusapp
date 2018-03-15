import React, { Component } from 'react';
import {
  StyleSheet,
  View,
	WebView,
  Platform
} from 'react-native';

export default class NewsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
  			<WebView
          source={{uri: 'https://twitter.com/dublinbusnews'}}
  			/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
		width: '100%',
		height: '100%',
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: Platform.OS === 'ios' ? 20 : 0
  }
});
