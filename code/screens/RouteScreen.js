import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  TextInput,
  TouchableOpacity
} from 'react-native';
import MapView from 'react-native-maps';
import api from './../utilities/api.js';
import {StackNavigator} from 'react-navigation';
import RouteSecondScreen from './RouteSecondScreen';
import RouteThirdScreen from './RouteThirdScreen';
import RouteFourthScreen from './RouteFourthScreen';
import RTPISecondScreen from './RTPISecondScreen';
import RTPIThirdScreen from './RTPIThirdScreen';
import OfflineTimetableScreen from './OfflineTimetableScreen';
import FareCalculator from './FareCalculator';
import FareScreen from './FareScreen';
import routeNumbers from './../utilities/routeNumbers';

export class RouteScreen extends Component {

  static navigationOptions = { header: null };

  constructor(props){
  	super(props);

    this.state = {
      routes: [],
      clickedRoute: "",
      text: "",
    };
  }

  componentWillMount() {
    let responseData = [
      api.getRouteListInformation()
    ];
    Promise.all(responseData).then((data) => {
      let responseResults = data[0].data.results;
      let apiRoutes = []
      for (i = 0; i < responseResults.length; i++) {
        let currentVal = responseResults[i]['route']
        if ((! (currentVal.slice(0,4) == "bac|")) && (! (currentVal == "Red" || currentVal == "Green" || currentVal == "XXX"))) {
          apiRoutes.push(responseResults[i])
        }
      }
      this.setState({ routes: apiRoutes });
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textin}
          placeholder="Enter Route Number"
          keyboardType="numeric"
          onChangeText={(code) => this.setState({text: code})}
          returnKeyType='done'
          underlineColorAndroid='rgba(0,0,0,0)'
        />
        <FlatList
          data = {routeNumbers.getRoutes().filter(item => item.includes(this.state.text))}
          keyExtractor = {(item, index) => index.toString()}
          renderItem = {({item}) => (
            <TouchableOpacity onPress={() => navigate('RouteSecondScreen', {clickedRoute: item})}>
                <View style = {styles.listItem}>
                  <Text>{item}</Text>
                </View>
            </TouchableOpacity>
          )}
          style = {styles.list}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
		width: '100%',
		height: '100%',
    backgroundColor: '#F5FCFF',
    paddingTop: Platform.OS === 'ios' ? 20 : 0
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
  textin: {
    height: Platform.OS === 'android' ? '10%' : '8%',
    paddingLeft: '5%'
  }
});


export default myscreens = StackNavigator({
  RouteScreen: {screen: RouteScreen},
  RouteSecondScreen: {screen: RouteSecondScreen},
  RouteThirdScreen: {screen: RouteThirdScreen},
  RouteFourthScreen: {screen: RouteFourthScreen},
  RTPISecondScreen: {screen: RTPISecondScreen},
  RTPIThirdScreen: {screen: RTPIThirdScreen},
  OfflineTimetableScreen: {screen: OfflineTimetableScreen},
  FareCalculator: {screen: FareCalculator},
  FareScreen: {screen: FareScreen}
});
