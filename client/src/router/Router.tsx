import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, AuthPage } from '../pages';

import { App } from '../App';
import { LoginForm, RegistartionForm } from '../components/AuthForms';

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<App />} path='/'>
        <Route index element={<HomePage />} />
        <Route path='auth' element={<AuthPage />}>
          <Route path='logIn' element={<LoginForm />} />
          <Route path='signUp' element={<RegistartionForm />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
