import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {invokeApi} from 'libs/aws';
import * as actions from 'actions';
import Intercom from 'react-intercom';
import Navbar from 'components/Navbar';
import GoLiveModal from 'components/GoLiveModal';
import ShareUrlModal from 'components/ShareUrlModal';
import ConfirmStreamModal from 'components/ConfirmStreamModal';
import Routes from 'Routes';
import config from './config';
import MobileDetect from 'mobile-detect';
import styles from './App.css';


const getUserAgent = () => window.navigator.userAgent;

function redirectFromMobile() {
  window.location.href = 'https://www.livepin.tv';
}

class App extends Component {
  componentWillMount = async () => {
    const md = new MobileDetect(getUserAgent());
    if (md.phone()) {
      redirectFromMobile()
    }

    if (!this.props.location.pathname.includes('redirect')) {
      this.props.initializeApp();
    }
  };

  handleNavLink = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute('href'));
  };

  handleLogout = async () => {
    this.props.logout();
  };

  openGoLive = () => {
    this.props.changeModalType('go_live');
    this.props.openModal();
  };

  openShareUrl = (shareLink = '') => {
    this.props.changeModalType('share_url');
    console.log("shreLink in app.js=" + shareLink);
    this.props.setShareLink(shareLink);
    this.props.openModal();
  };
  openConfirmation = (shareLink = '') => {
    this.props.changeModalType('confirm_finishstream');
    console.log("confirm popup");
    this.props.openModal();
  };

  openGoLiveNav = () => {
    this.openGoLive();
  };

  shouldHideNavbar = () => {
    const {location: {pathname}} = this.props;
    return pathname === '/redirect' || pathname === '/live' || (pathname && pathname.includes('/live/'));
  };

  shouldShowWelcomeOverlay = () => {
    const {location: {pathname}} = this.props;
    return pathname === '/login' || pathname === '/signup';
  };

  render() {
    const {
      user,
      userToken,
      closeModal,
      isModalOpen,
      modalType,
      currentGroup,
      shareLink
    } = this.props;

    const childProps = {
      openGoLive: this.openGoLive,
      openShareUrl: this.openShareUrl,
      openConfirmation:this.openConfirmation,
      ...this.props
    };

    return (
      <div
        className={
          this.shouldShowWelcomeOverlay() ? styles.WelcomeOverlay : styles.app
        }
      >
        {!this.shouldHideNavbar() &&
        <Navbar
          user={user}
          userToken={userToken}
          handleNavLink={this.handleNavLink}
          handleLogout={this.handleLogout}
          openGoLive={this.openGoLiveNav}
        />}

        {!this.shouldHideNavbar() && <Intercom appID="i0hbisdm" {...user} />}

        <GoLiveModal
          open={isModalOpen && modalType === 'go_live'}
          closeModal={closeModal}
          {...childProps}
        />

        <ShareUrlModal
          open={isModalOpen && modalType === 'share_url'}
          closeModal={closeModal}
          {...childProps}
        />
        <ConfirmStreamModal
          open={isModalOpen && modalType === 'confirm_finishstream'}
          closeModal={closeModal}
          {...childProps}
        />

        <div>
          <Routes childProps={childProps}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    auth: {user, userToken, userTokenProvider, isLoading: isLoadingUserToken},
    streamGroups: {
      streamGroups,
      currentGroup,
      isLoading: isLoadingStreamGroups
    },
    streamTargets: {streamTargets, token, isLoading: isLoadingStreamTargets},
    broadcasts: {
      broadcasts,
      currentBroadcast,
      isSaving: isCreatingBroadcast,
      isLoading: isLoadingBroadcasts
    },
    app: {open: isModalOpen, modalType, selectedGroup, shareLink}
  } = state;

  return {
    user,
    userToken,
    userTokenProvider,
    isLoadingUserToken,
    streamGroups,
    isLoadingStreamGroups,
    streamTargets,
    token,
    currentGroup,
    isLoadingStreamTargets,
    modalType,
    isModalOpen,
    broadcasts,
    currentBroadcast,
    isCreatingBroadcast,
    isLoadingBroadcasts,
    selectedGroup,
    shareLink
  };
};

export default withRouter(connect(mapStateToProps, actions)(App));
