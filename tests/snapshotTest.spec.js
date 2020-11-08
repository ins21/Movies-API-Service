import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';

import { AppTitle } from '../src/components/AppTitle/AppTitle.jsx';

configure({ adapter: new Adapter() });

describe('snapshot test of "AppTitle" component', () => {
  it('Must work correctly', () => {
    const wrapper = shallow(<AppTitle />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
