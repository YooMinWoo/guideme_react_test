import React from "react";
import { Link } from "react-router-dom"; // 라우팅을 사용하는 경우에만 필요

const Header: React.FC = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.logo}>MyBoard</h1>
      <nav>
        <ul style={styles.navList}>
          <li><Link to="/" style={styles.link}>Home</Link></li>
          <li><Link to="/signup" style={styles.link}>Sign Up</Link></li>
          <li><Link to="/login" style={styles.link}>Login</Link></li>
        </ul>
      </nav>
    </header>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#333",
    color: "#fff"
  },
  logo: {
    margin: 0
  },
  navList: {
    listStyle: "none",
    display: "flex",
    gap: "1rem",
    margin: 0,
    padding: 0
  },
  link: {
    color: "#fff",
    textDecoration: "none"
  }
};

export default Header;
