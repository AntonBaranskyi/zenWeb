import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className='container'>
        <div className={styles.headerWrapper}>
          <div className={styles.headerButtons}>
            <Link to='/auth/logIn' className={`button ${styles.buttonLogin}`}>
              Log In
            </Link>
            <Link
              to='/auth/signUp'
              className={`button button-primary ${styles.buttonLogin}`}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
