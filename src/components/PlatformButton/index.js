import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SocialIcon from '../SocialIcon';
import styles from './PlatformButton.css';

const PlatformButton = ({ provider, onClick, disabled = false }) => {
  return (
    <div className={styles.wrapper}>
      <FloatingActionButton
        className={styles.button}
        onTouchTap={onClick}
        style={{
          minWidth: 64,
          borderRadius: '50%',
          opacity: disabled ? 0.5 : 1,
        }}
        backgroundColor='transparent'
        disabledColor='transparent'
        disabled={disabled}
      />
      <SocialIcon disabled={disabled} provider={provider} />
      <br />
      <label className={styles.label} style={{ opacity: disabled ? 0.5 : 1 }}>
        {provider}
      </label>
    </div>
  );
};

export default PlatformButton;
