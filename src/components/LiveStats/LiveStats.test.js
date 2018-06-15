import React from 'react';
import { shallow } from 'enzyme';
import LiveStats from 'components/LiveStats';

const createProps = props => ({
	isLive: false,
	currentBroadcast: null,
	viewers: {
		facebook_timeline: 100,
		facebook_page: 400,
	},
	...props,
});

describe('<LiveStats />', () => {
	test('renders snapshot', () => {
		const props = createProps();
		const wrapper = shallow(<LiveStats {...props} />);
		expect(wrapper).toMatchSnapshot();
	});

	test('should render preview icon if not live', () => {
		const props = createProps();
		const wrapper = shallow(<LiveStats {...props} />);
		expect(
			wrapper
				.children()
				.first()
				.text()
		).toBe('Preview');
	});

	test('should render live icon if live', () => {
		const props = createProps({ isLive: true });
		const wrapper = shallow(<LiveStats {...props} />);
		expect(
			wrapper
				.children()
				.first()
				.children()
				.first()
				.children()
				.last()
				.text()
		).toBe('Live');
	});

	test('should render all provider icons by default', () => {
		const props = createProps({ currentBroadcast: {} });
		const wrapper = shallow(<LiveStats {...props} />);
		expect(wrapper.find('Platforms')).toHaveLength(1);
	});

	test('should render number of viewers', () => {
		const props = createProps({
			isLive: true,
			currentBroadcast: {
				streamTargetContainers: [{ streamTarget: { provider: 'facebook' } }],
			},
		});
		const wrapper = shallow(<LiveStats {...props} />);
		expect(
			wrapper
				.children()
				.first()
				.children()
				.last()
				.children()
				.last()
				.text()
		).toBe('500');
	});

	test('should not render number of viewers', () => {
		const props = createProps({
			isLive: true,
			currentBroadcast: {
				streamTargetContainers: [{ streamTarget: { provider: 'youtube' } }],
			},
			viewers: null,
		});
		const wrapper = shallow(<LiveStats {...props} />);
		expect(
			wrapper
				.children()
				.first()
				.children()
				.last()
				.children()
		).toBe('500');
	});
});
