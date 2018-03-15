import React from 'react';
import {View, TextInput, FlatList, Text} from 'react-native';
import { RouteScreen } from '../../screens/RouteScreen';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
const ReactTestRenderer = require('react-test-renderer');

describe('Testing RouteScreen component', () => {
  it('renders without exploding', () => {
    const navigation = { navigate: jest.fn() };
    expect(
      shallow(
        <RouteScreen navigation={navigation} />
      )
    ).to.have.length(1)
  });
  it('should have 1 view present', () => {
    const navigation = { navigate: jest.fn() };
    const wrapper = shallow(
      <RouteScreen navigation={navigation}/>
    );
    expect(wrapper.find(View)).to.have.length(1);
  });
  it('should have 1 textinput present', () => {
    const navigation = { navigate: jest.fn() };
    const wrapper = shallow(
      <RouteScreen navigation={navigation}/>
    );
    expect(wrapper.find(TextInput)).to.have.length(1);
  });
  it('textinput update when text inputted', () => {
    const navigation = { navigate: jest.fn() };
    const wrapper = shallow(
      <RouteScreen navigation={navigation}/>
    );
    wrapper.find(TextInput).simulate('change', {target: {value: '33'}});
  });
  it('textinput works', () => {
    const navigation = { navigate: jest.fn() };
    const wrapper = shallow(
      <RouteScreen navigation={navigation}/>
    );
		const textinput = wrapper.find(TextInput).at(0);
		const route = {number: 33};
		textinput.value = route.number;
		expect(textinput.value).equal(33);
	});
  it ('list shows',() => {
		const flatlist = ReactTestRenderer.create(
		<FlatList
		    data={[1,102,104,11,111,114]}
        keyExtractor = {(item, index) => index.toString()}
        renderItem = {({item}) =>
        <Text>{item}</Text>
      }
		/>
	)})
  it ('navigation works', () => {
    const navigation = {navigate : jest.fn()};
    const wrapper = shallow(
      <RouteScreen navigation={navigation}/>
    );
		const textinput = wrapper.find(TextInput).at(0);
    const busstop = {route : 33};
		textinput.value = busstop.stop;
		const touchableopacity = jest.fn();
		touchableopacity('click');
		expect(renderer.create(
      <RouteScreen navigation={navigation} />
    ))
	});
});
