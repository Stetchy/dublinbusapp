import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Platform,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import RTPISecondScreen from './RTPISecondScreen';
import RTPIThirdScreen from './RTPIThirdScreen';
import RTPIFourthScreen from './RTPIFourthScreen';
import OfflineTimetableScreen from './OfflineTimetableScreen';
import FareCalculator from './FareCalculator';
import FareScreen from './FareScreen';
import api from './../utilities/api.js';
import stopNumbers from './../utilities/stopNumbers';

export class RTPIScreen extends Component{

  static navigationOptions = { header: null };

  constructor(props){
  	super(props);
    this.state = {
      text: '',
      isValid: false
    };
  }

  verifyStop(stop) {
    const { navigate } = this.props.navigation;
    let responseData = [api.getBusStopInformation(stop)]
    Promise.all(responseData).then((data) => {
      let validStop = data[0].data.errorcode
      if (validStop == "0") {
        this.setState({isValid: false})
        return navigate('RTPISecondScreen', {text: this.state.text}) && this.setState({text: ''})
      } else{
         this.setState({isValid: false, text: ''})
         Alert.alert("Not a valid stop")
      }
    })
  }

  componentDidMount() {
    let stops = stopNumbers.getStops()
    this.setState({stops: stops, isValid: false})
  }

  filterFunction(stop, stopList) {
    if (stop == "") {
      return stopList
    } else {
      return stopList.filter(item => item.toString().includes(stop))
    }
  }

  isValidStop() {
    this.setState({isValid: true});
    this.verifyStop(this.state.text);
  }

  isValidStopButton(stop) {
    let currstop = stop.toString()
    this.setState({isValid: true, text: currstop});
    this.verifyStop(currstop);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={styles.container}>
          {this.state.isValid && (
            <View style={styles.indicator}>
              <ActivityIndicator
                color="#C00"
                size="large"
              />
            </View>
          )}
          {!this.state.isValid && (
            <View style={styles.container}>
              <TextInput
                style={styles.textin}
                placeholder="Enter Stop Number"
                keyboardType="numeric"
                onChangeText={(code) => this.setState({text: code})}
                returnKeyType='done'
                onSubmitEditing={() => this.isValidStop()}
                underlineColorAndroid='rgba(0,0,0,0)'
                />
                <FlatList
                  data = {this.filterFunction(this.state.text, this.state.stops)}
                  keyExtractor = {(item, index) => index.toString()}
                  renderItem = {({item}) => (
                    <TouchableOpacity onPress={() => this.isValidStopButton(item)}>
                        <View style = {styles.listItem}>
                          <Text>{item}</Text>
                        </View>
                    </TouchableOpacity>
                  )}
                  style = {styles.list}
                />
              </View>
            )}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
		width: '100%',
		height: '100%',
    backgroundColor: '#F5FCFF',
    paddingTop: Platform.OS === 'ios' ? 10 : 0
  },
  listItem: {
    width: '100%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '10%',
    borderWidth: 0.5
  },
  indicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textin: {
    height: Platform.OS === 'android' ? '10%' : '8%',
    paddingLeft: '5%'
  }
});

export default myscreens = StackNavigator({
  RTPI: {screen: RTPIScreen},
  RTPISecondScreen: {screen: RTPISecondScreen},
  RTPIThirdScreen: {screen: RTPIThirdScreen},
  RTPIFourthScreen: {screen: RTPIFourthScreen},
  OfflineTimetableScreen: {screen: OfflineTimetableScreen},
  FareCalculator: {screen: FareCalculator},
  FareScreen: {screen: FareScreen}
});
