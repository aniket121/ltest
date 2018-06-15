import React, { Component } from 'react';
import dashboardPlaceholder from 'assets/influencer_stats.jpg';
import styles from './Dashboard.css';

export class Dashboard extends Component {
  render() {
    return (
      <div className={styles.Dashboard}>
        <div className={styles.overlay}>
          <h1>Analytics coming soon</h1>
        </div>
        <img
          src={dashboardPlaceholder}
          alt="influencer_stats"
          className={styles.placeholder}
        />
      </div>
    );
  }
}

export default Dashboard;
