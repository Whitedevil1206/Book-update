import React, { useState } from 'react';
import styles from '../css/navBar.module.css';
import { Link, NavLink } from 'react-router-dom';

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
            <NavLink to="/">Library</NavLink>
            <NavLink to="/yb">Your Books</NavLink>
            <NavLink to="/login">LogIn</NavLink>
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
            <NavLink to="/">Library</NavLink>
            <NavLink to="/yb">Your Books</NavLink>
            <NavLink to="/profile">Profile</NavLink>
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
            <NavLink onClick={handleMenu} to="/">
              Library
            </NavLink>
            <NavLink onClick={handleMenu} to="/yb">
              Your Books
            </NavLink>
            <NavLink onClick={handleMenu} to="/profile">
              Profile
            </NavLink>
          </ul>
        </div>
      </div>
    );
  }
};

export default NavBar;
