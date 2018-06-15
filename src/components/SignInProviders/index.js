import React from 'react';
import FacebookLogin from 'react-facebook-login';
import MyFacebookLogin from './facebook';
import GoogleLogin from 'react-google-login';
import config from '../../config';
import styles from './SignInProviders.css';

const SIGN_IN_PROVIDERS = ['facebook', 'google', 'email'];

const EmailLogin = ({ handleEmailLogin }) =>
  <div className={styles.EmailLogin} onClick={handleEmailLogin}>
    <i className={styles.providerIcon + ' ' + styles.Email}>@</i>
  </div>;

export const Provider = ({
  provider,
  handleGoogleLogin,
  handleFacebookLogin,
  handleEmailLogin
}) => {
  let childProvider, providerName;
  switch (provider) {
    case 'google':
      childProvider = (
        <GoogleLogin
          className={styles.GoogleLogin}
          clientId={config.youtube.CLIENT_ID}
          onSuccess={handleGoogleLogin}
        >
          <i className={styles.providerIcon + ' fa fa-google-plus'} />
        </GoogleLogin>
      );
      providerName = 'Google+';
      break;
    case 'facebook':
      childProvider = (
        <FacebookLogin
          appId={config.facebook.APP_ID}
          textButton=""
          fields="name,email,picture"
          cssClass={styles.FacebookLogin}
          callback={handleFacebookLogin}
          icon={'fa-facebook ' + styles.providerIcon}
        />
      );
      providerName = 'Facebook';
      break;
    case 'email':
      childProvider = <EmailLogin handleEmailLogin={handleEmailLogin} />;
      providerName = 'Email';
      break;
    default:
      childProvider = null;
  }

  return (
    <div className={styles.providerWrapper}>
      {childProvider}
      <p className={styles.providerName}>
        {providerName}
      </p>
    </div>
  );
};

const SignInProviders = props =>
  <div className={styles.paper}>
    <p className={styles.message}>
      {props.message}
    </p>
    <div className={styles.providers}>
      {SIGN_IN_PROVIDERS.map(provider =>
        <Provider key={provider} provider={provider} {...props} />
      )}
    </div>
  </div>;

export default SignInProviders;
