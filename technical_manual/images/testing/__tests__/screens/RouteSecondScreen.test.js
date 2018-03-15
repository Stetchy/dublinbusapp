import React from 'react';
import {View, clickedRouteInput, FlatList, ActivityIndicator, Text} from 'react-native';
import RouteSecondScreen from '../../screens/RouteSecondScreen';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
const ReactTestRenderer = require('react-test-renderer');

describe('Testing RouteSecondScreen component when isLoading: true', () => {
  it('renders without exploding', () => {
    const navigation = { navigate: jest.fn(), state: {params: {clickedRoute: "33"}}};
    expect(
      shallow(
        <RouteSecondScreen navigation={navigation} />
      )
    ).to.have.length(1)
  });

  it('should have 2 views present', () => {
    const navigation = { navigate: jest.fn(), state: {params: {clickedRoute: "33"}}};
    const wrapper = shallow(
      <RouteSecondScreen navigation={navigation}/>
    );
    expect(wrapper.find(View)).to.have.length(2);
  });
  it('should have 1 activityindicator present', () => {
    const navigation = { navigate: jest.fn(), state: {params: {clickedRoute: "33"}}};
    const wrapper = shallow(
      <RouteSecondScreen navigation={navigation}/>
    );
    expect(wrapper.find(ActivityIndicator)).to.have.length(1);
  });
});

describe('Testing RouteSecondScreen component when isLoading: false', () => {
  it('should have 3 views present', () => {
    const navigation = { navigate: jest.fn(), state: {params: {clickedRoute: "33"}}};
    const wrapper = shallow(
      <RouteSecondScreen navigation={navigation}/>
    );
    wrapper.setState({ isLoading: false })
    expect(wrapper.find(View)).to.have.length(3);
  });
  it('should have 1 flatlist present', () => {
    const navigation = { navigate: jest.fn(), state: {params: {clickedRoute: "33"}}};
    const wrapper = shallow(
      <RouteSecondScreen navigation={navigation}/>
    );
    wrapper.setState({ isLoading: false })
    expect(wrapper.find(FlatList)).to.have.length(1);
  });
  it ('navigation works', () => {
    const navigation = {navigate : jest.fn()};
    const wrapper = shallow(
      <RouteSecondScreen navigation={navigation}/>
    );
		const textinput = wrapper.find(FlatList).at(0);
    const route = {direction: "Dublin Airport -> Sutton Station"};
		textinput.value = route.direction;
		const touchableopacity = jest.fn();
		touchableopacity('click');
		expect(renderer.create(
      <RouteSecondScreen navigation={navigation} />
    ))
	});
});
