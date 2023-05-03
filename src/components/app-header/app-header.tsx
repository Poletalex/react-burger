import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { Navigation } from './navigation/navigation';
import { Link } from 'react-router-dom';

export const AppHeader = () => {
    return (
        <header className={styles.container}>
            <Navigation
                to='/'
                title='Конструктор'
                icon='burger'
            />
            <Navigation
                to='/list'
                title='Лента заказов'
                icon='list'
            />
            <Link
                to='/'
                className={styles.logo}>
                <Logo />
            </Link>
            <Navigation
                to='/profile'
                title='Личный кабинет'
                icon='profile'
            />
        </header>
    );
};