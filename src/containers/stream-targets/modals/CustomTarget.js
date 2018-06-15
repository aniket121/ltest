import React, { Component } from 'react';
import TextField from 'components/TextField';
import Modal from 'components/Modal';
import LoaderButton from 'components/LoaderButton';
import styles from './styles.css';

class CustomTarget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      name: '',
      streamUrl: '',
       key: ''
      
    };
  }

  handleChange = event => {

    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(event.target.name)
  };

  shouldDisableCreate = () => {
    const { name, streamUrl,key, isSaving } = this.state;
    return !name || !streamUrl || !key || isSaving ;
  };

  handleSubmit = async event => {
    event.preventDefault();

    const { name, streamUrl,key } = this.state;
    const { streamGroupId } = this.props.match.params;

    this.setState({ isLoading: true });

    try {
      await this.props.createStreamTarget({
        name,
        provider: 'custom',
        streamGroupId,
        config: {
          streamUrl,
          key
        }
      });
      this.setState({ isLoading: false });
      this.props.history.push(`/destinations/${streamGroupId}`);
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { isLoading, name, streamUrl,key } = this.state;
    const { isModalOpen, modalType, closeModal, isSaving } = this.props;

    return (
      <Modal
        title="Create Custom RTMP"
        open={isModalOpen && modalType === 'custom_target'}
        closeModal={closeModal}
      >
        <form onSubmit={this.handleSubmit}>
          <div className={styles.modalContent}>
            <TextField
              name="name"
              label="Stream Name"
              hint="My YouTube Channel"
              type="text"
              value={name}
              onChange={this.handleChange}
            />
            <TextField
              className={styles.textField}
              name="streamUrl"
              label="Destination Stream URL"
              hint="rtmp://mystreamurl/live"
              type="text"
              value={streamUrl}
              onChange={this.handleChange}
            />
             <TextField
              className={styles.textField}
              name="key"
              label="Stream Key"
              hint="Stream Key"
              type="text"
              value={key}
              onChange={this.handleChange}
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

export default CustomTarget;
