import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import Modal from 'components/Modal';
import { ReduxTextField } from 'components/TextField';
import LoaderButton from 'components/LoaderButton';
import styles from './Form.css';

class RTMPDetails extends Component {
  shouldDisableCreate = () => {
    const { isSaving, newStreamGroup } = this.props;

    if (RTMPDetails && RTMPDetails.values) {
      return isSaving || !newStreamGroup.values.name;
    } else {
      return true;
    }
  };

  handleSubmit = async event => {
    event.preventDefault();

    const { RTMPDetails: { values: streamGroup } } = this.props;

    try {
      this.props.createStreamGroup(streamGroup);
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const { title, openModal, closeModal, isSaving } = this.props;
    return (
      <Modal title={title} open={openModal} closeModal={closeModal}>
        <form onSubmit={this.handleSubmit}>
          <div className={styles.formCommon}>
            
          </div>
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = ({ form: { RTMPDetails } }) => ({ RTMPDetails });

RTMPDetails = reduxForm({
  form: 'RTMPDetails'
})(RTMPDetails);

export default withRouter(connect(mapStateToProps)(RTMPDetails));
