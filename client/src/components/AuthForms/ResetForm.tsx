import React from 'react';

import styles from './AuthForm.module.scss';
import { Link } from 'react-router-dom';

export const ResetForm = () => {
  return (
    <div className={styles.loginForm}>
      <form className={styles.loginWrapper}>
        <h2 className={styles.loginTitle}>Write new password</h2>

        <div className={styles.loginItemWrapper}>
          <p className={styles.loginItemInfo}>Password</p>
          <input
            type='password'
            className='input'
            placeholder='Password'
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

        <div className={styles.loginItemWrapper}>
          <p className={styles.loginItemInfo}>Confirm password</p>
          <input
            type='password'
            className='input'
            placeholder='Repeat password'
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
          Submit
        </button>

        <Link to='/auth/logIn' className={styles.signUpLink}>
          Back to login
        </Link>
      </form>
    </div>
  );
};
