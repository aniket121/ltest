import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'components/TextField';
import Modal from 'components/Modal';
import LoaderButton from 'components/LoaderButton';
import ErrorMessage from 'components/Error';
import styles from './styles.css';

class YoutubeTarget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      name: '',
      privacyStatus: 'public'
    };
  }

  handleNameChange = event => {
    this.setState({
      name: event.target.value
    });
  };

  handlePrivacyStatusChange = (event, index, privacyStatus) => {
    this.setState({ privacyStatus });
  };

  shouldDisableCreate = () => !this.state.name || this.props.isSaving;

  handleSubmit = async event => {
    event.preventDefault();

    const { name, privacyStatus } = this.state;
    const { streamGroupId } = this.props.match.params;
    const { token } = this.props;

    await this.props.createStreamTarget({
      name,
      token,
      provider: 'youtube',
      privacyStatus,
      streamGroupId
    });
  };

  render() {
    const { name } = this.state;
    const { isModalOpen, modalType, closeModal, isSaving, error } = this.props;

    return (
      <Modal
        title="Create Youtube Target"
        open={isModalOpen && modalType === 'youtube_target'}
        closeModal={closeModal}
      >
        <form onSubmit={this.handleSubmit}>
          <div className={styles.modalContent}>
            <TextField
              name="name"
              label="Destination Target Name"
              hint="My youtube channel"
              type="text"
              value={name}
              onChange={this.handleNameChange}
            />

            <DropDownMenu
              name="privacyStatus"
              value={this.state.privacyStatus}
              onChange={this.handlePrivacyStatusChange}
              style={{ width: 310 }}
              selectedMenuItemStyle={{ color: '#6908A1' }}
              autoWidth={false}
            >
              <MenuItem value="public" primaryText="Public" />
              <MenuItem value="private" primaryText="Private" />
              <MenuItem value="unlisted" primaryText="Unlisted" />
            </DropDownMenu>

            <LoaderButton
              type="submit"
              isLoading={isSaving}
              text="Create"
              loadingText="Creating target..."
              disabled={this.shouldDisableCreate()}
            />

            {error && <ErrorMessage message={error.message} link={error.link} />}
          </div>
        </form>
      </Modal>
    );
  }
}

export default YoutubeTarget;
