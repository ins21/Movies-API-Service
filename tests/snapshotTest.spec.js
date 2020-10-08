import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import { AppTitle } from '../src/app/components/AppTitle/AppTitle.jsx';

jest.mock('../src/app/components/AppTitle/AppTitle.scss', () => ({}));

configure({ adapter: new Adapter() });

describe('snapshot test of "AppTitle" component', () => {
  it('Must work correctly', () => {
    const wrapper = shallow(<AppTitle />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
