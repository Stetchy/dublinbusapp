import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ConnectivityRenderer } from 'react-native-offline';
import AppNavigator from './components/AppNavigator';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ConnectivityRenderer>
        {isConnected => (
          isConnected ? (
            <AppNavigator />
          ) : (
            <View style={styles.container}>
              <Text style={{fontSize: 17}}>Please connect to the internet to use the app.</Text>
            </View>
          )
        )}
      </ConnectivityRenderer>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d35400',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
