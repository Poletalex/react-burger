import React from 'react';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

const AppHeader = props => {
    return (
        <header className={styles.container}>
            <div className={styles.box}>
                <nav className={styles.nav}>
                    <BurgerIcon type="primary" />
                    <p className="text text_type_main-default">
                        Конструктор
                    </p>
                </nav>
                <nav className={styles.nav}>
                    <ListIcon type="primary" />
                    <p className="text text_type_main-default">
                        Лента заказов
                    </p>
                </nav>
            </div>
            <Logo />
            <div className={styles.box}>
                <nav className={styles.nav}>
                    <ProfileIcon type="primary" />
                    <p className="text text_type_main-default">
                        Личный кабинет
                    </p>
                </nav>   
            </div>     
        </header>
    );
};

export default AppHeader;