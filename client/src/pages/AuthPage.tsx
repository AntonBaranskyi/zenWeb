import styles from './AuthPage.module.scss';
import { Outlet } from 'react-router-dom';

export const AuthPage = () => {
  return (
    <div className={styles.authPageWrapper}>
      <div className={styles.authPagePoster} />

      <Outlet />
    </div>
  );
};
