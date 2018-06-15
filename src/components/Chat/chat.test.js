import React from 'react';
import { shallow } from 'enzyme';
import Chat, { 
  ChatMessage,
  ChatInput 
} from 'components/Chat';

const messages = [
  {
    author: 'Seba Pereyro',
    createdAt: new Date().toISOString(),
    message: 'This is cool?'
  },
  {
    author: 'Nick Evans',
    createdAt: new Date().toISOString(),
    message: 'Nice job mate!'
  },
  {
    author: 'Ian Wilson',
    createdAt: new Date().toISOString(),
    message: 'See you, space cowboy'
  }
];

const createWrapperProps = props => ({
  messages: [],
  ...props
})

const createProps = props => ({
  message: 'A default message',
  author: 'Unknown Jones',
  createdAt: "2017-09-01T03:06:29.980Z",
  ...props
});

const createInputProps = props => ({
  messageInput: '',
  onChange: jest.fn(),
  ...props
})

describe('Chat', () => {
  test('should render with default props', () => {
    const props = createWrapperProps();
    const wrapper = shallow(<Chat {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render list of messages', () => {
    const props = createWrapperProps({ messages });
    const wrapper = shallow(<Chat {...props} />);
    expect(wrapper.find(ChatMessage)).toHaveLength(props.messages.length);
  });

  // test('should render message input', () => {
  //   const props = createWrapperProps()
  //   const wrapper = shallow(<Chat {...props} />);
  //   expect(wrapper.find(ChatInput)).toHaveLength(1);
  // })
});

describe('ChatMessage', () => {
  test('should render with default props', () => {
    const props = createProps();
    const wrapper = shallow(<ChatMessage {...props} />);
    expect(wrapper).toMatchSnapshot();
  })
});

// describe('ChatInput', () => {
//   test('should render with default props', () => {
//     const props = createInputProps();
//     const wrapper = shallow(<ChatInput {...props} />);
//     expect(wrapper).toMatchSnapshot();
//   })

//   test('should render input buttons', () => {
//     const props = createInputProps();
//     const wrapper = shallow(<ChatInput {...props} />);
//     expect(wrapper.find('i.material-icons')).toHaveLength(2);
//   })
// });