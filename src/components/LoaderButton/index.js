import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './LoaderButton.css';

const overrideStyles = {
  buttonStyle: {
    backgroundImage:
      'linear-gradient(-38deg, rgba(0, 39, 163, 1) 0%, rgba(132, 0, 160, 1) 42%, rgba(225, 69, 59, 1) 76%, rgba(255, 205, 22, 1) 100%)',
    height: 44,
    
  },
  disabledButtonStyle: {
    height: 44,
    
  },
  labelStyle: {
    color: '#fff',
    textTransform: 'none',
    fontWeight: 400
  },
  disabledLabelStyle: {
    color: '#000',
    textTransform: 'none',
    fontWeight: 400
  },
  overlayStyle: {
    backgroundColor: 'transparent'
  },
  rippleStyle: {
    backgroundColor: 'transparent'
  }
};

const LoaderButton = ({
  isLoading,
  text,
  loadingText,
  disabled = false,
  ...props
}) => {
  const {
    disabledButtonStyle,
    buttonStyle,
    labelStyle,
    overlayStyle,
    rippleStyle
  } = overrideStyles;
  return (
    <div className={styles.shadowWrapper}>
      <div className={disabled ? '' : styles.shadow} />
      <RaisedButton
        className={styles.button}
        
        rippleStyle={rippleStyle}
        overlayStyle={overlayStyle}
        disableTouchRipple
        buttonStyle={disabled ? disabledButtonStyle : buttonStyle}
        labelStyle={labelStyle}
        label={isLoading ? loadingText : text}
        disabled={disabled || isLoading}
        {...props}
      />
    </div>
  );
};

export default LoaderButton;
