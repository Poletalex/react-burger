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

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>  
      <Router>
        <AppHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPage />} />
          <Route path="/reset-password" element={<ResetPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>   
    </div>    
  );
}

export default App;