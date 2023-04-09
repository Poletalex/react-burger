import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './profile.module.css';
import { ProfileNavigation } from "./profile-navigation";
import { patchUser } from "../../services/action";
import { useForm } from "../../hooks/useForm";

export const ProfileForm = () => {
    const { user } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const initValue = {
        name: user.name,
        email: user.email,
        password: ''
    };

    const { form, setForm, onChange } = useForm(initValue);

    const save = event => {
        event.preventDefault();
        dispatch(patchUser(form));
    };

    const cancel = () => {
        setForm(initValue);
    };

    const isChanged = useCallback(() =>
        user.name !== form.name ||
        user.email !== form.email ||
        !!form.password, [user, form]);

    return (
        <div className={styles.main}>
            <div className={styles.menu}>
                <ProfileNavigation />
                <p className="text text_type_main-default text_color_inactive mt-20">
                    В этом разделе вы можете
                    изменить свои персональные данные
                </p>
            </div>
            <form
                onSubmit={save}
                className={styles.form + ' ml-15'}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={onChange}
                    value={form.name}
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
                    value={form.email}
                    name={'email'}
                    error={false}
                    size={'default'}
                    extraClass="mb-6"
                    icon={'EditIcon'}
                />
                <PasswordInput
                    placeholder={'Пароль'}
                    onChange={onChange}
                    value={form.password}
                    name={'password'}
                    icon={'EditIcon'}
                    extraClass="mb-6"
                />
                {
                    isChanged() && (
                        <div className={styles.buttons}>
                            <Button
                                htmlType="submit"
                                type="primary"
                                size="medium"
                                extraClass="mr-4">
                                Сохранить
                            </Button>
                            <Button
                                htmlType="button"
                                type="primary"
                                size="medium"
                                onClick={cancel}>
                                Отмена
                            </Button>
                        </div>
                    )
                }
            </form>
        </div>
    );

};