import React from "react";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login.module.css';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/actions/reset-password";
import { useForm } from "../hooks/useForm";
import { useAppDispatch } from "../store/hooks";

export const ResetPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();

    const { form, onChange } = useForm({
        password: '',
        token: ''
    });

    const handleSubmit = (event: any) => {
        event.preventDefault();
        dispatch(resetPassword(form));
    };

    return (
        location.state?.prev === '/forgot-password' ?
            <form
                onSubmit={handleSubmit}
                className={styles.main}>
                <p className="text text_type_main-medium mb-6">
                    Восстановление пароля
                </p>
                <PasswordInput
                    placeholder={'Введите новый пароль'}
                    onChange={onChange}
                    value={form.password}
                    name={'password'}
                    extraClass="mb-6"
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={onChange}
                    value={form.token}
                    name={'token'}
                    error={false}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    extraClass="mb-20">
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
            </form> :
            <Navigate to='/' replace/>
    );
};