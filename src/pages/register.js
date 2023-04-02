import React, { useState } from "react";
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './register.module.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../services/action";

export const RegisterPage = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onChange = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    return (
        <main className={styles.main}>
            <p className="text text_type_main-medium mb-6">
                Регистрация
            </p>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={onChange}
                value={form.name}
                name={'name'}
                error={false}
                size={'default'}
                extraClass="mb-6"
            />
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
                htmlType="button"
                type="primary"
                size="medium"
                extraClass="mb-20"
                onClick={() => dispatch(register(form))}>
                Зарегистрироваться
            </Button>
            <div className={styles.footer}>
                <p className="text text_type_main-default text_color_inactive mr-2">
                    Уже зарегистрированы?
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