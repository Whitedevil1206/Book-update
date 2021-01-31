import React, { useState } from 'react';
import styles from '../css/navBar.module.css';
import { Link } from 'react-router-dom';

const NavBar = ({ token }) => {
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    if (menu) setMenu(false);
    else if (!menu) setMenu(true);
  };

  if (!token && !menu) {
    return (
      <div className={styles.container}>
        <div className={styles.bar}>
          <Link to="/" className={styles.logo}>
            <h3>LOGO</h3>
          </Link>
          <ul className={styles.navlinks}>
            <Link to="/">Library</Link>
            <Link to="/yb">Your Books</Link>
            <Link to="/login">LogIn</Link>
          </ul>
          <div onClick={handleMenu} className={styles.menu}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
          </div>
        </div>
      </div>
    );
  } else if (token && !menu) {
    return (
      <div className={styles.container}>
        <div className={styles.bar}>
          <Link to="/" className={styles.logo}>
            <h3>LOGO</h3>
          </Link>
          <ul className={styles.navlinks}>
            <Link to="/">Library</Link>
            <Link to="/yb">Your Books</Link>
            <Link to="/profile">Profile</Link>
          </ul>
          <div onClick={handleMenu} className={styles.menu}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
          </div>
        </div>
      </div>
    );
  } else if (!token && menu) {
    return (
      <div className="extra">
        <div className={styles.container}>
          <div className={styles.bar}>
            <Link to="/" className={styles.logo}>
              <h3>LOGO</h3>
            </Link>

            <div onClick={handleMenu} className={styles.menu}>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
            </div>
          </div>
        </div>
        <div className={styles.lic}>
          <ul className={styles.sidelinks}>
            <Link onClick={handleMenu} to="/">
              Library
            </Link>
            <Link onClick={handleMenu} to="/yb">
              Your Books
            </Link>
            <Link onClick={handleMenu} to="/login">
              LogIn
            </Link>
          </ul>
        </div>
      </div>
    );
  } else if (token && menu) {
    return (
      <div className="extra">
        <div className={styles.container}>
          <div className={styles.bar}>
            <Link to="/" className={styles.logo}>
              <h3>LOGO</h3>
            </Link>

            <div onClick={handleMenu} className={styles.menu}>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
            </div>
          </div>
        </div>
        <div className={styles.lic}>
          <ul className={styles.sidelinks}>
            <Link onClick={handleMenu} to="/">
              Library
            </Link>
            <Link onClick={handleMenu} to="/yb">
              Your Books
            </Link>
            <Link onClick={handleMenu} to="/profile">
              Profile
            </Link>
          </ul>
        </div>
      </div>
    );
  }
};

export default NavBar;
