import React, { FormEvent, useEffect } from "react";
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login.module.css';
import { useNavigate } from "react-router-dom";
import { forgotPassword, FORGOT_PASSWORD_CLOSE } from "../services/actions/forgot-password";
import { useForm } from "../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export const ForgotPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { success } = useAppSelector(store => store.forgotPassword);

    const { form, onChange } = useForm({ email: '' });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(forgotPassword(form));
    };

    useEffect(() => {
        if (success) {
            dispatch({
                type: FORGOT_PASSWORD_CLOSE
            });
            navigate('/reset-password', { state: { prev: '/forgot-password', replace: true } });
        }
    }, [success, dispatch, navigate]);

    return (
        <form
            onSubmit={handleSubmit}
            className={styles.main}>
            <p className="text text_type_main-medium mb-6">
                Восстановление пароля
            </p>
            <EmailInput
                extraClass="mb-6"
                placeholder={'Укажите e-mail'}
                onChange={onChange}
                value={form.email}
                name={'email'}
                isIcon={false}
            />
            <Button
                htmlType="submit"
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
        </form>
    );
};