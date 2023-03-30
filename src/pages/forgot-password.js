import React, { useEffect, useState } from "react";
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login.module.css';
import { useNavigate } from "react-router-dom";
import { forgotPassword, FORGOT_PASSWORD_CLOSE } from "../services/actions/forgot-password";
import { useDispatch, useSelector } from "react-redux";

export const ForgotPage = () => {
    const [value, setValue] = useState('');

    const onChange = event => {
        setValue(event.target.value);
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { success } = useSelector(store => store.forgotPassword);

    useEffect(() => {
        if (success) { 
            dispatch({
                type: FORGOT_PASSWORD_CLOSE
            });
            navigate('/reset-password');
        }
    }, [success, dispatch, navigate]);

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
                extraClass="mb-20"
                onClick={() => dispatch(forgotPassword(value))}>
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