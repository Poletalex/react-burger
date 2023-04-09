import React from "react";
import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import styles from './navigation.module.css';
import PropTypes from 'prop-types';

const components = {
    burger: BurgerIcon,
    list: ListIcon,
    profile: ProfileIcon
};

export const Navigation = ({ to, title, icon }) => {
    const Icon = components[icon];

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                (`mr-2 mt-4 mb-4 pl-5 pr-5 ` + (isActive ? styles.activeNavLink : styles.navLink))}>
            <Icon type="secondary" />
            <p className="text text_type_main-default text_color_inactive ml-2">
                {title}
            </p>
        </NavLink>
    );
};

Navigation.propTypes = {
    to: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
};

