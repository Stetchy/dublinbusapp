import React from 'react';
import {View, TextInput, FlatList, ActivityIndicator, Text} from 'react-native';
import MapView from 'react-native-maps';
import FareScreen from '../../screens/FareScreen';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

describe('Testing FareScreen component', () => {
  it('renders without exploding', () => {
    const navigation = { navigate: jest.fn(), state: {params: {adultAndStudentFare: {leap: "€1.50", cash: "€2.10"}, childFare: {schoolLeap: "€0.80", schoolCash: "€1.00", leap: "€0.95", cash: "€1.20"}}}};
    expect(
      shallow(
        <FareScreen navigation={navigation}/>
      )
    ).to.have.length(1)
  });

  it('should have 4 views present', () => {
    const navigation = { navigate: jest.fn(), state: {params: {adultAndStudentFare: {leap: "€1.50", cash: "€2.10"}, childFare: {schoolLeap: "€0.80", schoolCash: "€1.00", leap: "€0.95", cash: "€1.20"}}}};
    const wrapper = shallow(
      <FareScreen navigation={navigation}/>
    );
    expect(wrapper.find(View)).to.have.length(4);
  });
  it('should have 6 texts present', () => {
    const navigation = { navigate: jest.fn(), state: {params: {adultAndStudentFare: {leap: "€1.50", cash: "€2.10"}, childFare: {schoolLeap: "€0.80", schoolCash: "€1.00", leap: "€0.95", cash: "€1.20"}}}};
    const wrapper = shallow(
      <FareScreen navigation={navigation}/>
    );
    expect(wrapper.find(Text)).to.have.length(6);
  });
  it ('navigation works', () => {
    const navigation = { navigate: jest.fn(), state: {params: {adultAndStudentFare: {leap: "€1.50", cash: "€2.10"}, childFare: {schoolLeap: "€0.80", schoolCash: "€1.00", leap: "€0.95", cash: "€1.20"}}}};
    const wrapper = shallow(
      <FareScreen navigation={navigation}/>
    );
    const textinput = wrapper.find(MapView).at(0);
    const busstop = {stop : 1622};
    textinput.value = busstop.stop;
    const touchableopacity = jest.fn();
    touchableopacity('click');
    expect(renderer.create(
      <FareScreen navigation={navigation} />
    ))
  });
});
