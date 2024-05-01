import { Link } from 'react-router-dom';
import styles from './AuthForm.module.scss';

export const RegistartionForm = () => {
  return (
    <div className={styles.loginForm}>
      <form className={styles.loginWrapper}>
        <h2 className={styles.loginTitle}>Sign Up</h2>

        <div className={styles.loginItemWrapper}>
          <p className={styles.loginItemInfo}>Full Name</p>
          <input type='text' className='input' placeholder='Full Name' />
        </div>

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
        </div>

        <a className={`button button-primary ${styles.buttonLogin}`}>Register</a>

        <Link to='/auth/signUp' className={styles.signUpLink}>
          Back to signIn
        </Link>
      </form>
    </div>
  );
};
