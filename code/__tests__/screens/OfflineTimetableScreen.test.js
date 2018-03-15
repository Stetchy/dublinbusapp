import React from 'react';
import {View, TextInput, FlatList, ActivityIndicator, Text} from 'react-native';
import OfflineTimetableScreen from '../../screens/OfflineTimetableScreen';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

describe('Testing OfflineTimetableScreen component when isLoading: true', () => {
  it('renders without exploding', () => {
    const navigation = { navigate: jest.fn(), state: {params: {text: "1622"}}};
    expect(
      shallow(
        <OfflineTimetableScreen navigation={navigation}/>
      )
    ).to.have.length(1)
  });

  it('should have 2 views present', () => {
    const navigation = { navigate: jest.fn(), state: {params: {text: "1622"}}};
    const wrapper = shallow(
      <OfflineTimetableScreen navigation={navigation}/>
    );
    expect(wrapper.find(View)).to.have.length(2);
  });
  it('should have 1 activityindicator present', () => {
    const navigation = { navigate: jest.fn(), state: {params: {text: "1622"}}};
    const wrapper = shallow(
      <OfflineTimetableScreen navigation={navigation}/>
    );
    expect(wrapper.find(ActivityIndicator)).to.have.length(1);
  });
});

describe('Testing OfflineTimetableScreen component when isLoading: false', () => {
});
