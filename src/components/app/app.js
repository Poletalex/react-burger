import React, { useState, useEffect, createContext } from 'react';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import styles from './app.module.css';
import { getFilteredData } from '../../utils/utils';

const DATA_SOURCE = 'https://norma.nomoreparties.space/api/ingredients';

export const IngredientsContext = createContext();

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(DATA_SOURCE);
        if (res.ok) {
          const { data } = await res.json();
          setData(data);
        } else { 
          throw new Error(`Ошибка ${res.status}`)
        }        
      } catch (err) { 
        console.log(err.message);
      };      
    })();
  }, []);

  return (
    <div className={styles.app}>    
      <AppHeader />
      <main className={styles.main}>
        {
          data && (
            <IngredientsContext.Provider value={{ ingredients: data, data: getFilteredData(data) }}>
              <BurgerIngredients />
              <BurgerConstructor />
            </IngredientsContext.Provider>                     
          )
        }        
      </main>    
    </div>    
  );
}

export default App;