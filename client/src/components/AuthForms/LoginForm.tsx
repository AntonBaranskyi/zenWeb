import { Link } from 'react-router-dom';
import styles from './AuthForm.module.scss';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { ILoginData } from '../../types/ILoginData';
import {
  fetchLogin,
  onCleanErrors,
  selectIsAuth,
} from '../../store/slices/userSlice';
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { STATUS } from '../../types/statusEnum';
import Notiflix from 'notiflix';

import { Navigate } from 'react-router-dom';

export const LoginForm = () => {
  const dispatch = useAppDispatch();

  const { loginStatus: status } = useAppSelector((state) => state.user);
  const isAuth = useAppSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    clearErrors,
  } = useForm({
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
  });

  const onHandleSubmit = (data: ILoginData) => {
    dispatch(fetchLogin(data));
  };

  const handlePasswordInputChange = () => {
    clearErrors('password');
  };

  const handleEmailInputChange = () => {
    clearErrors('email');
  };

  useEffect(() => {
    if (isAuth) {
      Notiflix.Notify.init({
        position: 'right-top',
      });
      Notiflix.Notify.success('Successfully logged', { timeout: 1500 });
    }
  }, [isAuth]);

  useEffect(() => {
    if (status === STATUS.ERROR) {
      Notiflix.Notify.init({
        position: 'right-top',
      });
      Notiflix.Notify.failure('Invalid login or password', { timeout: 1500 });
    }
  }, [status]);

  useEffect(() => {
    dispatch(onCleanErrors());
  }, [dispatch]);

  if (isAuth) {
    return <Navigate to='/' />;
  }

  return (
    <div className={styles.loginForm}>
      <form
        className={styles.loginWrapper}
        onSubmit={handleSubmit(onHandleSubmit)}
      >
        <h2 className={styles.loginTitle}>Login</h2>

        <div className={styles.loginItemWrapper}>
          <p className={styles.loginItemInfo}>Email</p>
          <input
            type='text'
            className='input'
            placeholder='Email'
            {...register('email', {
              required: 'Please, write your email',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Invalid email address',
              },
            })}
            onFocus={handleEmailInputChange}
          />

          {errors.email && (
            <span className={styles.errorText}>{errors.email.message}</span>
          )}
        </div>

        <div className={styles.loginItemWrapper}>
          <p className={styles.loginItemInfo}>Password</p>
          <input
            type='password'
            className={`input ${styles.inputPassword}`}
            placeholder='Password'
            {...register('password', {
              required: 'Please,write your password',
              minLength: {
                value: 4,
                message: 'Password should be at least 4 characters long',
              },
            })}
            onFocus={handlePasswordInputChange}
          />

          {errors.password && (
            <span className={styles.errorText}>{errors.password.message}</span>
          )}

          <div className={styles.forgotWrapper}>
            <Link to='/auth/forgot-password' className={styles.forgotPassword}>
              Forgot password?
            </Link>
          </div>
        </div>

        <button
          className={`button button-primary ${styles.buttonLogin}`}
          type='submit'
          disabled={!isValid}
        >
          Sign in
        </button>
        <p className={styles.signUpText}>
          Don’t have account?
          <Link to='/auth/signUp' className={styles.signUpLink}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};
