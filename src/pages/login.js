import React, { useState } from "react";
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login.module.css';

export const LoginPage = () => {
    const [value, setValue] = useState({
        email: '',
        password: ''
    });
    const onChange = event => {
        setValue({ ...value, [event.target.name]: event.target.value });
    };

    return (
        <main className={styles.main}>
            <p className="text text_type_main-medium mb-6">
                Вход
            </p>
            <EmailInput
                extraClass="mb-6"
                onChange={onChange}
                value={value.email}
                name={'email'}
                isIcon={false}
            />
            <PasswordInput
                onChange={onChange}
                value={value.password}
                name={'password'}
                extraClass="mb-6"
            />
            <Button
                htmlType="button"
                type="primary"
                size="medium"
                extraClass="mb-20">
                Войти
            </Button>
            <div className={styles.footer + ' mb-4'}>
                <p className="text text_type_main-default text_color_inactive mr-2">
                    Вы — новый пользователь?
                </p>
                <Button
                    htmlType="button"
                    type="secondary"
                    size="medium">
                    Зарегистрироваться
                </Button>
            </div>
            <div className={styles.footer}>
                <p className="text text_type_main-default text_color_inactive mr-2">
                    Забыли пароль?
                </p>
                <Button
                    htmlType="button"
                    type="secondary"
                    size="medium">
                    Восстановить пароль
                </Button>
            </div>
        </main>
    );
};