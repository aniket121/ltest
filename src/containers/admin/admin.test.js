import React from 'react';
import { Admin } from 'containers/admin';
import { shallow } from 'enzyme';

const createProps = props => ({
  subscribers: [
    { email: 'a@a.com', subscriberId: 'id-a', beta: false },
    { email: 'b@b.com', subscriberId: 'id-b', beta: false },
    { email: 'c@c.com', subscriberId: 'id-c', beta: false }
  ],
  user: {
    admin: false
  },
  history: {
    push: jest.fn()
  },
  ...props
});

describe('<Admin />', () => {
  test('renders snapshot', () => {
    const props = createProps();
    const wrapper = shallow(<Admin {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('redirects if user is not admin', () => {
    const props = createProps();
    const wrapper = shallow(<Admin {...props} />);
    expect(props.history.push).toHaveBeenCalled();
  });

  test('does not redirect if user is admin', () => {
    const props = createProps({ user: { admin: true } });
    const wrapper = shallow(<Admin {...props} />);
    expect(props.history.push).not.toHaveBeenCalled();
  });
});
