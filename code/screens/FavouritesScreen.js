import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage,
  FlatList,
  TouchableOpacity,
  Alert,
  DeviceEventEmitter
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import RTPISecondScreen from './RTPISecondScreen';
import RTPIThirdScreen from './RTPIThirdScreen';
import RTPIFourthScreen from './RTPIFourthScreen';
import OfflineTimetableScreen from './OfflineTimetableScreen';
import FareCalculator from './FareCalculator';
import FareScreen from './FareScreen';

const KEY = "favourites";

export class FavouritesScreen extends Component {

  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {
      favourites: [],
    }
  }

  get = async () => {
    try {
      let data = await AsyncStorage.getItem(KEY);
      if (data !== null) {
        let newData = JSON.parse(data);
        this.setState({favourites: newData});
      }
    } catch(e) {
      console.log(e);
    }
  }

  remove = async (stopId) => {
    try {
      let data = await AsyncStorage.getItem(KEY);
      data = JSON.parse(data);
      let index = 0;
      for (i=0;i<data.length;i++) {
        if (data[i].stop == stopId) {
          index = i;
        }
      }
      data.splice(index, 1);
      let newJsonData = JSON.stringify(data);
      await AsyncStorage.setItem(KEY, newJsonData)
      this.setState({favourites: data});
    } catch(e) {
      console.log(e);
    }
  }

  componentWillMount() {
    this.get();
  }

  async componentDidMount() {
    await DeviceEventEmitter.addListener('addToStorage', () => {
      this.get();
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.favourites.length >= 1) {
      return (
          <View style={styles.container}>
            <FlatList style = {styles.list}
              data={this.state.favourites}
              keyExtractor = {(item, index) => index.toString()}
              renderItem = {({item}) => (
                <TouchableOpacity onPress={() => navigate('RTPISecondScreen', {text: item.stop})}
                  onLongPress={() => {
                      Alert.alert(
                        `Delete favourite "${item.name}"?`,
                        `Do you want to delete favourite "${item.name}"?`,
                        [
                          {text: 'Cancel', onPress: () => console.log("cancelled"), style: 'cancel'},
                          {text: 'OK', onPress: () => this.remove(item.stop)}
                        ],
                        {cancelable: false}
                      )
                  }
                }>
                  <View style={styles.listItem}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.name}</Text>
                    <Text style={{fontSize: 12}}>{item.stop}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
    			</View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>You have no favourites, add some in the Stops screen!</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
		width: '100%',
		height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: Platform.OS === 'ios' ? 25 : 0
  },
  list: {
    width: '100%',
    flex: 1,
  },
  listItem: {
    width: '100%',
    height: 60,
    flexDirection: 'column',
    borderWidth: 0.5,
    paddingLeft: '10%',
    justifyContent: 'center',
  },
});

export default myscreens = StackNavigator({
  FavouritesScreen: {screen: FavouritesScreen},
  RTPISecondScreen: {screen: RTPISecondScreen},
  RTPIThirdScreen: {screen: RTPIThirdScreen},
  RTPIFourthScreen: {screen: RTPIFourthScreen},
  OfflineTimetableScreen: {screen: OfflineTimetableScreen},
  FareCalculator: {screen: FareCalculator},
  FareScreen: {screen: FareScreen}
});
