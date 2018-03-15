import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import FavouritesScreen from '../screens/FavouritesScreen';
import RTPIScreen from '../screens/RTPIScreen';
import RouteScreen from '../screens/RouteScreen';
import NewsScreen from '../screens/NewsScreen';
import { Constants } from 'expo';

export default TabNavigator(
  {
    Favourites: {
      screen: FavouritesScreen,
    },
    Stops: {
      screen: RTPIScreen,
    },
    Routes: {
      screen: RouteScreen,
    },
    News: {
      screen: NewsScreen,
    },
  },
  {
    navigationOptions:({navigation}) => ({
      tabBarIcon: ({ tintColor, focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Favourites':
            iconName =
              Platform.OS === 'ios'
                ? `ios-star${focused ? '' : '-outline'}`
                : 'md-star';
            break;
          case 'Stops':
            iconName =
              Platform.OS === 'ios'
                ? `ios-bus${focused ? '' : '-outline'}`
                : 'md-bus';
            break;
          case 'Routes':
            iconName = Platform.OS === 'ios' ? `ios-map${focused ? '' : '-outline'}` : 'md-map';
            break;
          case 'News':
            iconName =
              Platform.OS === 'ios' ? `ios-paper${focused ? '' : '-outline'}` : 'md-paper';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            color={tintColor}
          />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? 'red' : 'white',
      style: {
        backgroundColor: Platform.OS === 'android' ? '#3498db' : 'white',
        paddingTop:  Platform.OS === 'android' ? Constants.statusBarHeight : 0,
      },
      labelStyle: {
        fontSize: Platform.OS === 'android' ? 10 : 12,
      },
    },
  }
);
