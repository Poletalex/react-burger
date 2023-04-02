import React, { useState } from "react";
import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './profile.module.css';
import { useSelector } from "react-redux";

export const ProfilePage = () => {
    const { user } = useSelector(store => store.user);

    const [value, setValue] = useState({
        name: user.name || '',
        login: user.email || '',
        password: user.password || ''
    });

    const onChange = event => {
        setValue({ ...value, [event.target.name]: event.target.value });
    };

    return (
        <main className={styles.main}>
            <div className={styles.menu}>
                <p className="text text_type_main-medium">
                    Профиль
                </p>
                <p className="text text_type_main-medium">
                    История заказов
                </p>
                <p className="text text_type_main-medium">
                    Выход
                </p>
                <p className="text text_type_main-default text_color_inactive mt-20">
                    В этом разделе вы можете
                    изменить свои персональные данные
                </p>
            </div>
            <div className={styles.form + ' ml-15'}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={onChange}
                    value={value.name}
                    name={'name'}
                    error={false}
                    size={'default'}
                    extraClass="mb-6"
                    icon={'EditIcon'}
                />
                <Input
                    type={'text'}
                    placeholder={'Логин'}
                    onChange={onChange}
                    value={value.login}
                    name={'login'}
                    error={false}
                    size={'default'}
                    extraClass="mb-6"
                    icon={'EditIcon'}
                />
                <PasswordInput
                    placeholder={'Пароль'}
                    onChange={onChange}
                    value={value.password}
                    name={'password'}
                    icon={'EditIcon'}
                />
            </div>
        </main>
    );
};