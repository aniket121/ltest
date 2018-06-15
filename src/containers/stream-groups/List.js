import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import ActionButton from 'components/ActionButton';
import Toggle from 'material-ui/Toggle';
import { invokeApi } from 'libs/aws.js';
import editIcon from 'assets/small_ico_edit@2x.png';
import trashIcon from 'assets/small_ico_trash@2x.png';
import cameraIcon from 'assets/small_ico_camera@2x.png';
import noStreamGroupsIcon from 'assets/no-livepins.png';
import SocialIconBlack from 'components/SocialIconBlack';
import SocialIconColor from 'components/SocialIconColor';
import Loader from 'components/Loader';
import NewStreamGroup from './New';
import styles from './List.css';
import RTMPDetails from './rtmpdetails';


const Action = ({ name, icon, onClick }) =>
  <img className={styles.actionIcon} src={icon} alt={name} onClick={onClick} />;

const ActionsToggle = ({onClick }) =>onClick={onClick};

class ListStreamGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label:true
    }
    }
  actions = [
    {
      name: 'go_live',
      icon: cameraIcon,
      onClick: streamGroupId => {
        const selectedGroup = this.props.streamGroups.find(
          streamGroup => streamGroup.streamGroupId === streamGroupId
        );
        this.props.selectGroup(selectedGroup);
        this.props.openGoLive();
      }
    },
    {
      name: 'edit',
      icon: editIcon,
      onClick: streamGroupId =>
        this.props.history.push(`/destinations/${streamGroupId}`)
    },
    {
      name: 'delete',
      icon: trashIcon,
      onClick: streamGroupId => this.handleDelete(streamGroupId)
    }
  ];

  async componentWillMount() {
    if (window["channel"] && window["key"]) {
      this.props.history.push('live/' + window["channel"]);
      return;

    }
  }

  async componentDidMount() {
    this.props.fetchStreamGroups();

  }
  

  handleDelete = async streamGroupId => {
    event.preventDefault();

    const confirmed = confirm(
      'Are you sure you want to delete this destination?'
    );

    if (!confirmed) {
      return;
    }
    
    await this.props.deleteStreamGroup(streamGroupId);
  };

  renderStreamTargets(streamTargets = []) {
    return streamTargets.map(streamTarget => {
      return (
        <div
          key={streamTarget.streamTargetId}
          className={styles.streamTargetIconWrapper}
        >
          <SocialIconColor provider={streamTarget.provider} />
        </div>
      );
    });
  }
  handleRTMP = async streamGroup => {
    
    this.props.enableRtmp(streamGroup);
    this.renderStreamGroupTable();
    this.setState({label: !this.state.label})
  };
 
  renderStreamGroupList() {
    return this.props.streamGroups.map(streamGroup =>
      <Paper key={streamGroup.streamGroupId} className={styles.tableRow}>
        <div className={styles.nameColumn}>
          {streamGroup.name.trim().split('\n')[0]}
        </div>
        <div className={styles.targetColumn}>
          {this.renderStreamTargets(streamGroup.streamTargets)}
        </div>
        <div className={styles.rtmpColumn}>
         
         <Toggle
            style={styles.toggle}
            defaultToggled={streamGroup.isRtmpEnabled}
            label={streamGroup.isRtmpEnabled ? "Enabled" : "Disabled"}
            labelPosition={"right"}
            onClick={() => this.handleRTMP(streamGroup)}
           
            
          />
          {streamGroup.isRtmpEnabled ? <button onClick={() => this.openRtmpModal()}>RTMP</button> :''}

        </div>
        <div className={styles.actionColumn}>
          <div className={styles.actionsContainer}>

            {this.actions.map((action, i) =>

              <Action
                key={i}
                name={action.name}
                icon={action.icon}
                onClick={() => action.onClick(streamGroup.streamGroupId)}
              />
            )}
          </div>
        </div>
      </Paper>
    );
  }

  openNewStreamGroup = () => {
    this.props.changeModalType('new_stream_group');
    this.props.openModal();
  };

  renderStreamGroupTable() {
    return (
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div className={styles.nameColumn}>Name</div>
          <div className={styles.targetColumn}>LivePin Destinations</div>
          <div className={styles.rtmpColumn}>Ingestion/RTMP</div>
          <div className={styles.actionColumn} />
        </div>
        {this.renderStreamGroupList()}

      </div>
    );
  }

  renderNoStreamGroups() {
    return (
      <div className={styles.noStreamGroups}>
        <img
          src={noStreamGroupsIcon}
          alt="No Stream Groups"
          className={styles.noStreamGroupsIcon}
        />
        <p className={styles.noStreamGroupsMessage}>Create a new LivePin.</p>
      </div>
    );
  }

  renderStreamGroups() {
    const {
      isModalOpen,
      modalType,
      isLoadingStreamGroups,
      openModal,
      closeModal,
      createStreamGroup,
      isSaving,
      streamGroups
    } = this.props;
    return (
      <div className={styles.streamGroups}>
        <h2>LivePins</h2>
        {isLoadingStreamGroups
          ? <div className={styles.centered}>
              <Loader />
            </div>
          : streamGroups.length
            ? this.renderStreamGroupTable()
            : this.renderNoStreamGroups()}

        {!isLoadingStreamGroups &&
          <div className={styles.actionButtonContainer}>
            <ActionButton onClick={this.openNewStreamGroup} />
            <NewStreamGroup
              title="Create a LivePin"
              openModal={isModalOpen && modalType === 'new_stream_group'}
              closeModal={closeModal}
              isSaving={isSaving}
              createStreamGroup={createStreamGroup}
            />
          </div>}
      </div>
    );
  }

openRtmpModal = () => {
    console.log("rtmp details")
    this.props.changeModalType('RTMP_details');
    this.props.openModal();
  };

renderRtmlDetails()
{
     const {
      isModalOpen,
      modalType,
      isLoadingStreamGroups,
      openModal,
      closeModal,
      createStreamGroup,
      isSaving,
      streamGroups
    } = this.props;
    return (
   <RTMPDetails
              title="RTMP..."
              openModal={isModalOpen && modalType === 'RTMP_details'}
              closeModal={closeModal}
              isSaving={isSaving}
            />
    );
}
  renderBetaBlocker() {
    return (
      <div className={styles.BetaBlocker}>
        <h1>Great you're on the waiting list!</h1>
        LivePin is currently only accessible to beta users. <br />
        Head over to{' '}
        <a target="_blank" href="https://www.livepin.tv">
          Livepin.tv
        </a>{' '}
        to sign up for our beta.
      </div>
    );
  }
  

  render() {
    return (
      <div className={styles.ListStreamGroups}>
        {this.renderStreamGroups()}
        {this.renderRtmlDetails()}
      </div>
    );
  }
}

const mapStateToProps = ({ streamGroups: { isSaving } }) => ({ isSaving });

export default withRouter(connect(mapStateToProps)(ListStreamGroups));
