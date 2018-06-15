import React from 'react';
import facebookIcon from 'assets/broadcast_view/facebook.svg';
import twitchIcon from 'assets/broadcast_view/twitch.svg';
import youtubeIcon from 'assets/broadcast_view/youtube.svg';
// import periscopeIcon from 'assets/broadcast_view/periscope-ico-white@2x.png';
// import rtmpIcon from 'assets/broadcast_view/rtmp-ico-white@2x.png';
import styles from './SocialIconLive.css';

const SocialIconLive = ({ provider, styleOverrides = {} }) => {
  let icon, style, iconContainer;
  switch(provider) {
    case 'facebook':
      icon = facebookIcon;
      style = {
        fill: '#fff',
        width: 7,
        padding: 10
      };
      iconContainer = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3b5997',
        borderRadius: '50%',
        height: 28,
        marginRight: 6
      };
      break;
    case 'twitch':
      icon = twitchIcon;
      style = {
        fill: '#fff',
        width: 18,
        padding: 6,
      };
      iconContainer = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6441a4',
        borderRadius: '50%',
        height: 28,
        marginRight: 6
      };
      break;
    case 'youtube':
      icon = youtubeIcon;
      style = {
        fill: '#fff',
        width: 18,
        padding: '4px 4px'
      };
      iconContainer = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d50d1a',
        borderRadius: '50%',
        height: 28,
        marginRight: 6
      };
      break;
    // case 'periscope':
    //   icon = periscopeIcon;
    //   break;
    // case 'custom':
    //   icon = rtmpIcon;
    //   break;
    default:
      break;
  }

  return (
    <div className="SocialIconLive" style={{ ...iconContainer, ...styleOverrides }}>
      <img className={styles.SocialIconLive} style={style} src={icon} alt={provider} />
    </div>
  );
};

export default SocialIconLive;
