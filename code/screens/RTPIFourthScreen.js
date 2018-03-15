import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Platform,
  Text,
  FlatList,
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import api from './../utilities/api';

export default class RTPIFourthScreen extends Component{

  static navigationOptions = { header: null };

  constructor(props){
  	super(props);
    this.state = {
      distance: 0,
      time: [],
      polyline: [],
      newRTPI: []
    }
  }

  findTime(time) {
    let output = ((parseInt(time) * 2) / 60 >> 0) + 5 //The 5 is for how long they will be there for
    return output
  }

  findDistance(distance) {
    let output = (parseInt(distance) * 2) / 1000
    return output
  }

  async componentWillMount() {
    let busStopNumber = this.props.navigation.state.params.stopnumber
    let busStopRTPI = (await api.getResponseResults(busStopNumber)).data.results
    let originlat = this.props.navigation.state.params.stopLat
    let originlng = this.props.navigation.state.params.stopLng
    let destinationlat = this.props.navigation.state.params.item.latitude
    let destinationlng = this.props.navigation.state.params.item.longitude
    let data = (await api.distanceTwoPoints(originlat, originlng, destinationlat, destinationlng)).data.routes[0]
    let distance = this.findDistance(data.legs[0].distance['value'])
    let time = this.findTime(data.legs[0].duration['value'])
    let newRTPI = []
    for (i=0; i<busStopRTPI.length; i++) {
      if (busStopRTPI[i].duetime < time) {
        continue;
      }
      if (busStopRTPI[i].duetime == time) {
        newRTPI.push({
          route: busStopRTPI[i].route,
          destination: busStopRTPI[i].destination,
          duetime: "Due",
          output: ""
        })

      }
      if (busStopRTPI[i].duetime > time) {
        newRTPI.push({
          route: busStopRTPI[i].route,
          destination: busStopRTPI[i].destination,
          duetime: (parseInt(busStopRTPI[i].duetime) - time),
          output: ""
        })
      }
    }
    for (i=0;i<newRTPI.length;i++) {
      let time = newRTPI[i].duetime
      if (time === "Due") {
        newRTPI[i].output = "Due"
      }
      if (time == "1") {
        newRTPI[i].output = "1 minute"
      }
      if (time != "Due" && time != "1") {
        currentTime = newRTPI[i].duetime.toString()
        newRTPI[i].output = currentTime.concat(" minutes")
      }
    }
    let PolyLine = require('@mapbox/polyline');
    let polylinePoints = PolyLine.decode(data.overview_polyline.points)
    let coordinates = polylinePoints.map((point) => {
              return  {
                  latitude :point[0],
                  longitude :point[1]
              }
          })
    let numBuses = newRTPI.length
    this.setState({distance: distance, time: time, polyline: coordinates, newRTPI: newRTPI, numBuses: numBuses})
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={styles.container}>
          <View style = {styles.busBar}>
            <Text style = {{color: 'white'}}>{this.props.navigation.state.params.stopnumber} -> {this.props.navigation.state.params.item.name} -> {this.props.navigation.state.params.stopnumber}</Text>
          </View>
          <MapView
            region={{
              latitude: this.props.navigation.state.params.stopLat,
              longitude: this.props.navigation.state.params.stopLng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            style = {styles.map}
            provider={Platform.OS === 'ios' ? PROVIDER_GOOGLE : null}>
            <MapView.Marker
              coordinate={{latitude: this.props.navigation.state.params.stopLat, longitude: this.props.navigation.state.params.stopLng}}
              title={this.props.navigation.state.params.stopnumber}
              description="Current Stop"
              pinColor="blue"
            />
            <MapView.Marker
              coordinate={{latitude: this.props.navigation.state.params.item.latitude, longitude: this.props.navigation.state.params.item.longitude}}
              title={this.props.navigation.state.params.item.name}
              description="Shop"
            />
            <MapView.Polyline
              coordinates={this.state.polyline}
              strokeColor="rgba(255,140,0,0.8)"
          		strokeWidth={3}
            />
          </MapView>
          <View style={styles.list}>
            <View style = {[styles.listContainersTop, styles.listItemMinute]}>
              <Text style={{fontSize: 15, color: 'white'}}>Time: {this.state.time} minutes</Text>
            </View>
            <View style = {[styles.listContainersTop, styles.listItemDistance]}>
              <Text style={{fontSize: 15, color: 'white'}}>Walking distance: {this.state.distance} km</Text>
            </View>
          </View>
          {(this.state.numBuses == 0) && (
            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, paddingLeft: '5%', paddingRight: '5%'}}>
              <Text style={{fontSize: 30}}>No buses currently</Text>
            </View>
          )}
          {(this.state.numBuses > 0) && (
          <FlatList
            data = {this.state.newRTPI}
            keyExtractor = {(item, index) => index.toString()}
            renderItem = {({item}) => (
              <View style={styles.list}>
                <View style = {[styles.listContainers, styles.listItemBus]}>
                  <Text style={{fontSize: 22}}>{item.route}</Text>
                </View>
                <View style = {[styles.listContainers, styles.listItemDestination]}>
                  <Text style={{fontSize: 18}}>{item.destination}</Text>
                </View>
                <View style = {[styles.listContainers, styles.listItemTime]}>
                  <Text style={{fontSize: 14}}>{item.output}</Text>
                </View>
              </View>
            )}
          />
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
    paddingTop: Platform.OS === 'ios' ? 20 : 0
  },
  map: {
    width: '100%',
		height: '40%',
  },
  list: {
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 0.2,
  },
  listContainers: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 65,
  },
  listItemBus: {
    paddingLeft: '4%',
    display: 'flex',
    width: '25%'
  },
  listItemDestination: {
    display: 'flex',
    width: '45%'
  },
  listItemTime: {
    display: 'flex',
    width: '30%',
    paddingRight: '4%'
  },
  busBar: {
    backgroundColor: '#2980b9',
    alignItems: 'center',
    justifyContent: 'center',
    height: '8%',
    flexDirection: 'row',
  },
  listContainersTop: {
    backgroundColor: '#2980b9',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderWidth: 0.4,
  },
  listItemMinute: {
    paddingLeft: '2%',
    paddingRight: '2%',
    display: 'flex',
    width: '40%'
  },
  listItemDistance: {
    display: 'flex',
    width: '60%',
    paddingLeft: '2%',
    paddingRight: '2%',
  }
});
