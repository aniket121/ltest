import React from 'react';
import cameraIcon from 'assets/video-camera@2x.png';
import styles from './GoLiveButton.css';

const GoLiveButton = ({ isLoading, onClick, text, loadingText }) => {
  return (
    <div className={styles.GoLiveButtonWrapper} onClick={onClick}>
      <div className={styles.GoLiveButtonLabel}>
        {isLoading ? loadingText : text }
      </div>
      <img
        className={styles.GoLiveIcon}
        src={cameraIcon}
        alt='Go Live'
      />
    </div>
  );
};

export default GoLiveButton;
