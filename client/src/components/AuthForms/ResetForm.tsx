import { useForm } from 'react-hook-form';
import styles from './AuthForm.module.scss';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { fetchUpdatePassword } from '../../store/slices/userSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useEffect } from 'react';
import { STATUS } from '../../types/statusEnum';
import Notiflix from 'notiflix';

export const ResetForm = () => {
  const { userToken } = useParams();

  const { updateStatus } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    clearErrors,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { password: '', passwordRepeat: '' },
    mode: 'onBlur',
  });

  const password = watch('password');

  const validatePasswordRepeat = (value: string) => {
    if (value === password) {
      return true;
    } else {
      return 'Passwords do not match';
    }
  };

  const onHandleSubmit = (data: { password: string }) => {
    if (userToken) {
      const dataToSend = {
        password: data.password,
        token: userToken,
      };

      dispatch(fetchUpdatePassword(dataToSend));
    }
  };

  useEffect(() => {
    if (updateStatus === STATUS.SUCCESS) {
      Notiflix.Notify.init({
        position: 'right-top',
      });
      Notiflix.Notify.success('Successfully updated password', {
        timeout: 1500,
      });
    }
  }, [updateStatus]);

  useEffect(() => {
    if (updateStatus === STATUS.ERROR) {
      Notiflix.Notify.init({
        position: 'right-top',
      });

      Notiflix.Notify.failure('There is a problem with updating password', {
        timeout: 1500,
      });
    }
  }, [updateStatus]);

  if (updateStatus === STATUS.SUCCESS) {
    return <Navigate to='/auth/logIn' />;
  }

  const handlePasswordInputChange = () => {
    clearErrors('password');
  };

  const handleRepeatPasswordChange = () => {
    clearErrors('passwordRepeat');
  };

  return (
    <div className={styles.loginForm}>
      <form
        className={styles.loginWrapper}
        onSubmit={handleSubmit(onHandleSubmit)}
      >
        <h2 className={styles.loginTitle}>Write new password</h2>

        <div className={styles.loginItemWrapper}>
          <p className={styles.loginItemInfo}>Password</p>
          <input
            type='password'
            className='input'
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

        <div className={styles.loginItemWrapper}>
          <p className={styles.loginItemInfo}>Confirm password</p>
          <input
            type='password'
            className='input'
            placeholder='Repeat password'
            {...register('passwordRepeat', {
              required: 'Please,write your password',
              validate: validatePasswordRepeat,
            })}
            onFocus={handleRepeatPasswordChange}
          />

          {errors.passwordRepeat && (
            <span className={styles.errorText}>
              {errors.passwordRepeat.message}
            </span>
          )}
        </div>

        <button
          className={`button button-primary ${styles.buttonLogin}`}
          type='submit'
          disabled={!isValid}
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
