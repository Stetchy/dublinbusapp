import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  Button,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Marker from 'react-native-maps';
import {StackNavigator} from 'react-navigation';
import {FontAwesome} from '@expo/vector-icons';


export default class RouteThirdScreen extends Component {

  static navigationOptions = { header: null };

  constructor(props){
    super(props);

    this.state = {
      markers: [],
      busRoute: "",
      text: "",
    };
  }

  componentWillMount() {
    let route = this.props.navigation.state.params.stops;
    let busRoute = this.props.navigation.state.params.route;
    this.setState({ markers: route, busRoute: busRoute})
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style = {styles.busBar}>
          <Text style = {{color: 'white', width: '75%'}}>Route: {this.props.navigation.state.params.origin} to {this.props.navigation.state.params.destination}</Text>
          <View style={styles.iconBar}>
            <FontAwesome.Button
              name="bus"
              onPress={() => navigate('RouteFourthScreen', {markers: this.state.markers, busRoute: this.state.busRoute})}
              backgroundColor="#2980b9">
            </FontAwesome.Button>
          </View>
        </View>
        <MapView
          initialRegion={{
            latitude: 53.4080158,
            longitude: -6.3232124,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
          style={styles.map}
          >
          {this.state.markers.map(marker => (
            <MapView.Marker
              key = {`${marker.longitude}:${marker.latitude}`}
              coordinate={{longitude: parseFloat(marker.longitude), latitude: parseFloat(marker.latitude)}}
              title={marker.displaystopid}
              onPress={() => this.setState({ text: marker.displaystopid })}
              onCalloutPress={() => navigate('RTPISecondScreen', {text: this.state.text})}
            />
          ))}
        </MapView>
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
  },
  listItem: {
    width: '100%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 0.5
  },
  busBar: {
    backgroundColor: '#2980b9',
    paddingLeft: '5%',
    alignItems: 'center',
    height: '8%',
    flexDirection: 'row',
  },
  map: {
    width: '100%',
		height: '100%',
  },
  iconBar: {
    paddingLeft: '5%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '20%'
  },
});
