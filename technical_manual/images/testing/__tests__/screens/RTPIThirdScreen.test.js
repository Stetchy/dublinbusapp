import React from 'react';
import {View, TextInput, FlatList, ActivityIndicator, Text} from 'react-native';
import MapView from 'react-native-maps';
import RTPIThirdScreen from '../../screens/RTPIThirdScreen';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
const ReactTestRenderer = require('react-test-renderer');

describe('Testing RTPIThirdScreen component', () => {
  it('renders without exploding', () => {
    const navigation = { navigate: jest.fn(), state: {params: {longitude: -6.246393889, latitude: 53.39003694, stopnumber: "1622"}}};
    expect(
      shallow(
        <RTPIThirdScreen navigation={navigation}/>
      )
    ).to.have.length(1)
  });

  it('should have 1 view present', () => {
    const navigation = { navigate: jest.fn(), state: {params: {longitude: -6.246393889, latitude: 53.39003694, stopnumber: "1622"}}};
    const wrapper = shallow(
      <RTPIThirdScreen navigation={navigation}/>
    );
    expect(wrapper.find(View)).to.have.length(1);
  });
  it('should have 1 mapview present', () => {
    const navigation = { navigate: jest.fn(), state: {params: {longitude: -6.246393889, latitude: 53.39003694, stopnumber: "1622"}}};
    const wrapper = shallow(
      <RTPIThirdScreen navigation={navigation}/>
    );
    expect(wrapper.find(MapView)).to.have.length(1);
  });
  it ('list shows',() => {
    const flatlist = ReactTestRenderer.create(
    <FlatList
        data={["Centra", "Dominoes", "Apache"]}
        keyExtractor = {(item, index) => index.toString()}
        renderItem = {({item}) =>
        <Text>{item}</Text>
      }
    />
  )})
});
