import React, { useEffect } from 'react';
import { AppHeader } from '../app-header/app-header';
import styles from './app.module.css';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { HomePage } from '../../pages/home';
import { LoginPage } from '../../pages/login';
import { RegisterPage } from '../../pages/register';
import { ForgotPage } from '../../pages/forgot-password';
import { ResetPage } from '../../pages/reset-password';
import { ProfileNavigation } from '../../pages/profile/profile-navigation';
import { WithAuth, WithoutAuth } from '../protected-route.js/protected-route';
import { NotFound404 } from '../../pages/404';
import { IngredientDetails } from '../modals/ingredient-details/ingredient-details'
import { ProfileForm } from '../../pages/profile/profile-form';
import { OrdersHistory } from '../../pages/profile/orders-history';
import { Logout } from '../../pages/logout';
import { Modal } from '../modals/modal/modal';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(getIngredients());
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<WithoutAuth element={< LoginPage />} />} />
        <Route path="/register" element={<WithoutAuth element={< RegisterPage />} />} />
        <Route path="/forgot-password" element={<WithoutAuth element={<ForgotPage />} />} />
        <Route path="/reset-password" element={<WithoutAuth element={<ResetPage />} />} />
        <Route path="/profile" element={<WithAuth element={<ProfileForm />} />} />
        <Route path="/profile/orders" element={<WithAuth element={<OrdersHistory />} />} />
        <Route path="/profile/orders/:id" element={<WithAuth element={<ProfileNavigation />} />} />
        <Route path='/ingredients/:ingredientId' element={<IngredientDetails />} />
        <Route path="/logout" element={<WithAuth element={< Logout />} />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      {
        background && (
          <Routes>
            <Route
              path='/ingredients/:ingredientId'
              element={
                <Modal
                  header='Детали ингредиента'
                  onClose={() => { navigate(-1); }}>
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )
      }
    </div>
  );
}

export default App;