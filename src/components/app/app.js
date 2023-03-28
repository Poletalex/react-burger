import React, { useEffect } from 'react';
import { AppHeader } from '../app-header/app-header';
import styles from './app.module.css';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from '../../pages/home';
import { LoginPage } from '../../pages/login';
import { RegisterPage } from '../../pages/register';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>    
      <AppHeader />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>   
    </div>    
  );
}

export default App;