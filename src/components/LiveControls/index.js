import React from 'react';
import cameraIcon from 'assets/broadcast_view/camera.svg';
import muteIcon from 'assets/broadcast_view/mute.svg';
import shareIcon from 'assets/broadcast_view/share.svg';
import styles from './LiveControls.css';

const ChatNotification = () =>
  <div className={styles.chatNotification}>
    <i className="material-icons" style={{ fontSize: 20 }}>notifications</i>
  </div>

const LiveControls = ({ 
  isMuted, 
  isCameraOff,
  shareUrlClicked, 
  toggleLocalAudio, 
  toggleLocalVideo,
  toggleChat,
  isChatDocked,
  chatNotification
}) =>
  <div className={styles.LiveControls + (isChatDocked ? '' : ` ${styles.shiftForChat}`)}>
    <div className={styles.TopButtonsContainer}>
      <div
        className={styles.ControlIconContainer}
        onClick={shareUrlClicked}
      >
        <img
          className={styles.shareIcon}
          src={shareIcon}
          alt="Share Link"
        />
      </div>
      <div
        className={styles.ControlIconContainer + ' ' + (isMuted && styles.active) }
        onClick={toggleLocalAudio}
      >
        <img
          className={styles.muteIcon}
          src={muteIcon}
          alt="Mute"
        />
      </div>
      <div
        className={styles.ControlIconContainer + ' ' + (isCameraOff && styles.active)}
        onClick={toggleLocalVideo}
      >
        <img
          className={styles.cameraIcon}
          src={cameraIcon}
          alt="Camera"
        />
      </div>
    </div>
    <div className={styles.BottomButtonsContainer}>
      <div className={styles.ControlIconContainer}>
       
        {/*<img
          className={styles.chatIcon}
          src={muteIcon}
          alt="Chat"
        />*/}
      </div>
    </div>
  </div>

export default LiveControls;
