import { useEffect } from 'react';
import { CardList } from '../components/CardList';
import { MainScreen } from '../components/MainScreen';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchAuthMe, selectIsAuth } from '../store/slices/userSlice';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchDeals } from '../store/slices/dealSlice';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchDeals());
    }
  }, [dispatch, isAuth]);

  return (
    <>
      <MainScreen />
      {isAuth && <CardList />}
    </>
  );
};
