import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import Paper from 'material-ui/Paper';
import Loader from 'components/Loader';
import noBroadcastsIcon from 'assets/no-broadcasts.png';
import editIcon from 'assets/small_ico_edit@2x.png';
import trashIcon from 'assets/small_ico_trash@2x.png';
import styles from './List.css';

const Action = ({ name, icon, onClick }) => (
  <img className={styles.actionIcon}
    src={icon}
    alt={name}
    onClick={onClick}
  />
);

class ListBroadcasts extends Component {
  constructor(props) {
    super(props);
    this.actions = [
      {
        name: 'delete',
        icon: trashIcon,
        onClick: broadcastId => this.handleDelete(broadcastId)
      },
    ];
  }

  async componentWillMount() {
    this.props.fetchBroadcasts();
  }

  handleDelete = async broadcastId => {
    event.preventDefault();

    const confirmed = confirm('Are you sure you want to delete this destination?');

    if (!confirmed) {
      return;
    }

    this.props.deleteBroadcast(broadcastId);
  }

  renderBroadcastList(broadcasts) {
    return broadcasts.map(broadcast => {
      const durationAsMs = moment(broadcast.endTime).diff(broadcast.startTime);
      const duration = moment.duration(durationAsMs, 'milliseconds');
      const hours = duration.hours() || 0;
      const minutes = duration.minutes() < 10 ? `0${duration.minutes()}` : duration.minutes();
      const seconds = duration.seconds() < 10 ? `0${duration.seconds()}` : duration.seconds();
      const durationString = `${hours}:${minutes}:${seconds}`;

      return (
        <Paper
          className={styles.tableRow}
          key={broadcast.broadcastId}
        >
          <div className={styles.nameColumn}>
            {broadcast.title.trim().split('\n')[0]}
          </div>
          <div className={styles.destinationColumn}>
            {broadcast.streamGroup ? broadcast.streamGroup.name : ''}
          </div>
          <div className={styles.airDateColumn}>
            {moment(broadcast.scheduledTime ? broadcast.scheduledTime : broadcast.startTime).format('MM/DD/YYYY')}
          </div>
          <div className={styles.durationColumn}>
            {durationString}
          </div>
          <div className={styles.actionColumn}>
            <div className={styles.actionsContainer}>
              {this.actions.map((action, i) => (
                <Action key={i}
                  name={action.name}
                  icon={action.icon}
                  onClick={() => action.onClick(broadcast.broadcastId)}
                />
              ))}
            </div>
          </div>
        </Paper>
      )
    });
  }

  renderBroadcastTable() {
    return (
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div className={styles.nameColumn}>Name</div>
          <div className={styles.destinationColumn}>Destination</div>
          <div className={styles.airDateColumn}>Air Date</div>
          <div className={styles.durationColumn}>Duration</div>
          <div className={styles.actionColumn}></div>
        </div>
        { this.renderBroadcastList(this.props.broadcasts) }
      </div>
    );
  }

  renderNoBroadcasts() {
    return (
      <div className={styles.noBroadcasts}>
        <img
          src={noBroadcastsIcon}
          alt="No Broadcasts"
          className={styles.noBroadcastsIcon}
        />
        <p className={styles.noBroadcastsMessage}>It's time to go live.</p>
      </div>
    );
  }

  renderBroadcasts() {
    const {
      isLoadingBroadcasts,
      broadcasts,
      isModalOpen,
    } = this.props;

    return (
      <div className={styles.broadcasts}>
        <h2>Broadcasts</h2>
        {
          isLoadingBroadcasts
          ? <div className={styles.LoaderWrapper}>
              <Loader />
            </div>
          : ( broadcasts.length
              ? this.renderBroadcastTable()
              : this.renderNoBroadcasts())
        }
      </div>
    );
  }

  render() {
    return (
      <div className={styles.ListBroadcasts}>
        { this.renderBroadcasts() }
      </div>
    );
  }
}

export default withRouter(ListBroadcasts);
