import { Link, Navigate } from 'react-router-dom';
import styles from './AuthForm.module.scss';
import { useForm } from 'react-hook-form';
import {
  fetchRegister,
  onCleanErrors,
  selectIsAuth,
} from '../../store/slices/userSlice';
import { IRegisterData } from '../../types/IRegisterData';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useEffect } from 'react';
import { STATUS } from '../../types/statusEnum';
import Notiflix from 'notiflix';

export const RegistartionForm = () => {
  const dispatch = useAppDispatch();

  const { registerStatus: status } = useAppSelector((state) => state.user);
  const isAuth = useAppSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    clearErrors,
  } = useForm({
    defaultValues: { email: '', password: '', full_name: '' },
    mode: 'onBlur',
  });

  const onHandleSubmit = (data: IRegisterData) => {
    
    dispatch(fetchRegister(data));
  };

  const handlePasswordInputChange = () => {
    clearErrors('password');
  };

  const handleEmailInputChange = () => {
    clearErrors('email');
  };

  const handleFullNameInputChange = () => {
    clearErrors('full_name');
  };

  useEffect(() => {
    if (isAuth) {
      Notiflix.Notify.init({
        position: 'right-top',
      });
      Notiflix.Notify.success('Successfully register', { timeout: 1500 });
    }
  }, [isAuth]);

  useEffect(() => {
    if (status === STATUS.ERROR) {
      Notiflix.Notify.init({
        position: 'right-top',
      });

      Notiflix.Notify.failure('There is a problem with registration', {
        timeout: 1500,
      });
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
        <h2 className={styles.loginTitle}>Sign Up</h2>

        <div className={styles.loginItemWrapper}>
          <p className={styles.loginItemInfo}>Full Name</p>
          <input
            type='text'
            className='input'
            placeholder='Full Name'
            {...register('full_name', {
              required: 'Please,write your name',
              minLength: {
                value: 3,
                message: 'Name should be at least 3 characters long',
              },
            })}
            onFocus={handleFullNameInputChange}
          />

          {errors.full_name && (
            <span className={styles.errorText}>{errors.full_name.message}</span>
          )}
        </div>

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
        </div>

        <button
          className={`button button-primary ${styles.buttonLogin}`}
          type='submit'
          disabled={!isValid}
        >
          Register
        </button>

        <Link to='/auth/logIn' className={styles.signUpLink}>
          Back to login
        </Link>
      </form>
    </div>
  );
};
