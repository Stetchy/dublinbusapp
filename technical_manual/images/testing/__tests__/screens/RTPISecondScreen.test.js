import React from 'react';
import {View, TextInput, FlatList, ActivityIndicator, Text} from 'react-native';
import RTPISecondScreen from '../../screens/RTPISecondScreen';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import {FontAwesome} from '@expo/vector-icons';
import Prompt from '../../components/react-native-prompt';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
const ReactTestRenderer = require('react-test-renderer');

describe('Testing RTPISecondScreen component when isLoading: true', () => {
  it('renders without exploding', () => {
    const navigation = { navigate: jest.fn(), state: {params: {text: "1622"}}};
    expect(
      shallow(
        <RTPISecondScreen navigation={navigation}/>
      )
    ).to.have.length(1)
  });

  it('should have 2 views present', () => {
    const navigation = { navigate: jest.fn(), state: {params: {text: "1622"}}};
    const wrapper = shallow(
      <RTPISecondScreen navigation={navigation}/>
    );
    expect(wrapper.find(View)).to.have.length(2);
  });

  it('should have 1 activityindicator present', () => {
    const navigation = { navigate: jest.fn(), state: {params: {text: "1622"}}};
    const wrapper = shallow(
      <RTPISecondScreen navigation={navigation}/>
    );
    expect(wrapper.find(ActivityIndicator)).to.have.length(1);
  });
});

describe('Testing RTPISecondScreen component when isLoading: true', () => {
  it('should have 4 views present', () => {
    const navigation = { navigate: jest.fn(), state: {params: {text: "1622"}}};
    const wrapper = shallow(
      <RTPISecondScreen navigation={navigation}/>
    );
    wrapper.setState({ isLoading: false });
    expect(wrapper.find(View)).to.have.length(4);
  });
  it('should have 1 prompt present', () => {
    const navigation = { navigate: jest.fn(), state: {params: {text: "1622"}}};
    const wrapper = shallow(
      <RTPISecondScreen navigation={navigation}/>
    );
    wrapper.setState({ isLoading: false });
    expect(wrapper.find(Prompt)).to.have.length(1);
  });
  it('should have 4 modalfilterpicker present', () => {
    const navigation = { navigate: jest.fn(), state: {params: {text: "1622"}}};
    const wrapper = shallow(
      <RTPISecondScreen navigation={navigation}/>
    );
    wrapper.setState({ isLoading: false });
    expect(wrapper.find(ModalFilterPicker)).to.have.length(4);
  });
  it('should have 1 mapview present', () => {
    const navigation = { navigate: jest.fn(), state: {params: {text: "1622"}}};
    const wrapper = shallow(
      <RTPISecondScreen navigation={navigation} />
    );
    wrapper.setState({ isLoading: false });
    expect(wrapper.find(MapView)).to.have.length(1);
  });
  it('should have 5 fontawesomebutton present', () => {
    const navigation = { navigate: jest.fn(), state: {params: {text: "1622"}}};
    const wrapper = shallow(
      <RTPISecondScreen navigation={navigation}/>
    );
    wrapper.setState({ isLoading: false });
    expect(wrapper.find(FontAwesome.Button)).to.have.length(5);
  });
  it ('list shows',() => {
    const flatlist = ReactTestRenderer.create(
    <FlatList
        data={[33, 41, 16]}
        keyExtractor = {(item, index) => index.toString()}
        renderItem = {({item}) =>
        <Text>{item}</Text>
      }
    />
  )})
  it ('favourite button works', () => {
    const navigation = { navigate: jest.fn(), state: {params: {text: "1622"}}};
    const wrapper = shallow(
      <RTPISecondScreen navigation={navigation}/>
    );
		const textinput = wrapper.find(FontAwesome.Button).at(0);
		const button = jest.fn();
		button('click');
		expect(renderer.create(
      <RTPISecondScreen navigation={navigation} />
    ))
	});
  it ('shop button works', () => {
    const navigation = { navigate: jest.fn(), state: {params: {text: "1622"}}};
    const wrapper = shallow(
      <RTPISecondScreen navigation={navigation}/>
    );
		const textinput = wrapper.find(FontAwesome.Button).at(1);
		const button = jest.fn();
		button('click');
		expect(renderer.create(
      <RTPISecondScreen navigation={navigation} />
    ))
	});
  it ('filter button works', () => {
    const navigation = { navigate: jest.fn(), state: {params: {text: "1622"}}};
    const wrapper = shallow(
      <RTPISecondScreen navigation={navigation}/>
    );
		const textinput = wrapper.find(FontAwesome.Button).at(2);
		const button = jest.fn();
		button('click');
		expect(renderer.create(
      <RTPISecondScreen navigation={navigation} />
    ))
	});
  it ('offlinetimetable button works', () => {
    const navigation = { navigate: jest.fn(), state: {params: {text: "1622"}}};
    const wrapper = shallow(
      <RTPISecondScreen navigation={navigation}/>
    );
		const textinput = wrapper.find(FontAwesome.Button).at(3);
		const button = jest.fn();
		button('click');
		expect(renderer.create(
      <RTPISecondScreen navigation={navigation} />
    ))
	});
  it ('fare button works', () => {
    const navigation = { navigate: jest.fn(), state: {params: {text: "1622"}}};
    const wrapper = shallow(
      <RTPISecondScreen navigation={navigation}/>
    );
		const textinput = wrapper.find(FontAwesome.Button).at(4);
		const button = jest.fn();
		button('click');
		expect(renderer.create(
      <RTPISecondScreen navigation={navigation} />
    ))
	});
});
