import React from 'react';
import GoLiveButton from 'components/GoLiveButton';
import PillButton from 'components/PillButton';
import styles from './BroadcastControls.css';

export const PreparingInternet = () =>
  <div>
    Preparing internet for launch...
  </div>

export const ReadyToGoLive = ({ 
  handleStartBroadcast, 
  handleCancelBroadcast, 
  isLoading, 
  showCountdown 
}) =>
  <div className={styles.readyToGoLive}>
    {!showCountdown && <GoLiveButton
      onClick={handleStartBroadcast}
      isLoading={isLoading}
      text="Go Live"
      loadingText="Go Live"
    />}
    <PillButton
      onClick={handleCancelBroadcast}
      isLoading={isLoading}
      text="Cancel"
      loadingText="Cancel"
    />
  </div>

export const FinishButton = ({ 
  handleStopBroadcast, 
  isLoading 
}) =>
  <div className="FinishButton">
    <PillButton
      onClick={handleStopBroadcast}
      isLoading={isLoading}
      text="Finish"
      loadingText="Finish"
    />
  </div>

const BroadcastControls = ({
  isLive,
  shouldEnableGoLive,
  showCountdown,
  isChatDocked,
  ...props
}) => {
  let child = <PreparingInternet />

  if (shouldEnableGoLive) {
    child = <ReadyToGoLive {...props} showCountdown={showCountdown} />
  }
  
  if (isLive) {
    child = <FinishButton {...props} />
  }

  return (
    <div className={styles.BroadcastControls + (isChatDocked ? ' ' : ` ${styles.shiftForChat}`)}>
      {child}
    </div>
  );
};

export default BroadcastControls;