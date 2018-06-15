import React from 'react';
import { shallow, mount } from 'enzyme';
import BroadcastControls, { 
  PreparingInternet,
  ReadyToGoLive
} from 'components/BroadcastControls';

const createProps = props => ({
  isLoading: false, 
  isLive: false, 
  showCountdown: false, 
  shouldEnableGoLive: false,
  ...props
});

describe('BroadcastControls', () => {
  test('renders with default props', () => {
    const props = createProps();
    const wrapper = shallow(<BroadcastControls {...props} />);
    expect(wrapper).toMatchSnapshot();
  })

  test('renders `waiting` message while stream prepares to go live', () => {
    const props = createProps()
    const wrapper = shallow(<BroadcastControls {...props} />);
    expect(wrapper.find(PreparingInternet)).toHaveLength(1);
  });

  test('renders `ready` when stream is prepared to go live', () => {
    const props = createProps({
      shouldEnableGoLive: true
    });
    const wrapper = mount(<BroadcastControls {...props} />);
    expect(wrapper.find(ReadyToGoLive)).toHaveLength(1);
    expect(wrapper.find('GoLiveButton')).toHaveLength(1);
    expect(wrapper.find('PillButton')).toHaveLength(1);
  });

  test('should not render `Go Live` no when stream is in countdown', () => {
    const props = createProps({
      shouldEnableGoLive: true,
      showCountdown: true
    });
    const wrapper = mount(<BroadcastControls {...props} />);
    expect(wrapper.find('GoLiveButton')).toHaveLength(0);
    expect(wrapper.find('PillButton')).toHaveLength(1);
  });

  test('should render `FinishButton` when stream is live', () => {
    const props = createProps({
      shouldEnableGoLive: true,
      showCountdown: false,
      isLive: true
    });
    const wrapper = mount(<BroadcastControls {...props} />);
    expect(wrapper.find('.FinishButton')).toHaveLength(1);

  });
});