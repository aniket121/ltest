import React from 'react';
import { shallow } from 'enzyme';
import YoutubeTarget from 'containers/stream-targets/modals/YoutubeTarget';
import ErrorMessage from 'components/Error';

const createProps = props => ({
  ...props
});

describe('<YoutubeTarget />', () => {
  test('renders snapshot', () => {
    const wrapper = shallow(<YoutubeTarget />);
    expect(wrapper).toMatchSnapshot();
  });

  test('shows error message if an error exists', () => {
    const props = createProps({ error: 'Failed to create youtube target' });
    const wrapper = shallow(<YoutubeTarget {...props} />);
    expect(wrapper.find(ErrorMessage)).toHaveLength(1);
  })

  test('doesnt show error message if no error exists', () => {
    const props = createProps();
    const wrapper = shallow(<YoutubeTarget {...props} />);
    expect(wrapper.find(ErrorMessage)).toHaveLength(0);
  })
});
