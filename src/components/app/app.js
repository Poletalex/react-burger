import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { Modal } from '../modals/modal/modal';
import styles from './app.module.css';

function App() {
  const [showModal, setShow] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://norma.nomoreparties.space/api/ingredients');
        const { data } = await res.json();
        setData(data);
      } catch (err) { 
        console.log('Ошибка получения данных!');
      };      
    })();
  }, []);

  return (
    <div className={styles.app}>    
      <AppHeader />
      <main className={styles.main}>
        {
          data && (
            <>
              <BurgerIngredients data={data} />
              <BurgerConstructor data={data} />
            </>        
          )
        }
        
      </main>
      {
        showModal && (
          <Modal header="Внимание!" onClose={() => setShow(false)}>
          <p>Это модалка!</p>
          </Modal>
        ) 
      }      
    </div>    
  );
}

export default App;