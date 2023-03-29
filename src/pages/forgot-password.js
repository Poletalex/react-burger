import React, { useState } from "react";
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login.module.css';
import { useNavigate } from "react-router-dom";

export const ForgotPage = () => {
    const [value, setValue] = useState('');

    const onChange = event => {
        setValue(event.target.value);
    };

    const navigate = useNavigate();

    return (
        <main className={styles.main}>
            <p className="text text_type_main-medium mb-6">
                Восстановление пароля
            </p>
            <EmailInput
                extraClass="mb-6"
                placeholder={'Укажите e-mail'}
                onChange={onChange}
                value={value}
                name={'email'}
                isIcon={false}
            />
            <Button
                htmlType="button"
                type="primary"
                size="medium"
                extraClass="mb-20">
                Восстановить
            </Button>
            <div className={styles.footer}>
                <p className="text text_type_main-default text_color_inactive mr-2">
                    Вспомнили пароль?
                </p>
                <Button
                    htmlType="button"
                    type="secondary"
                    size="medium"
                    onClick={() => {
                        navigate('/login');
                    }}>
                    Войти
                </Button>
            </div>
        </main>
    );
};