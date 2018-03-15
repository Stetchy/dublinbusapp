import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Platform,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import api from './../utilities/api';

export default class OfflineTimetableScreen extends Component{

  static navigationOptions = { header: null };

  constructor(props){
  	super(props);
    this.state = {
      data: [],
      chosenTimetable: "Monday-Friday",
      isLoading: true,
    };
  }

  async componentDidMount() {
    let currentStop = this.props.navigation.state.params.stopnumber
    let bus = this.props.navigation.state.params.bus
    let day = this.props.navigation.state.params.day
    let output = {"Monday-Friday": [], "Saturday": [], "Sunday": []}
    let timetable = (await api.getTimetable(currentStop, bus)).data.results
    for (i=0; i<timetable.length;i++){
      let departures = timetable[i].departures
      let newTimes = []
      for (j=0; j<departures.length;j++){
          let currStop = departures[j].split(":")
          let newStop = currStop[0] + ":" + currStop[1]
          newTimes.push(newStop)
      }
      timetable[i].departures = newTimes
      if (timetable[i].startdayofweek == "Monday" &&  timetable[i].enddayofweek == "Sunday") {
        output["Monday-Friday"] = output["Monday-Friday"].concat(timetable[i].departures)
        output["Saturday"] = output["Saturday"].concat(timetable[i].departures)
        output["Sunday"] = output["Sunday"].concat(timetable[i].departures)
      }
      if (timetable[i].startdayofweek == "Saturday") {
        output["Saturday"] = output["Saturday"].concat(timetable[i].departures)
    }
      if (timetable[i].startdayofweek == "Monday" &&  timetable[i].enddayofweek == "Friday") {
        output["Monday-Friday"] = output["Monday-Friday"].concat(timetable[i].departures)
      }
    }
    this.setState({data: output, isLoading: false, chosenTimetable: day, bus: bus, stop: currentStop});
  }

  filterData(array) {
    let newListTimes = []
    let previousTime = array[0].split(":")
    for (i=0;i<array.length;i++){
      if (i == 0) {
        continue;
      }
      let currentTime = array[i].split(":")
      if ((parseInt(currentTime[0]) == parseInt(previousTime[0]) && parseInt(currentTime[1]) <= parseInt(previousTime[1]) + 15) || (parseInt(currentTime[0]) == parseInt(previousTime[0]) + 1 && parseInt(currentTime[1]) + 45 <= parseInt(previousTime[1]))) {
        continue;
      }
      else {
        newListTimes.push(previousTime[0] + ":" + previousTime[1])
        previousTime = array[i].split(":")
      }
    }
    return newListTimes
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
                <Text style = {{color: 'white'}}>The stop timetable for the {this.state.bus} on {this.state.chosenTimetable} at stop {this.state.stop}</Text>
              </View>
              <FlatList
                data = {this.filterData(this.state.data[this.state.chosenTimetable].sort())}
                keyExtractor = {(item, index) => index.toString()}
                renderItem = {({item}) => (
                  <View style = {styles.listItem}>
                    <Text style={{fontSize: 18}}>{item}</Text>
                  </View>
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
    paddingTop: Platform.OS === 'ios' ? 20 : 0
  },
  list: {
    width: '100%',
    flex: 1,
  },
  listItem: {
    width: '100%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 0.5,
    alignItems: 'center',
    paddingLeft: '15%'
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
  busBar: {
    backgroundColor: '#2980b9',
    paddingLeft: '5%',
    paddingRight: '5%',
    alignItems: 'center',
    height: '8%',
    flexDirection: 'row',
    display: 'flex',
  },
  
});
