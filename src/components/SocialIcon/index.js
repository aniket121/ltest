import React from 'react';
import facebookIcon from 'assets/fb-ico-white@2x.png';
import twitchIcon from 'assets/twitch-ico-white@2x.png';
import youtubeIcon from 'assets/yt-ico-white@2x.png';
import periscopeIcon from 'assets/periscope-ico-white@2x.png';
import rtmpIcon from 'assets/rtmp-ico-white@2x.png';
import styles from './SocialIcon.css';

const SocialIcon = ({ provider, disabled }) => {
  let icon;
  switch (provider) {
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
    <div className={styles.wrapper}>
      <img
        className={styles.socialIcon}
        style={{ opacity: disabled ? 0.5 : 1 }}
        src={icon}
        alt="icon"
      />
    </div>
  );
};

export default SocialIcon;
