import React from 'react';
import { shallow, mount } from 'enzyme';
import SignInProviders, { Provider } from 'components/SignInProviders';

const createProps = settings => ({
  message: 'Log in with',
  ...settings
});

describe('<SignInProviders />', () => {
  test('renders with default props', () => {
    const props = createProps();
    const wrapper = shallow(<SignInProviders {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('renders with all three providers', () => {
    const props = createProps();
    const wrapper = shallow(<SignInProviders {...props} />);
    expect(wrapper.find(Provider)).toHaveLength(3);
  });
})
