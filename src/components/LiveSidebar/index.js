import React, { Component } from 'react';

import cameraOffIcon from 'assets/broadcast_view/cam_turn_off_ico@2x.png';
import muteIcon from 'assets/broadcast_view/mute_ico@2x.png';
import hideIcon from 'assets/broadcast_view/hide_ico@2x.png';
import fullscreenIcon from 'assets/broadcast_view/fullscreen_ico@2x.png';
import toggleLayoutsIcon from 'assets/broadcast_view/toggle_layouts_ico@2x.png';
import finishStreamIcon from 'assets/broadcast_view/finish_stream_ico@2x.png';
import fbViewersIcon from 'assets/broadcast_view/fb_viewers_ico@2x.png';
import ytViewersIcon from 'assets/broadcast_view/yt_viewers_ico@2x.png';

import styles from './LiveSidebar.css';

class LiveSidebar extends Component {
  constructor(props) {
    super(props);
    this.topMenuItems = [
      { icon: cameraOffIcon, action: this.props.toggleLocalVideo },
      { icon: muteIcon, action: this.props.toggleLocalAudio },
      { icon: fullscreenIcon, action: () => console.log('toggleLayoutsIcon') },
      { icon: toggleLayoutsIcon, action: () => console.log('toggleLayoutsIcon') },
      { icon: fbViewersIcon, action: () => console.log('toggleLayoutsIcon') },
      { icon: ytViewersIcon, action: () => console.log('toggleLayoutsIcon') }
    ];
  }

  renderTopMenu() {
    return this.topMenuItems.map((menuItem, i) => (
      <div className={styles.sidebarItem}
        onClick={menuItem.action}
        key={i}
      >
        <img
          src={menuItem.icon}
          alt=''
          className={styles.sidebarIcon}
        />
      </div>
    ));
  }

  render() {
    return (
      <div className={styles.sidebarContainer}>
        <div className={styles.sidebarContent}>
          {this.renderTopMenu()}


          <div className={styles.sidebarBottomItem}>
            <img
              src={hideIcon}
              alt=''
              className={styles.sidebarIcon}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LiveSidebar;
