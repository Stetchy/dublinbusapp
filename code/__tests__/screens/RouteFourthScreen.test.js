import React from 'react';
import {View, TextInput, FlatList, ActivityIndicator} from 'react-native';
import RouteFourthScreen from '../../screens/RouteFourthScreen';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

describe('Testing RouteFourthScreen component when isLoading: true', () => {
  it('renders without exploding', () => {
    const navigation = { navigate: jest.fn(), state: {params: {text: "33"}}};
    expect(
      shallow(
        <RouteFourthScreen navigation={navigation} />
      )
    ).to.have.length(1)
  });

  it('should have 2 views present', () => {
    const navigation = { navigate: jest.fn(), state: {params: {text: "33"}}};
    const wrapper = shallow(
      <RouteFourthScreen navigation={navigation}/>
    );
    expect(wrapper.find(View)).to.have.length(2);
  });
  it('should have 1 activityindicator present', () => {
    const navigation = { navigate: jest.fn(), state: {params: {text: "33"}}};
    const wrapper = shallow(
      <RouteFourthScreen navigation={navigation}/>
    );
    expect(wrapper.find(ActivityIndicator)).to.have.length(1);
  });
});

describe('Testing RouteFourthScreen component when isLoading: false', () => {
});
