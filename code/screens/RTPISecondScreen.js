import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  Platform,
  ActivityIndicator,
  Alert,
  AsyncStorage,
  Button,
  DeviceEventEmitter
} from 'react-native';
import api from './../utilities/api.js';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Marker from 'react-native-maps';
import BusStop from './../components/BusStop';
import {StackNavigator} from 'react-navigation';
import {FontAwesome} from '@expo/vector-icons';
import Prompt from '../components/react-native-prompt';
import ModalFilterPicker from 'react-native-modal-filter-picker';

const KEY = "favourites";

export default class RTPISecondScreen extends Component {

  static navigationOptions = { header: null };

  constructor(props){
  	super(props);
    this.state = {
      refreshing: false,
      thirdscreenstop: "",
      thirdscreenroute: "",
      stopOutput: [],
      isLoading: true,
      bussesOnRoute: [],
      currentBus: "",
      favourites: [],
      favePromptVisible: false,
      stopnumber: [],
      filterVisible: false,
      offlineTimetableBusVisible: false,
      currentBusOfflineTimetable: [],
      offlineTimetableDayVisible: false,
      dayOfflineTimetable: [],
      fareVisible: false,
      fareRoute: [],
    };
    this.add = this.add.bind(this);
  }

  getRTPI() {
    let busStopNumber = this.props.navigation.state.params.text
    let responseData = [
      api.getResponseResults(busStopNumber),
      api.getBusStopInformation(busStopNumber)
    ];

    Promise.all(responseData).then((data) => {
      let responseResults = data[0].data.results;
      for (i=0;i<responseResults.length;i++) {
        let time = responseResults[i].duetime
        if (time === "Due") {
          responseResults[i].departureduetime = "Due"
        }
        if (time == "1") {
          responseResults[i].departureduetime = "1 minute"
        }
        if (time != "Due" && time != "1") {
          responseResults[i].departureduetime = responseResults[i].duetime.concat(" minutes")
        }
      }
      let numBusses = responseResults.length
      let busInformation = data[1].data.results;
      busInformation = busInformation[0];
      let stopLongitude = busInformation.longitude;
      let stopLatitude = busInformation.latitude;
      let busStop = new BusStop(parseFloat(stopLongitude), parseFloat(stopLatitude), busStopNumber);
      busStop.routes = responseResults;
      let bussesOnRoute = busInformation.operators[0].routes.sort()
      let output = []
      for (i=0;i<bussesOnRoute.length;i++) {
        if (i == 0) {
          output.push({
            key: "",
            label: 'No Filter',
          })
        }
        output.push({
          key: bussesOnRoute[i],
          label: bussesOnRoute[i],
        })
      }
      this.setState({refreshing: false, stopOutput: busStop, isLoading: false, bussesOnRoute: output, stopnumber: busStopNumber, numBusses: numBusses});
    });
  }

  get = async () => {
    try {
      const data = await AsyncStorage.getItem(KEY);
      if (data !== null) {
        const newData = JSON.parse(data);
        this.setState({favourites: newData});
      }
    } catch(e) {
      console.log(e);
    }
  }

  async add(stopId, name) {
   try {
       let jsonData = JSON.stringify([...this.state.favourites, {stop: stopId, name: name}]);
       let data = [...this.state.favourites, {stop: stopId, name: name}];
       await AsyncStorage.setItem(KEY, jsonData)
       this.setState({favourites: data});
       DeviceEventEmitter.emit('addToStorage', data);
   } catch(e) {
     console.log(e);
   }
  }

  componentWillMount() {
    this.get();
  }

  componentDidMount(){
    this.getRTPI();
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.getRTPI();
  }

  onShow = () => {
    this.setState({ filterVisible: true });
  }

  onSelect = (picked) => {
    this.setState({
      currentBus: picked,
      filterVisible: false
    })
  }

  onCancel = () => {
    this.setState({
      filterVisible: false
    });
  }

  onShowTimetableBus = () => {
    this.setState({ offlineTimetableBusVisible: true });
  }

  onSelectTimetableBus = (picked) => {
    this.setState({
      currentBusOfflineTimetable: picked,
      offlineTimetableBusVisible: false
    })
  }

  onCancelTimetableBus = () => {
    this.setState({
      offlineTimetableBusVisible: false
    });
  }

  onShowTimetableDay = () => {
    this.setState({ offlineTimetableDayVisible: true });
  }

  onSelectTimetableDay = (picked) => {
    this.setState({
      fareRoute: picked,
      offlineTimetableDayVisible: false
    })
  }

  onCancelTimetableDay = () => {
    this.setState({
      offlineTimetableDayVisible: false
    });
  }

  onShowFare = () => {
    this.setState({ fareVisible: true });
  }

  onSelectFare = (picked) => {
    this.setState({
      fareRoute: picked,
      fareVisible: false
    })
  }

  onCancelFare = () => {
    this.setState({
      fareVisible: false
    });
  }

  filterFunction(selectedBus, busList) {

    if (selectedBus == "") {
      return busList
    } else {
      return busList.filter(item => item.route == selectedBus)
    }
  }


