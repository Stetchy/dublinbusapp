import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mock from 'react-native-mock-render';
import chai from 'chai';

configure({ adapter: new Adapter() });

global.jestExpect = global.expect;
global.expect = chai.expect;
