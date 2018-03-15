import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  ActivityIndicator,
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Marker from 'react-native-maps';
import {PolyLine} from 'react-native-maps';
import api from './../utilities/api.js';
import icon from './../utilities/icon.png'

export default class RouteFourthScreen extends Component{

  static navigationOptions = { header: null };

  constructor(props){
  	super(props);
    this.state = {
      responseResults: [],
      busLocations: [],
      allStopCoords: [],
      isLoading: false,
    }
  }

  async componentDidMount() {
    let route = this.props.navigation.state.params.busRoute
    let allStops = this.props.navigation.state.params.markers;
    let data = [];
    let busLocations = [];
    let allStopCoords = [];
    for (i = 0; i < allStops.length; i++) {
      data.push({
        stop: allStops[i],
        busHere: 0,
        rtd: (await api.getResponseResults(allStops[i]['stopid'])).data.results
      })
    }
    for (i = 1; i < data.length; i++) {
      allStopCoords.push({longitude: parseFloat(data[i].stop.longitude), latitude: parseFloat(data[i].stop.latitude)})
      if (data[i].rtd.length < 1){
        continue;
      }
      if (data[i].rtd[0].duetime == 'Due' && data[i].rtd[0].route == route) {
        if (data[i-1].busHere == 1 || data[i-1].busHere == 2) {
          data[i].busHere = 2
          continue;
        }
        data[i].busHere = 1
        busLocations.push({longitude: data[i].stop.longitude, latitude: data[i].stop.latitude})
      }
    }
    this.setState({responseResults: data, busLocations: busLocations, allStopCoords: allStopCoords, isLoading: true})
}

  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={styles.container}>
          {!this.state.isLoading && (
            <View style={styles.indicator}>
              <ActivityIndicator
                color="#C00"
                size="large"
              />
            </View>
          )}
          {this.state.isLoading && (
          <MapView
            initialRegion={{
              latitude: 53.4080158,
              longitude: -6.3232124,
              latitudeDelta: 0.5,
              longitudeDelta: 0.5,
            }}
            style = {styles.container}
            provider={Platform.OS === 'ios' ? PROVIDER_GOOGLE : null}>
            {this.state.busLocations.map(busLocations => (
              <MapView.Marker
                key = {`${busLocations.longitude}:${busLocations.latitude}`}
                coordinate={{longitude: parseFloat(busLocations.longitude), latitude: parseFloat(busLocations.latitude)}}
                image={require('./../utilities/icon.png')}
              />
            ))}
            <MapView.Polyline
          		coordinates={this.state.allStopCoords}
          		strokeColor="#000"
          		strokeWidth={2.5}
          	/>
          </MapView>)}
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
  indicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
