import { useEffect } from 'react';
import { CardList } from '../components/CardList';
import { MainScreen } from '../components/MainScreen';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchAuthMe } from '../store/slices/userSlice';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  return (
    <>
      <MainScreen />
      <CardList />
    </>
  );
};
