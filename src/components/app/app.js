import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';

function App() {
  return (
    <div className={styles.app}>    
      <AppHeader />
      <div className={styles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </div>
    
  );
}

export default App;