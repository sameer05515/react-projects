import { NavLink } from "react-router-dom";
import styles from "./header.module.css";

const Header = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/testing"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Test
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/projects"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/companies"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Companies
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/company-domains"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Company Domains
          </NavLink>
        </li>
        <li>
          <NavLink to={"/architectural-styles"} className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Architectural Styles
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tech-stacks"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Tech Stacks
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
