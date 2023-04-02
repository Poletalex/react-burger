import React, { useEffect } from 'react';
import { AppHeader } from '../app-header/app-header';
import styles from './app.module.css';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from '../../pages/home';
import { LoginPage } from '../../pages/login';
import { RegisterPage } from '../../pages/register';
import { ForgotPage } from '../../pages/forgot-password';
import { ResetPage } from '../../pages/reset-password';
import { ProfilePage } from '../../pages/profile';
import { WithAuth, WithoutAuth } from '../protected-route.js/protected-route';
import { NotFound404 } from '../../pages/404';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.app}>
      <Router>
        <AppHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<WithoutAuth element={< LoginPage />} />} />
          <Route path="/register" element={<WithoutAuth element={< RegisterPage />} />} />
          <Route path="/forgot-password" element={<WithoutAuth element={<ForgotPage />} />} />
          <Route path="/reset-password" element={<WithoutAuth element={<ResetPage />} />} />
          <Route path="/profile" element={<WithAuth element={<ProfilePage />} />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;