import styles from './AuthForm.module.scss';
import { Link } from 'react-router-dom';

export const ForgotForm = () => {
  return (
    <div className={styles.loginForm}>
      <form className={styles.loginWrapper}>
        <h2 className={styles.loginTitle}>Write your email</h2>

        <div className={styles.loginItemWrapper}>
          <p className={styles.loginItemInfo}>Email</p>
          <input
            type='text'
            className='input'
            placeholder='Email'
            // {...register('email', {
            //   required: 'Please, write your email',
            //   pattern: {
            //     value: /^\S+@\S+\.\S+$/,
            //     message: 'Invalid email address',
            //   },
            // })}
            // onFocus={handleEmailInputChange}
          />

          {/* {errors.email && (
            <span className={styles.errorText}>{errors.email.message}</span>
          )} */}
        </div>

        <button
          className={`button button-primary ${styles.buttonLogin}`}
          type='submit'
        >
          Continue
        </button>

        <Link to='/auth/logIn' className={styles.signUpLink}>
          Back to login
        </Link>
      </form>
    </div>
  );
};
