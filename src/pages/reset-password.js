import React, { useState } from "react";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login.module.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../services/actions/reset-password";

export const ResetPage = () => {
    const [value, setValue] = useState({
        password: '',
        token: ''
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onChange = event => {
        setValue({ ...value, [event.target.name]: event.target.value });
    };

    return (
        <main className={styles.main}>
            <p className="text text_type_main-medium mb-6">
                Восстановление пароля
            </p>
            <PasswordInput
                placeholder={'Введите новый пароль'}                
                onChange={onChange}
                value={value.password}
                name={'password'}
                extraClass="mb-6"
            />
            <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={onChange}
                value={value.token}
                name={'token'}
                error={false}
                size={'default'}
                extraClass="mb-6"
            />
            <Button
                htmlType="button"
                type="primary"
                size="medium"
                extraClass="mb-20"
                onClick={() => dispatch(resetPassword(value))}>
                Сохранить
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