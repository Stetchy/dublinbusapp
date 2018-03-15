import { TouchableOpacity, Text, FlatList, View } from 'react-native';
import { FavouritesScreen } from '../../screens/FavouritesScreen';
import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
const ReactTestRenderer = require('react-test-renderer');

describe('Testing FavouritesScreen component', () => {
  it('renders without exploding', () => {
    const navigation = { navigate: jest.fn() };
    expect(
      shallow(
        <FavouritesScreen navigation={navigation} />
      )
    ).to.have.length(1)
  });

  it('should have 1 view present', () => {
    const navigation = { navigate: jest.fn() };
    const wrapper = shallow(
      <FavouritesScreen navigation={navigation}/>
    );
    expect(wrapper.find(View)).to.have.length(1);
  });
  it ('list shows',() => {
		const flatlist = ReactTestRenderer.create(
		<FlatList
		    data={["First Favourite", "Second Favourite"]}
        keyExtractor = {(item, index) => index.toString()}
        renderItem = {({item}) =>
        <Text>{item}</Text>
      }
		/>
	)})
  it ('navigation works', () => {
    const navigation = {navigate : jest.fn()};
    const wrapper = shallow(
      <FavouritesScreen navigation={navigation}/>
    );
		const textinput = wrapper.find(FlatList).at(0);
    const favourite = {stoo: 3844};
		textinput.value = favourite.stop;
		const touchableopacity = jest.fn();
		touchableopacity('click');
		expect(renderer.create(
      <FavouritesScreen navigation={navigation} />
    ))
	});
});
