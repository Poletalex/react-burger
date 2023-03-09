import React, { useState, useEffect } from 'react';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import styles from './app.module.css';

const DATA_SOURCE = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(DATA_SOURCE);
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
    </div>    
  );
}

export default App;