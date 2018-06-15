import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
import { invokeApi } from 'libs/aws.js';
import trashIcon from 'assets/small_ico_trash@2x.png';
import noStreamTargetsIcon from 'assets/new-stream-targets.png';
import SocialIconColor from 'components/SocialIconColor';
import ActionButton from 'components/ActionButton';
import Loader from 'components/Loader';
import NewStreamTarget from './New';
import styles from './List.css';

const Action = ({ name, icon, onClick }) =>
  <img className={styles.actionIcon} src={icon} alt={name} onClick={onClick} />;

const NEW_TARGET_TYPES = [
  'facebook_target',
  'youtube_target',
  'twitch_target',
  'periscope_target',
  'custom_target'
];

const formatDestinationField = string => {
  return !!string ? string : 'Channel';
};

const formatPrivacyField = string => {
  return !!string ? string.split('_').join(' ') : 'public';
};

class ListStreamTargets extends Component {
  actions = [
    {
      name: 'delete',
      icon: trashIcon,
      onClick: streamTargetId => this.handleDelete(streamTargetId)
    }
  ];

  async componentDidMount() {
    const { streamGroupId } = this.props.match.params;

    await this.props.fetchStreamTargets(streamGroupId);
    this.props.fetchStreamGroup(streamGroupId);
  }

  handleDelete = async streamTargetId => {
    const confirmed = confirm(
      'Are you sure you want to delete this Stream Target?'
    );

    if (!confirmed) {
      return;
    }

    await this.props.deleteStreamTarget(streamTargetId);
  };

  openNewTargetModal = () => {
    this.props.changeModalType('choose_platform');
    this.props.openModal();
  };

  renderStreamTargetList(streamTargets) {
    return streamTargets.map(streamTarget =>
      <Paper key={streamTarget.streamTargetId} className={styles.tableRow}>
        <div className={styles.nameColumn}>
          {streamTarget.name.trim().split('\n')[0]}
        </div>
        <div className={styles.platformColumn}>
          <SocialIconColor provider={streamTarget.provider} />
        </div>
        <div className={styles.destinationColumn}>
          {streamTarget.config
            ? formatDestinationField(streamTarget.config.destType)
            : formatDestinationField()}
        </div>
        <div className={styles.privacyColumn}>
          {streamTarget.config
            ? formatPrivacyField(streamTarget.config.privacy)
            : formatPrivacyField(streamTarget.privacyStatus)}
        </div>
        <div className={styles.enabledColumn}>
          <Toggle
            style={styles.toggle}
            toggled={!streamTarget.isEnabled ? true : (streamTarget.isEnabled ? true : false)}
            disabled={true}
            label={!streamTarget.isEnabled ? 'Yes' : (streamTarget.isEnabled ? 'Yes' : 'No')}
            labelPosition={'right'}
          />
        </div>
        <div className={styles.actionColumn}>
          <div className={styles.actionsContainer}>
            {this.actions.map((action, i) =>
              <Action
                key={i}
                name={action.name}
                icon={action.icon}
                onClick={() => action.onClick(streamTarget.streamTargetId)}
              />
            )}
          </div>
        </div>
      </Paper>
    );
  }

  renderStreamTargetsTable() {
    const { isLoadingStreamTargets, streamTargets } = this.props;

    return (
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div className={styles.nameColumn}>Name</div>
          <div className={styles.platformColumn}>Platform</div>
          <div className={styles.destinationColumn}>Destination</div>
          <div className={styles.privacyColumn}>Privacy options</div>
          <div className={styles.enabledColumn}>Enabled</div>
          <div className={styles.actionColumn} />
        </div>
        {this.renderStreamTargetList(streamTargets)}
      </div>
    );
  }

  renderEmptyList() {
    return (
      <div className={styles.EmptyList}>
        <img
          className={styles.EmptyListIcon}
          src={noStreamTargetsIcon}
          alt="Empty"
        />
        <p className={styles.EmptyListParagraph}>
          No LivePin Destinations created. <br />
          Add a new LivePin Destination.
        </p>
      </div>
    );
  }

  render() {
    const { isLoadingStreamTargets, currentGroup, streamTargets } = this.props;

    return (
      <div className={styles.streamTargets}>
        <div
          className={styles.backBtn}
          onClick={() => this.props.history.push('/destinations')}
        >
          <i className={styles.backChevron + ' material-icons'}>chevron_left</i>
          Back
        </div>
        {isLoadingStreamTargets
          ? <h3>Loading targets...</h3>
          : <h3>
              {currentGroup && currentGroup.name}
            </h3>}
        {isLoadingStreamTargets
          ? <div className={styles.LoaderWrapper}>
              <Loader color="#1321a2" />
            </div>
          : streamTargets.length
            ? this.renderStreamTargetsTable()
            : this.renderEmptyList()}
        {!isLoadingStreamTargets &&
          <div className={styles.actionButtonContainer}>
            <ActionButton onClick={this.openNewTargetModal} />

            <NewStreamTarget
              closeModal={this.props.closeModal}
              {...this.props}
            />
          </div>}
      </div>
    );
  }
}

const mapStateToProps = ({ streamTargets: { isSaving, error } }) => ({ isSaving, error });

export default withRouter(connect(mapStateToProps)(ListStreamTargets));
