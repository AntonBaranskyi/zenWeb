import { useForm } from 'react-hook-form';
import styles from './AuthForm.module.scss';
import { Link } from 'react-router-dom';
import { fetchForgotPassword } from '../../store/slices/userSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useEffect } from 'react';
import Notiflix from 'notiflix';

export const ForgotForm = () => {
  const dispatch = useAppDispatch();
  const { isOpenForgotModal } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    getValues,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { email: '' },
    mode: 'onBlur',
  });

  const handleEmailInputChange = () => {
    clearErrors('email');
  };

  const onHandleSubmit = (data: { email: string }) => {
    dispatch(fetchForgotPassword({ email: data.email }));
  };

  useEffect(() => {
    if (isOpenForgotModal) {
      Notiflix.Report.success(
        'Email sent succesfully',
        `On your email ${getValues(
          'email'
        )} was send a letter with reset link, open it to change your password`,
        'Okay'
      );
    }
  }, [getValues, isOpenForgotModal]);

  return (
    <div className={styles.loginForm}>
      <form
        className={styles.loginWrapper}
        onSubmit={handleSubmit(onHandleSubmit)}
      >
        <h2 className={styles.loginTitle}>Write your email</h2>

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

        <button
          className={`button button-primary ${styles.buttonLogin}`}
          type='submit'
          disabled={!isValid}
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
