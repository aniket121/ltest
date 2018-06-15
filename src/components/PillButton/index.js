import React from 'react';
import styles from './PillButton.css';

const PillButton = ({ isLoading, onClick, text, loadingText }) => {
  return (
    <div className={styles.wrapper} onClick={onClick}>
      <div className={styles.label}>
        {isLoading ? loadingText : text }
      </div>
    </div>
  );
};

export default PillButton;
