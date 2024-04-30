import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, AuthPage } from '../pages';
import { LoginForm } from '../components/LoginForm';
import { RegistrationForm } from '../components/RegistrationForm';
import { App } from '../App';

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<App />} path='/'>
        <Route index element={<HomePage />} />
        <Route path='auth' element={<AuthPage />}>
          <Route path='logIn' element={<LoginForm />} />
          <Route path='signUp' element={<RegistrationForm />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
