import { Link } from 'react-router-dom';
import styles from './LoginForm.module.scss';

export const LoginForm = () => {
  return (
    <div className={styles.loginForm}>
      <form className={styles.loginWrapper}>
        <h2 className={styles.loginTitle}>Login</h2>

        <div className={styles.loginItemWrapper}>
          <p className={styles.loginItemInfo}>Email</p>
          <input type='text' className='input' placeholder='Email' />
        </div>

        <div className={styles.loginItemWrapper}>
          <p className={styles.loginItemInfo}>Password</p>
          <input
            type='password'
            className={`input ${styles.inputPassword}`}
            placeholder='Password'
          />

          <div className={styles.forgotWrapper}>
            <a href='#' className={styles.forgotPassword}>
              Forgot password?
            </a>
          </div>
        </div>

        <a className={`button button-primary ${styles.buttonLogin}`}>Sign in</a>
        <p className={styles.signUpText}>
          Don’t have account?{' '}
          <Link to='/auth/signUp' className={styles.signUpLink}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};
