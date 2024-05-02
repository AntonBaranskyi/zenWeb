import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { useAppSelector } from '../../hooks/useAppSelector';
import { onLogoutUser, selectIsAuth } from '../../store/slices/userSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { Confirm } from 'notiflix';

export const Header = () => {
  const isAuth = useAppSelector(selectIsAuth);

  const dispacth = useAppDispatch();

  const handleLogout = () => {
    Confirm.show(
      'Logout',
      'Are tou sure you want to logout',
      'Yes',
      'No',
      () => {
        dispacth(onLogoutUser());
      }
    );
  };

  return (
    <header className={styles.header}>
      <div className='container'>
        <div className={styles.headerWrapper}>
          <div className={styles.headerButtons}>
            {!isAuth ? (
              <>
                <Link
                  to='/auth/logIn'
                  className={`button ${styles.buttonLogin}`}
                >
                  Log In
                </Link>
                <Link
                  to='/auth/signUp'
                  className={`button button-primary ${styles.buttonLogin}`}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button className='button button-primary' onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