  render() {
    const { navigate } = this.props.navigation;
    let currLatitude = this.state.stopOutput.latitude
    let currLongitude = this.state.stopOutput.longitude
    return (
        <View style = {styles.container}>
          {this.state.isLoading && (
            <View style={styles.indicator}>
              <ActivityIndicator
                color="#C00"
                size="large"
              />
            </View>
          )}
          {!this.state.isLoading && (
            <View style = {styles.container}>
              <View style = {styles.busBar}>
                <Text style = {{color: 'white', alignItems: 'flex-end', width: '25%'}}> Stop: {this.state.stopOutput.stop}</Text>
                <View style={styles.iconBar}>
                    <FontAwesome.Button
                      name="star"
                      backgroundColor="#2980b9"
                      onPress={() => {
                          let alreadyFav = false;
                          for (i=0;i<this.state.favourites.length;i++) {
                            if (this.state.favourites[i].stop == this.state.stopOutput.stop) {
                              alreadyFav = true;
                            }
                          }
                          if(alreadyFav) {
                            Alert.alert("Already a favourite");
                          } else {
                            this.setState({favePromptVisible: true});
                            }
                          }
                        }>
                    </FontAwesome.Button>
                  <FontAwesome.Button
                    name="shopping-bag"
                    onPress={() => navigate('RTPIThirdScreen', {longitude: currLongitude, latitude: currLatitude, stopnumber: this.state.stopnumber})}
                    backgroundColor="#2980b9">
                  </FontAwesome.Button>
                  <FontAwesome.Button
                    name="filter"
                    backgroundColor="#2980b9"
                    onPress={() => this.setState({filterVisible: true})}>
                  </FontAwesome.Button>
                  <FontAwesome.Button
                    name="calendar"
                    backgroundColor="#2980b9"
                    onPress={() => this.setState({offlineTimetableBusVisible: true})}>
                  </FontAwesome.Button>
                  <FontAwesome.Button
                    name="euro"
                    backgroundColor="#2980b9"
                    onPress={() => this.setState({fareVisible: true})}>
                  </FontAwesome.Button>
                </View>
                <Prompt
                  title="Name your favourite"
                  placeholder={this.state.stopOutput.stop}
                  defaultValue={this.state.stopOutput.stop}
                  visible={ this.state.favePromptVisible }
                  onCancel={ () => this.setState({
                      favePromptVisible: false,
                    })
                  }
                  onSubmit={ (value) => {
                      this.setState({favePromptVisible: false});
                      this.add(this.state.stopOutput.stop, value);
                    }
                  }
                />
              </View>
              <MapView
                region={{
                  latitude: currLatitude,
                  longitude: currLongitude,
      		    	  latitudeDelta: 0.003,
           	 			longitudeDelta: 0.003,
         	 			}}
      					style = {styles.map}
                provider={Platform.OS === 'ios' ? PROVIDER_GOOGLE : null}
        			>
                <MapView.Marker
                  coordinate={{latitude: currLatitude, longitude: currLongitude}}
                  title={this.state.stopOutput.stop}
                  description={this.state.stopOutput.stop}
                />
              </MapView>
              <ModalFilterPicker
                title="Choose a bus to filter this stop by"
                visible={this.state.filterVisible}
                onSelect={this.onSelect}
                onCancel={this.onCancel}
                onRequestClose={() => {
                  this.setState({
                    filterVisible: false
                  })}}
                options={this.state.bussesOnRoute}
              />
              <ModalFilterPicker
                title="Choose a route for the stop timetable"
                visible={this.state.offlineTimetableBusVisible}
                onSelect={(bus) => this.setState({offlineTimetableBusVisible: false, bus: bus, offlineTimetableDayVisible: true})}
                onCancel={this.onCancelTimetableBus}
                onRequestClose={() => {
                  this.setState({
                    offlineTimetableBusVisible: false
                  })}}
                options={this.state.bussesOnRoute.slice(1)}
              />
              <ModalFilterPicker
                title="Choose a day for the offline timetable"
                visible={this.state.offlineTimetableDayVisible}
                onSelect={(day) => navigate('OfflineTimetableScreen', {bussesOnRoute: this.state.bussesOnRoute, stopnumber: this.state.stopnumber, bus: this.state.bus, day: day}) && this.setState({offlineTimetableDayVisible: false})}
                onCancel={this.onCancelTimetableDay}
                onRequestClose={() => {
                  this.setState({
                    offlineTimetableDayVisible: false
                  })}}
                options={[{key: "Monday-Friday", label: "Monday-Friday"}, {key: "Saturday", label: "Saturday"}, {key: "Sunday", label: "Sunday"}]}
              />
              <ModalFilterPicker
                title="What bus will you be taking?"
                visible={this.state.fareVisible}
                onSelect={(bus) => navigate('FareCalculator', {stop: this.state.stopOutput.stop, bus: bus}) && this.setState({fareVisible: false})}
                onCancel={this.onCancelFare}
                onRequestClose={() => {
                  this.setState({
                    fareVisible: false
                  })}}
                options={this.state.bussesOnRoute.slice(1)}
              />
              {(this.state.numBusses == 0) && (
                <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, paddingLeft: '5%', paddingRight: '5%'}}>
                  <Text style={{fontSize: 30}}>No buses currently</Text>
                </View>
              )}
              {(this.state.numBusses > 0) && (
              <FlatList
                data = {this.filterFunction(this.state.currentBus, this.state.stopOutput.routes)}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)}
                  />
                }
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
                      <Text style={{fontSize: 14}}>{item.departureduetime}</Text>
                    </View>
                  </View>
                  )}
                />
              )}
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
  map: {
    width: '100%',
		height: '33%',
  },
  list: {
    flex: 1,
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
    paddingLeft: '5%',
    alignItems: 'center',
    height: '8%',
    flexDirection: 'row',
  },
  iconBar: {
    paddingLeft: '5%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '25%'
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
