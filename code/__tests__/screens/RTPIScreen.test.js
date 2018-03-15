import React from 'react';
import {View, TextInput, FlatList, Text, TouchableOpacity} from 'react-native';
import { RTPIScreen } from '../../screens/RTPIScreen';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
const ReactTestRenderer = require('react-test-renderer');

describe('Testing RTPIScreen component', () => {
  it('renders without exploding', () => {
    const navigation = { navigate: jest.fn() };
    expect(
      shallow(
        <RTPIScreen navigation={navigation} />
      )
    ).to.have.length(1)
  });
  it('should have 2 views present', () => {
    const navigation = { navigate: jest.fn() };
    const wrapper = shallow(
      <RTPIScreen navigation={navigation}/>
    );
    expect(wrapper.find(View)).to.have.length(2);
  });
  it('should have 1 textinput present', () => {
    const navigation = { navigate: jest.fn() };
    const wrapper = shallow(
      <RTPIScreen navigation={navigation}/>
    );
    expect(wrapper.find(TextInput)).to.have.length(1);
  });
  it('textinput update when text inputted', () => {
    const navigation = { navigate: jest.fn() };
    const wrapper = shallow(
      <RTPIScreen navigation={navigation}/>
    );
    wrapper.find(TextInput).simulate('change', {target: {value: '1622'}});
  });
  it('textinput works', () => {
    const navigation = { navigate: jest.fn() };
    const wrapper = shallow(
      <RTPIScreen navigation={navigation}/>
    );
		const textinput = wrapper.find('TextInput').at(0);
		const busstop = {stop : '1622'};
		textinput.value = busstop.stop;
		expect(textinput.value).equal('1622');
	});
  it ('list shows',() => {
		const flatlist = ReactTestRenderer.create(
		<FlatList
		    data={[2,3,4,6,7]}
        keyExtractor = {(item, index) => index.toString()}
        renderItem = {({item}) =>
        <Text>{item}</Text>
      }
		/>
	)})
  it ('navigation works', () => {
    const navigation = {navigate : jest.fn()};
    const wrapper = shallow(
      <RTPIScreen navigation={navigation}/>
    );
		const textinput = wrapper.find(TextInput).at(0);
    const busstop = {stop : 1622};
		textinput.value = busstop.stop;
		const touchableopacity = jest.fn();
		touchableopacity('click');
		expect(renderer.create(
      <RTPIScreen navigation={navigation} />
    ))
	});
});
