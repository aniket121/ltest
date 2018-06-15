import React from 'react';
import facebookIcon from 'assets/fb.svg';
import twitchIcon from 'assets/twitch.svg';
import youtubeIcon from 'assets/youtube.svg';
import rtmpIcon from 'assets/custom.svg';
import periscopeIcon from 'assets/periscope-ico@2x.png';
import styles from './SocialIconColor.css';

const SocialIconColor = ({ provider }) => {
  let icon, fill;
  switch(provider) {
    case 'facebook':
      icon = facebookIcon;
      fill = '#3b5997';
      break;
    case 'twitch':
      icon = twitchIcon;
      fill = '#6441a4';
      break;
    case 'youtube':
      fill = '#d50d1a';
      icon = youtubeIcon;
      break;
    case 'periscope':
      icon = periscopeIcon;
      break;
    case 'custom':
      icon = rtmpIcon;
      fill = '#000';
      break;
    default:
      break;
  }

  return (
    <div className="SocialIcon">
      <img className={styles.socialIcon} style={{ fill }} src={icon} alt='Custom' />
    </div>
  );
};

export default SocialIconColor;
