import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'components/TextField';
import Modal from 'components/Modal';
import LoaderButton from 'components/LoaderButton';
import FlatButton from 'material-ui/FlatButton';
import styles from 'containers/stream-targets/modals/styles.css';

class ShareUrlModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { shareLink } = this.props;

    return (
      <Modal title="Share link and invite people to co-host:" {...this.props}>
        <form onSubmit={this.handleSubmit}>
          <div className={styles.modalContent}>
          {this.props.shareLink}
          </div>
        </form>
      </Modal>
    );
  }
}

export default ShareUrlModal;
