import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import MapView from 'react-native-maps';
import api from './../utilities/api.js';
import {StackNavigator} from 'react-navigation';

export default class RouteSecondScreen extends Component {

  static navigationOptions = { header: null };

  constructor(props){
    super(props);

    this.state = {
      route: "",
      currentRoute: [],
      isLoading: true,
    };
  }

  async componentDidMount() {
    let route = this.props.navigation.state.params.clickedRoute
    let routeData = (await api.getRouteInformation(route)).data.results
    this.setState({ route: route, routeData: routeData, isLoading: false});
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
            <View style = {styles.busBar}>
              <Text style = {{color: 'white'}}> Route: {this.state.route}</Text>
            </View>
            <FlatList
              data = {this.state.routeData}
              keyExtractor = {(item, index) => index.toString()}
              renderItem = {({item}) => (
                <TouchableOpacity onPress={() => navigate('RouteThirdScreen', {stops: item.stops, route: this.state.route, origin: item.origin, destination: item.destination})}>
                  <View style = {styles.listItem}>
                    <Text>{item.origin} --> {item.destination}</Text>
                  </View>
                </TouchableOpacity>
              )}
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
    flex: 1,
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
    borderWidth: 0.5,
    paddingRight: '10%',
  },
  busBar: {
    height: '6%',
    backgroundColor: '#2980b9',
    justifyContent: 'center',
    alignItems: 'center'
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
