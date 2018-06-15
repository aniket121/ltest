import React, { Component } from 'react';
import config from 'config';
import Modal from 'components/Modal';
import PlatformButton from 'components/PlatformButton';
import styles from './ChoosePlatform.css';

class ChoosePlatform extends Component {
  handleFacebookClick = async () => {
    const { streamGroupId } = this.props.match.params;
    const token = await this.props.facebookLiveLogin();
    if (token) {
      this.props.storeTokenForTarget(token);
      this.props.history.push(
        `/destinations/${streamGroupId}/stream-targets/facebook/new`
      );
      this.props.changeModalType('facebook_target');
    }
  };

  handleYoutubeClick = async () => {
    const { streamGroupId } = this.props.match.params;
    const token = await this.props.loginWithYoutube();
    if (token) {
      this.props.storeTokenForTarget(token);
      this.props.history.push(
        `/destinations/${streamGroupId}/stream-targets/youtube/new`
      );
      this.props.changeModalType('youtube_target');
    }
  };

  handleTwitchClick = async () => {
    const { streamGroupId } = this.props.match.params;
    const token = await this.props.loginWithTwitch();
    console.log('token');
    if (token) {
      this.props.storeTokenForTarget(token);
      this.props.history.push(
        `/destinations/${streamGroupId}/stream-targets/twitch/new`
      );
      this.props.changeModalType('twitch_target');
    }
  };

  handlePeriscopeClick = () => {
    console.log('Periscope auth');
  };

  handleCustomClick = () => {
    this.props.changeModalType('custom_target');
    const { streamGroupId } = this.props.match.params;
    this.props.history.push(
      `/destinations/${streamGroupId}/stream-targets/custom/new`
    );
  };

  render() {
    const {
      isModalOpen,
      modalType,
      closeModal,
      streamTargets,
      currentGroup
    } = this.props;

    let disableFacebook, disableTwitch, disableYoutube;

    if (currentGroup) {
      const currentTargets = streamTargets.filter(
        target => target.streamGroupId === currentGroup.streamGroupId
      );

      disableFacebook = currentTargets.some(
        target => target.provider !== 'facebook'
      );

      disableTwitch = currentTargets.some(
        target => target.provider === 'twitch' || target.provider === 'facebook'
      );

      disableYoutube = currentTargets.some(
        target => target.provider === 'facebook'
      );
    }

    return (
      <Modal
        title="Select Livepin Destination"
        open={isModalOpen && modalType === 'choose_platform'}
        closeModal={closeModal}
      >
        <div className={styles.allPlatforms}>
          <div className={styles.available}>
            <PlatformButton
              provider="youtube"
              onClick={this.handleYoutubeClick}
            // disabled={disableYoutube}
            />
            <PlatformButton
              provider="twitch"
              onClick={this.handleTwitchClick}
            // disabled={disableTwitch}
            />
            <PlatformButton
              provider="facebook"
              onClick={this.handleFacebookClick}
            // disabled={disableFacebook}
            />
          </div>
          <div className={styles.available} style={{ marginTop: 24 }}>
            <PlatformButton
              provider="custom"
              onClick={this.handleCustomClick}
            />
            <PlatformButton
              provider="periscope"
              onClick={this.handlePeriscopeClick}
              disabled={true}
            />
          </div>
          {/* <div className={styles.comingSoon}>
            <div className={styles.comingSoonDivider} />
            <label className={styles.comingSoonLabel}>Coming soon</label>
            <div className={styles.comingSoonDivider} />
          </div>
          <div className={styles.unavailable}>
            <PlatformButton
              provider="periscope"
              onClick={this.handlePeriscopeClick}
              disabled
            />
          </div> */}
        </div>
      </Modal>
    );
  }
}

export default ChoosePlatform;
