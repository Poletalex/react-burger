import React from "react";
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login.module.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../services/actions/user";
import { useForm } from "../hooks/useForm";

export const LoginPage = () => {
    const { form, onChange } = useForm({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(login(form));
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={styles.main}>
            <p className="text text_type_main-medium mb-6">
                Вход
            </p>
            <EmailInput
                extraClass="mb-6"
                onChange={onChange}
                value={form.email}
                name={'email'}
                isIcon={false}
            />
            <PasswordInput
                onChange={onChange}
                value={form.password}
                name={'password'}
                extraClass="mb-6"
            />
            <Button
                htmlType="submit"
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
                    size="medium"
                    onClick={() => {
                        navigate('/register');
                    }}>
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
                    size="medium"
                    onClick={() => {
                        navigate('/forgot-password');
                    }}>
                    Восстановить пароль
                </Button>
            </div>
        </form>
    );
};