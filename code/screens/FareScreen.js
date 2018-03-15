import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Platform,
  Text
} from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class FareScreen extends Component{

  static navigationOptions = { header: null };

  constructor(props){
  	super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={[styles.boxContainers, styles.boxOne]}>
          <Text style={{fontSize: 24, fontWeight: "bold", color: "black"}}>Adult & Student fare</Text>
          <Text style={{fontSize: 14, fontWeight: "bold", color: "black"}}>Leap fare: {this.props.navigation.state.params.adultAndStudentFare["leap"]}, Cash fare: {this.props.navigation.state.params.adultAndStudentFare["cash"]}</Text>
        </View>
        <View style={[styles.boxContainers, styles.boxTwo]}>
          <Text style={{fontSize: 24, fontWeight: "bold", color: "black"}}>Child fare</Text>
          <Text style={{fontSize: 14, fontWeight: "bold", color: "black"}}>School leap fare: {this.props.navigation.state.params.childFare["leap"]}, School cash fare: {this.props.navigation.state.params.adultAndStudentFare["cash"]}</Text>
        </View>
        <View style={[styles.boxContainers, styles.boxThree]}>
          <Text style={{fontSize: 24, fontWeight: "bold", color: "black"}}>During school hours fare</Text>
          <Text style={{fontSize: 14, fontWeight: "bold", color: "black"}}>Child leap fare: {this.props.navigation.state.params.childFare["schoolLeap"]}, Child cash fare: {this.props.navigation.state.params.childFare["schoolCash"]}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0
  },
  boxContainers: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  boxOne: {
    backgroundColor: '#64B5F6'
  },
  boxTwo: {
    backgroundColor: '#42A5F5'
  },
  boxThree: {
    backgroundColor: '#2196F3'
  },
});
