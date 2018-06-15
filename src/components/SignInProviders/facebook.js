import React from 'react';
import styles from './SignInProviders.css';

const FacebookLogin = props => (
  <div
    className={styles.FacebookLogin}
    onClick={props.onClick}
  >
    <i className={"fa fa-facebook " + styles.providerIcon}></i>
  </div>
);

export default FacebookLogin;
