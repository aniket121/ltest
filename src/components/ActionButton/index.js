import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import styles from './ActionButton.css';

const LivepinActionButton = props => {
  return (
    <FloatingActionButton
      className={styles.actionButton}
      backgroundColor="transparent"
      onTouchTap={props.onClick}
    >
      <ContentAdd />
    </FloatingActionButton>
  );
};

export default LivepinActionButton;
