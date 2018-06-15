import React from 'react';
import facebookIcon from 'assets/FB-ico-black@2x.png';
import twitchIcon from 'assets/Twitch-ico@2x.png';
import youtubeIcon from 'assets/Youtube-ico@2x.png';
import periscopeIcon from 'assets/periscope-ico@2x.png';
import rtmpIcon from 'assets/rtmp-ico-black@2x.png';
import styles from './SocialIconBlack.css';

const SocialIconBlack = ({ provider }) => {
  let icon;
  switch(provider) {
    case 'facebook':
      icon = facebookIcon;
      break;
    case 'twitch':
      icon = twitchIcon;
      break;
    case 'youtube':
      icon = youtubeIcon;
      break;
    case 'periscope':
      icon = periscopeIcon;
      break;
    case 'custom':
      icon = rtmpIcon;
      break;
    default:
      break;
  }

  return (
    <div className="SocialIcon">
      <img className={styles.socialIcon} src={icon} alt='Custom' />
    </div>
  );
};

export default SocialIconBlack;
