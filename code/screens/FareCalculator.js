import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Platform,
  Text,
  ActivityIndicator,
  Alert
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import api from './../utilities/api';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Marker from 'react-native-maps';

export default class FareCalculator extends Component{

  static navigationOptions = { header: null };

  constructor(props){
  	super(props);
    this.state = {
      isLoading: true,
      currStop: ""
    };
  }

  adultAndStudentFare(stops) {
    if (stops <= 3) {
      return {leap: "€1.50", cash: "€2.10"}
    }
    if (stops <= 13 && stops > 3) {
      return {leap: "€2.50", cash: "€2.85"}
    }
    else {
      return {leap: "€2.60", cash: "€3.30"}
    }
  }

  childFare(stops) {
    if (stops <= 7) {
      return {schoolLeap: "€0.80", schoolCash: "€1.00", leap: "€0.95", cash: "€1.20"}
    }
    else {
      return {schoolLeap: "€0.80", schoolCash: "€1.00", leap: "€1.05", cash: "€1.35"}
    }
  }

  pickedStop(stop) {
    let stops = this.state.routeData
    let stopDistance = 0
    for (i=0;i<stops.length;i++) {
      if (stops[i]['stopid'] == stop) {
        return stopDistance
      }
      stopDistance++
    }
  }

  async componentWillMount() {
    stopList = []
    let route = this.props.navigation.state.params.bus
    let stop = this.props.navigation.state.params.stop
    let routeData = (await api.getRouteInformation(route)).data.results
    let isStop = false
    for (i=0;i<routeData.length;i++) {
      let newData = routeData[i].stops
      for(j=0;j<newData.length;j++) {
        if (stop == newData[j]['stopid']) {
          j++;
          isStop = true
        }
        if (isStop == true) {
          stopList.push(newData[j])
        }
      }
      isStop = false
    }
    this.setState({ route: route, routeData: stopList, isLoading: false});
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={styles.container}>
          {this.state.isLoading && (
            <View style={styles.indicator}>
              <ActivityIndicator
                color="#C00"
                size="large"
              />
            </View>
          )}
          {!this.state.isLoading && (
            <View style={styles.container}>
              <View style={{height: '5%', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontWeight: 'bold'}}>Click your destination on the map</Text>
              </View>
              <MapView
                initialRegion={{
                  latitude: 53.4080158,
                  longitude: -6.3232124,
                  latitudeDelta: 0.5,
                  longitudeDelta: 0.5,
                }}
                style = {styles.map}
                provider={Platform.OS === 'ios' ? PROVIDER_GOOGLE : null}>
                {this.state.routeData.map(marker => (
                  <MapView.Marker
                    key = {`${marker.longitude}:${marker.latitude}`}
                    coordinate={{longitude: parseFloat(marker.longitude), latitude: parseFloat(marker.latitude)}}
                    title={marker.displaystopid}
                    onPress={() => this.setState({"adultandstudent": this.adultAndStudentFare(this.pickedStop(marker.displaystopid)), "child": this.childFare(this.pickedStop(marker.displaystopid))})}
                    onCalloutPress={() => navigate('FareScreen', {adultAndStudentFare: this.state.adultandstudent, childFare: this.state.child})}
                  />
                ))}
              </MapView>
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
    paddingTop: Platform.OS === 'ios' ? 20 : 0
  },
  map: {
    width: '100%',
		height: '95%',
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
