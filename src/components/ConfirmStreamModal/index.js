import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'components/TextField';
import Modal from 'components/Modal';
import LoaderButton from 'components/LoaderButton';
import FlatButton from 'material-ui/FlatButton';
import styles from 'containers/stream-targets/modals/styles.css';

class ConfirmStreamModal extends Component {
  constructor(props) {
    super(props);
  }
  closeStream(){
    this.props.history.goBack()
  }

  render() {
    

    return (
      <Modal  title="Are you sure want to finish stream ?" {...this.props}>
        <form onSubmit={this.handleSubmit}>
          <div className={styles.modalContent}>
          <LoaderButton
              type="submit"
              text="Stop"
              loadingText="closing Stream..."
              onClick={(e) => this.closeStream()}
            />
          </div>
        </form>
      </Modal>
    );
  }
}

export default ConfirmStreamModal;
