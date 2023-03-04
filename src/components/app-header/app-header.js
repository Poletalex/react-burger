import React from 'react';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

const navClass = `${styles.nav} mr-2 mt-4 mb-4 pl-5 pr-5`;

const AppHeader = props => {
    return (
        <header className={styles.container}>
            <div className={navClass}>
                <BurgerIcon type="primary" />
                <p className="text text_type_main-default ml-2">
                    Конструктор
                </p>
            </div>
            <div className={navClass}>
                <ListIcon type="primary" />
                <p className="text text_type_main-default ml-2">
                    Лента заказов
                </p>
            </div>
            <Logo />
            <div className={navClass}>
                <ProfileIcon type="primary" />
                <p className="text text_type_main-default ml-2">
                    Личный кабинет
                </p>
            </div>       
        </header>
    );
};

export default AppHeader;