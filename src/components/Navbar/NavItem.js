import React from 'react';
import styles from './Navbar.css';

const NavItem = ({ active, href, onClick, children }) => {
  const color = active ? 'rgba(145, 10, 146, 1)' : 'rgba(113, 113, 113, 1)';

  return (
    <div
      href={href}
      onClick={onClick}
      className={styles.navItem}
      style={{ color }}
    >
      {children}
    </div>
  );
};

export default NavItem;
