import React from 'react';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = props => {
    return (
        <header>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default">
                Конструктор
            </p>
            <ListIcon type="primary" />
            <p className="text text_type_main-default">
                Лента заказов
            </p>            
            <Logo />
            <ProfileIcon type="primary" />
            <p className="text text_type_main-default">
                Личный кабинет
            </p> 
        </header>
    );
};

export default AppHeader;