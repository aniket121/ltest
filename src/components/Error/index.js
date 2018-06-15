import React from 'react';
import styles from './Error.css';

const Error = ({ message, link }) => {
  return (
    <div className={styles.Error}>
      {message}
      <br />
      <br />
      {link &&
        <a target="_blank" className="errorLink" href={link}>
          {link}
        </a>}
    </div>
  );
};

export default Error;
