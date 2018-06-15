import React, { Component } from 'react';
import styles from './NotFound.css';

export default class NotFound extends Component {
  componentWillMount = () => {
    this.props.history.push('/destinations');
  };

  render() {
    return (
      <div className={styles.NotFound}>
        <h3>Sorry, page not found!</h3>
      </div>
    );
  }
}
