import styles from './logo.module.css';
import { ReactComponent as LogoIcon } from '../../../assets/img/logo.svg';

export const Logo = () => {
  return (
    <div className={styles.LogoWrapper}>
      <LogoIcon className={styles.Logo} />
      <span className={styles.LogoText}>
        pomodoro_box
      </span>
    </div>
  )
}