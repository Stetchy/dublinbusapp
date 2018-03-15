import React from 'react';
import {View, WebView} from 'react-native';
import NewsScreen from '../../screens/NewsScreen';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

jest.unmock('ScrollView');

describe('Testing NewsScreen component', () => {
  it('renders without exploding', () => {
    const navigation = { navigate: jest.fn() };
    expect(
      shallow(
        <NewsScreen navigation={navigation} />
      )
    ).to.have.length(1)
  });

  it('should have 1 view present', () => {
    const navigation = { navigate: jest.fn() };
    const wrapper = shallow(
      <NewsScreen navigation={navigation}/>
    );
    expect(wrapper.find(View)).to.have.length(1);
  });
  it('should have 1 webview present', () => {
    const navigation = { navigate: jest.fn() };
    const wrapper = shallow(
      <NewsScreen navigation={navigation}/>
    );
    expect(wrapper.find(WebView)).to.have.length(1);
  });
});
