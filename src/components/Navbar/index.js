import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import GoLiveNavButton from '../GoLiveNavButton';
import LivepinLogo from 'assets/livepin_logo_3.png';
import RouteNavItem from './RouteNavItem';
import styles from './Navbar.css';

const LoginButtons = props => {
  return (
    <div className={styles.navLinks}>
      <RouteNavItem onClick={props.handleNavLink} href="/signup">
        Sign up
      </RouteNavItem>
      <RouteNavItem onClick={props.handleNavLink} href="/login">
        Login
      </RouteNavItem>
    </div>
  );
};

const Logged = props => {
  return (
    <div className={styles.navLinks}>
      {props.user.admin &&
        <RouteNavItem onClick={props.handleNavLink} href="/admin">
          Admin
        </RouteNavItem>}
      <RouteNavItem onClick={props.handleNavLink} href="/dashboard">
        Dashboard
      </RouteNavItem>
      <RouteNavItem onClick={props.handleNavLink} href="/destinations">
        LivePins
      </RouteNavItem>
      <RouteNavItem onClick={props.handleNavLink} href="/broadcasts">
        Broadcasts
      </RouteNavItem>
      <RouteNavItem onClick={props.handleNavLink} href="/profile">
        {props.user.name?props.user.name:"Profile"}
      </RouteNavItem>

      <IconMenu
        iconButtonElement={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem primaryText="Logout" onTouchTap={props.handleLogout} />
      </IconMenu>

      <GoLiveNavButton onClick={props.openGoLive} />
    </div>
  );
};

const Logo = props => {
  return (
    <Link to="/destinations">
      <div className={styles.brandContainer}>
        <img src={LivepinLogo} alt="Livepin" className={styles.brand} />
      </div>
    </Link>
  );
};

const Navbar = props => {
  return (
    <AppBar
      className={styles.navbar}
      iconElementLeft={<Logo />}
      iconElementRight={
        props.userToken ? <Logged {...props} /> : <LoginButtons {...props} />
      }
    />
  );
};

export default Navbar;
