import React from 'react';
import cameraIcon from 'assets/video-camera@2x.png';
import styles from './GoLiveNavButton.css';

const GoLiveNavButton = props => {
  return (
    <div className={styles.goLiveWrapper} onClick={props.onClick}>
      <div className={styles.goLiveSquare}>
        <img
          className={styles.goLiveIcon}
          src={cameraIcon}
          alt='Go Live'
        />
      </div>
    </div>
  );
};

export default GoLiveNavButton;
