import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Platform,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import api from './../utilities/api';
import pointOfInterest from './../components/pointOfInterest'

export default class RTPIThirdScreen extends Component{

  static navigationOptions = { header: null };

  constructor(props){
  	super(props);
    this.state = {
      poi: [],
      stopnumber: [],
    }
  }

  async componentWillMount() {
    let output = []
    let longitude = this.props.navigation.state.params.longitude
    let latitude = this.props.navigation.state.params.latitude
    let nearbySearch = (await api.nearbySearch(latitude, longitude)).data.results
    for (i=0; i<nearbySearch.length; i++) {
      let currData = nearbySearch[i]
      let currName = currData.name
      let currLat = currData.geometry.location.lat
      let currLng = currData.geometry.location.lng
      let currIcon = currData.icon
      output.push(new pointOfInterest(currName, currLng, currLat, currIcon))
    }
    this.setState({ poi: output, stopnumber: this.props.navigation.state.params.stopnumber});
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={styles.container}>
          <MapView
            region={{
              latitude: this.props.navigation.state.params.latitude,
              longitude: this.props.navigation.state.params.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            style = {styles.map}
            provider={Platform.OS === 'ios' ? PROVIDER_GOOGLE : null}>
            <MapView.Marker
              coordinate={{latitude: this.props.navigation.state.params.latitude, longitude: this.props.navigation.state.params.longitude}}
              title={this.props.navigation.state.params.stopnumber}
              description="Current Stop"
              pinColor="blue"
            />
            {this.state.poi.map(poi => (
              <MapView.Marker
                key = {`${poi.longitude}:${poi.latitude}`}
                coordinate={{longitude: parseFloat(poi.longitude), latitude: parseFloat(poi.latitude)}}
                title={poi.name}
                description={poi.name}
                onCalloutPress={() => navigate('RTPIFourthScreen', {stopLng: this.props.navigation.state.params.longitude, stopLat: this.props.navigation.state.params.latitude, item: poi, stopnumber: this.state.stopnumber})}
              />
            ))}
          </MapView>
          <FlatList
            data = {this.state.poi}
            keyExtractor = {(item, index) => index.toString()}
            renderItem = {({item}) => (
              <TouchableOpacity onPress={() => navigate('RTPIFourthScreen', {stopLng: this.props.navigation.state.params.longitude, stopLat: this.props.navigation.state.params.latitude, item: item, stopnumber: this.state.stopnumber})}>
                <View style = {styles.listItem}>
                  <Text>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
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
  map: {
    width: '100%',
		height: '40%',
  },
});
