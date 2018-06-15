import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ChoosePlatform from './modals/ChoosePlatform';
import FacebookTarget from './modals/FacebookTarget';
import YoutubeTarget from './modals/YoutubeTarget';
import TwitchTarget from './modals/TwitchTarget';
import CustomTarget from './modals/CustomTarget';
import styles from './New.css';

class NewStreamTarget extends Component {
  modalRouter() {
    switch(this.props.modalType) {
      case 'facebook_target':
        return (
          <FacebookTarget {...this.props} />
        );
      case 'youtube_target':
        return (
          <YoutubeTarget {...this.props} />
        );
      case 'twitch_target':
        return (
          <TwitchTarget {...this.props} />
        );
      case 'custom_target':
        return (
          <CustomTarget {...this.props} />
        );
      default:
      case 'choose_platform':
        return (
          <ChoosePlatform {...this.props} />
        );
    }
  }

  render() {
    return (
      <div className={styles.NewStreamTarget}>
        {this.modalRouter()}
      </div>
    );
  }
}

export default withRouter(NewStreamTarget);
