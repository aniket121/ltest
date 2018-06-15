import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import Modal from 'components/Modal';
import { ReduxTextField } from 'components/TextField';
import LoaderButton from 'components/LoaderButton';
import styles from './Form.css';

class NewStreamGroup extends Component {
  shouldDisableCreate = () => {
    const { isSaving, newStreamGroup } = this.props;

    if (newStreamGroup && newStreamGroup.values) {
      return isSaving || !newStreamGroup.values.name;
    } else {
      return true;
    }
  };

  handleSubmit = async event => {
    event.preventDefault();

    const { newStreamGroup: { values: streamGroup } } = this.props;

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
            <ReduxTextField
              name="name"
              className={styles.textField}
              hintText="e.g. Monday Vlog"
              floatingLabelText="Name"
              type="text"
            />

            <LoaderButton
              disabled={this.shouldDisableCreate()}
              type="submit"
              isLoading={isSaving}
              text="Create"
              loadingText="Creating LivePin..."
            />
          </div>
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = ({ form: { newStreamGroup } }) => ({ newStreamGroup });

NewStreamGroup = reduxForm({
  form: 'newStreamGroup'
})(NewStreamGroup);

export default withRouter(connect(mapStateToProps)(NewStreamGroup));
