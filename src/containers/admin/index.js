import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchSubscribers,
  grantBeta,
  deleteSubscriber
} from 'actions/subscribers';
import Paper from 'material-ui/Paper';
import Loader from 'components/Loader';
import trashIcon from 'assets/small_ico_trash@2x.png';
import moment from 'moment';
import styles from './admin.css';

const Action = ({ name, icon, onClick }) =>
  <img className={styles.actionIcon} src={icon} alt={name} onClick={onClick} />;

export const Subscriber = ({ className, item, grantBeta, deleteSubscriber }) =>
  <Paper className={className} zDepth={2}>
    <div className={styles.emailField}>
      {item.email}
    </div>
    <div className={styles.betaField}>
      {item.beta ? item.beta.toString() : 'false'}
    </div>
    <div className={styles.createdField}>
      {moment(item.createdAt).format('MM-DD-YYYY')}
    </div>
    <div className={styles.actionField}>
      <button
        className={styles.actionButton}
        onClick={() => {
          grantBeta(item.subscriberId, !item.beta);
        }}
      >
        {item.beta ? 'Revoke' : 'Grant'}
      </button>
      <Action
        name="delete"
        icon={trashIcon}
        onClick={() => deleteSubscriber(item.subscriberId)}
      />
    </div>
  </Paper>;

export class Admin extends Component {
  componentWillMount = () => {
    if (!this.props.user.admin) {
      this.props.history.push('/destinations');
    }
  };

  componentDidMount = () => {
    this.props.fetchSubscribers();
  };

  handleRefreshClick = () => {
    this.props.fetchSubscribers();
  };

  renderSubscribers() {
    const { subscribers, isLoading } = this.props;

    return (
      <div className={styles.Subscribers}>
        <div className={styles.SubscriberTableColumns}>
          <div className={styles.emailField}>Email</div>
          <div className={styles.betaField}>Beta</div>
          <div className={styles.createdField}>Date Subscribed</div>
          <div className={styles.actionField}>Actions</div>
        </div>
        {isLoading
          ? <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Loader />
            </div>
          : subscribers.map((subscriber, i) =>
              <Subscriber
                key={i}
                className={styles.Subscriber}
                item={subscriber}
                grantBeta={this.props.grantBeta}
                deleteSubscriber={this.props.deleteSubscriber}
              />
            )}
      </div>
    );
  }

  render() {
    return (
      <div className={styles.AdminContainer}>
        <h1>Admin Panel</h1>
        <div className={styles.SubscribersTable}>
          <div className={styles.SubscriberTableHeader}>
            <h2>Subscribers</h2>
            <div
              className={styles.refreshButton}
              onClick={this.handleRefreshClick}
            >
              <i className="material-icons">refresh</i>
            </div>
          </div>
          {this.renderSubscribers()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  subscribers: { subscribers, isLoading, error }
}) => ({ subscribers, isLoading, error });

export default withRouter(
  connect(mapStateToProps, { fetchSubscribers, grantBeta, deleteSubscriber })(
    Admin
  )
);
