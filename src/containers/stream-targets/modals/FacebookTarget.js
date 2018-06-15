import React, { Component } from 'react';
import request from 'request';
import TextField from 'components/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import env from 'config';
import Modal from 'components/Modal';
import LoaderButton from 'components/LoaderButton';
import styles from './styles.css';

class FacebookTarget extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			name: '',
			destination: 'timeline',
			privacy: 'only_me',
			groups: [],
			group: '',
			events: [],
			event: '',
			pages: [],
			page: '',
			pageAccessToken: '',
			destId: 'me',
		};
	}

	componentDidMount = async () => {
		const token = this.props.token;
		this.fetchFacebookGroups(token);
		this.fetchFacebookEvents(token);
		this.fetchFacebookPages(token);
	};

	handleNameChange = event => {
		this.setState({ name: event.target.value });
	};

	handleDestinationChange = (event, index, destination) => {
		this.setState({ destination });
	};

	handlePrivacyChange = (event, index, privacy) => {
		this.setState({ privacy });
	};

	handleGroupChange = (event, index, group) => {
		this.setState({
			destId: group,
			group: event.target.innerHTML,
		});
	};

	handlePageChange = (event, index, page) => {
		const { id, access_token } = JSON.parse(page);
		this.setState({
			destId: id,
			pageAccessToken: access_token,
			page: event.target.innerHTML,
		});
	};

	handleEventChange = (event, index, facebookEvent) => {
		this.setState({
			destId: facebookEvent,
			event: event.target.innerHTML,
		});
	};

	fetchFacebookGroups = async token => {
		const options = {
			url: `${env.GRAPH_API}/me/groups?access_token=${token.content.accessToken}`,
			headers: {
				'Content-Type': 'application/json',
			},
		};

		return new Promise((resolve, reject) => {
			request.get(options, async (err, response, body) => {
				if (err) {
					return reject(err);
				}
				const { data } = JSON.parse(body);

				await this.setState({ groups: data });

				resolve('Groups fetched');
			});
		});
	};

	fetchFacebookEvents = async token => {
		const options = {
			url: `${env.GRAPH_API}/me/events?access_token=${token.content.accessToken}`,
			headers: {
				'Content-Type': 'application/json',
			},
		};

		return new Promise((resolve, reject) => {
			request.get(options, async (err, response, body) => {
				if (err) {
					return reject(err);
				}
				const { data } = JSON.parse(body);

				await this.setState({ events: data });

				resolve('Events fetched');
			});
		});
	};

	fetchFacebookPages = async token => {
		const options = {
			url: `${env.GRAPH_API}/me/accounts?access_token=${token.content.accessToken}`,
			headers: {
				'Content-Type': 'application/json',
			},
		};

		return new Promise((resolve, reject) => {
			request.get(options, async (err, response, body) => {
				if (err) {
					return reject(err);
				}
				const { data } = JSON.parse(body);

				await this.setState({ pages: data });

				resolve('Pages fetched');
			});
		});
	};

	composeConfig = () => {
		const { destination, privacy, destId, pageAccessToken } = this.state;
		switch (destination) {
			case 'timeline':
				return {
					destId,
					destType: destination,
					privacy,
				};
			case 'page':
				return {
					destId,
					destType: destination,
					pageAccessToken,
				};
			default:
				return {
					destId,
					destType: destination,
				};
		}
	};

	shouldDisableCreate = () => {
		const { name, destination, groups, group, pages, event, events, pageAccessToken } = this.state;
		const { isSaving } = this.props;
		if (destination === 'timeline') {
			return !name || isSaving;
		} else if (destination === 'page') {
			return !name || !pages.length || !pageAccessToken || isSaving;
		} else if (destination === 'group') {
			return !name || !groups.length || !group || isSaving;
		} else if (destination === 'event') {
			return !name || !events.length || !event || isSaving;
		}
	};

	handleSubmit = async event => {
		event.preventDefault();
		const { name } = this.state;
		const { streamGroupId } = this.props.match.params;
		const { token } = this.props;
		const config = this.composeConfig();

		this.props.createStreamTarget({
			name,
			provider: 'facebook',
			streamGroupId,
			token,
			config,
		});
	};

	renderGroupDropdown() {
		return (
			<DropDownMenu
				name="group"
				value={this.state.destId}
				onChange={this.handleGroupChange}
				selectedMenuItemStyle={{ color: '#6908A1' }}
				style={{ width: 310 }}
				autoWidth={false}
			>
				{this.state.groups.map(group => <MenuItem key={group.id} value={group.id} primaryText={group.name} />)}
			</DropDownMenu>
		);
	}

	renderPagesDropdown() {
		return (
			<DropDownMenu
				name="page"
				value={JSON.stringify({
					id: this.state.destId,
					access_token: this.state.pageAccessToken,
				})}
				onChange={this.handlePageChange}
				style={{ width: 310 }}
				autoWidth={false}
				selectedMenuItemStyle={{ color: '#6908A1' }}
			>
				{this.state.pages.map(page => (
					<MenuItem
						key={page.id}
						value={JSON.stringify({
							id: page.id,
							access_token: page.access_token,
						})}
						primaryText={page.name}
					/>
				))}
			</DropDownMenu>
		);
	}

	renderEventsDropdown() {
		return (
			<DropDownMenu
				name="event"
				value={this.state.destId}
				onChange={this.handleEventChange}
				style={{ width: 310 }}
				autoWidth={false}
				selectedMenuItemStyle={{ color: '#6908A1' }}
			>
				{this.state.events.map(event => <MenuItem key={event.id} value={event.id} primaryText={event.name} />)}
			</DropDownMenu>
		);
	}

	renderPrivacyDropdown() {
		return (
			<DropDownMenu
				name="privacy"
				value={this.state.privacy}
				onChange={this.handlePrivacyChange}
				style={{ width: 310 }}
				autoWidth={false}
				selectedMenuItemStyle={{ color: '#6908A1' }}
			>
				<MenuItem value="only_me" primaryText="Only me" />
				<MenuItem value="friends" primaryText="Friends" />
				<MenuItem value="public" primaryText="Public" />
			</DropDownMenu>
		);
	}

	render() {
		const { isLoading, name, destination } = this.state;
		const { isModalOpen, modalType, closeModal, isSaving } = this.props;

		return (
			<Modal
				title="Create Facebook Target"
				open={isModalOpen && modalType === 'facebook_target'}
				closeModal={closeModal}
			>
				<form onSubmit={this.handleSubmit}>
					<div className={styles.modalContent}>
						<TextField
							name="name"
							label="Destination Target Name"
							hint="My Facebook Page"
							type="text"
							value={name}
							onChange={this.handleNameChange}
						/>
						<DropDownMenu
							name="destination"
							value={destination}
							onChange={this.handleDestinationChange}
							style={{ width: 310 }}
							autoWidth={false}
							selectedMenuItemStyle={{ color: '#6908A1' }}
						>
							<MenuItem value="timeline" primaryText="Timeline" />
							<MenuItem value="page" primaryText="Page" />
							<MenuItem value="group" primaryText="Group" />
							<MenuItem value="event" primaryText="Event" />
						</DropDownMenu>

						{destination === 'timeline' && this.renderPrivacyDropdown()}

						{destination === 'group' && this.renderGroupDropdown()}

						{destination === 'event' && this.renderEventsDropdown()}

						{destination === 'page' && this.renderPagesDropdown()}

						<LoaderButton
							disabled={this.shouldDisableCreate()}
							type="submit"
							isLoading={isSaving}
							text="Create"
							loadingText="Creating target..."
						/>
					</div>
				</form>
			</Modal>
		);
	}
}

export default FacebookTarget;
