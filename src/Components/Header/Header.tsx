import styles from './header.module.css';
import { NavLink } from 'react-router-dom';
import { Logo } from './Logo';
import { Statistics } from './StatisticsLogo';

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerWrapper}>
        <NavLink to="/" >
          <Logo />
        </NavLink>
        <NavLink to="/statistics" >
          <Statistics />
        </NavLink>
      </div>
    </div>
  )
}