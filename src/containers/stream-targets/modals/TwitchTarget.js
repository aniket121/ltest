import React, { Component } from 'react';
import TextField from 'components/TextField';
import Modal from 'components/Modal';
import LoaderButton from 'components/LoaderButton';
import styles from './styles.css';

class TwitchTarget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      name: ''
    };
  }

  handleNameChange = event => {
    this.setState({
      name: event.target.value
    });
  };

  shouldDisableCreate = () => !this.state.name || this.props.isSaving;

  handleSubmit = async event => {
    event.preventDefault();

    const { name } = this.state;
    const { streamGroupId } = this.props.match.params;
    const { token } = this.props;

    await this.props.createStreamTarget({
      name,
      token,
      provider: 'twitch',
      streamGroupId
    });
  };

  render() {
    const { name } = this.state;
    const { isModalOpen, modalType, closeModal, isSaving } = this.props;

    return (
      <Modal
        title="Create Twitch Target"
        open={isModalOpen && modalType === 'twitch_target'}
        closeModal={closeModal}
      >
        <form onSubmit={this.handleSubmit}>
          <div className={styles.modalContent}>
            <TextField
              name="name"
              label="Destination Target Name"
              hint="My twitch channel"
              type="text"
              value={name}
              onChange={this.handleNameChange}
            />
            <LoaderButton
              type="submit"
              isLoading={isSaving}
              text="Create"
              loadingText="Creating target..."
              disabled={this.shouldDisableCreate()}
            />
          </div>
        </form>
      </Modal>
    );
  }
}

export default TwitchTarget;
