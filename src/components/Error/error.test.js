import React from 'react';
import ErrorMessage from 'components/Error';
import { shallow } from 'enzyme';

const createProps = props => ({
  message: 'An error occurred',
  ...props
});

describe('<Error />', () => {
  test('renders snapshot', () => {
    const props = createProps();
    const wrapper = shallow(<ErrorMessage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('renders with default message', () => {
    const props = createProps();
    const wrapper = shallow(<ErrorMessage {...props} />);
    expect(wrapper.text()).toEqual(props.message);
  });

  test('renders with no link', () => {
    const props = createProps();
    const wrapper = shallow(<ErrorMessage {...props} />);
    expect(wrapper.find('.errorLink')).toHaveLength(0);
  })

  test('renders clickable link', () => {
    const props = createProps({ link: 'https://www.youtube.com/live_dashboard_splash' });
    const wrapper = shallow(<ErrorMessage {...props} />);
    expect(wrapper.find('.errorLink')).toHaveLength(1);
  })
})
