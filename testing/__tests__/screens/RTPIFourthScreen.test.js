import React from 'react';
import {View, TextInput, FlatList, ActivityIndicator, Text} from 'react-native';
import MapView from 'react-native-maps';
import RTPIFourthScreen from '../../screens/RTPIFourthScreen';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
const ReactTestRenderer = require('react-test-renderer');

describe('Testing RTPIFourthScreen component', () => {
  it('renders without exploding', () => {
    const navigation = { navigate: jest.fn(), state: {params: {longitude: -6.246393889, latitude: 53.39003694, latitude: 53.39003694, stopLng: -6.246393889, stopnumber: "1622", item: {name: "First Stop", latitude: 53.39003694, longitude: -6.246393889}}}};
    expect(
      shallow(
        <RTPIFourthScreen navigation={navigation}/>
      )
    ).to.have.length(1)
  });

  it('should have 5 views present', () => {
    const navigation = { navigate: jest.fn(), state: {params: {longitude: -6.246393889, latitude: 53.39003694, stopLng: -6.246393889, stopLat: 53.39003694, stopnumber: "1622", item: {name: "First Stop", latitude: 53.39003694, longitude: -6.246393889}}}};
    const wrapper = shallow(
      <RTPIFourthScreen navigation={navigation}/>
    );
    expect(wrapper.find(View)).to.have.length(5);
  });
  it('should have 1 mapview present', () => {
    const navigation = { navigate: jest.fn(), state: {params: {longitude: -6.246393889, latitude: 53.39003694, latitude: 53.39003694, stopLng: -6.246393889, stopnumber: "1622", item: {name: "First Stop", latitude: 53.39003694, longitude: -6.246393889}}}};
    const wrapper = shallow(
      <RTPIFourthScreen navigation={navigation}/>
    );
    expect(wrapper.find(MapView)).to.have.length(1);
  });
  it('should have 1 flatlist present', () => {
    const navigation = { navigate: jest.fn(), state: {params: {longitude: -6.246393889, latitude: 53.39003694, latitude: 53.39003694, stopLng: -6.246393889, stopnumber: "1622", item: {name: "First Stop", latitude: 53.39003694, longitude: -6.246393889}}}};
    const wrapper = shallow(
      <RTPIFourthScreen navigation={navigation}/>
    );
    wrapper.setState({ numBuses: 1 });
    expect(wrapper.find(FlatList)).to.have.length(1);
  });
  it('should have 3 texts present', () => {
    const navigation = { navigate: jest.fn(), state: {params: {longitude: -6.246393889, latitude: 53.39003694, latitude: 53.39003694, stopLng: -6.246393889, stopnumber: "1622", item: {name: "First Stop", latitude: 53.39003694, longitude: -6.246393889}}}};
    const wrapper = shallow(
      <RTPIFourthScreen navigation={navigation}/>
    );
    expect(wrapper.find(Text)).to.have.length(3);
  });
  it('list shows',() => {
    const flatlist = ReactTestRenderer.create(
    <FlatList
        data={[33, 41, 16]}
        keyExtractor = {(item, index) => index.toString()}
        renderItem = {({item}) =>
        <Text>{item}</Text>
      }
    />
  )})

  it('tests state', () => {
    const navigation = { navigate: jest.fn(), state: {params: {longitude: -6.246393889, latitude: 53.39003694, latitude: 53.39003694, stopLng: -6.246393889, stopnumber: "1622", item: {name: "First Stop", latitude: 53.39003694, longitude: -6.246393889}}}};
    const wrapper = shallow(
      <RTPIFourthScreen navigation={navigation}/>
    );
    const instance = wrapper.instance();
    jestExpect(instance.state.distance).toBe(0);
  })

});
