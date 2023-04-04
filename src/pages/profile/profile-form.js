import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './profile.module.css';
import { ProfileNavigation } from "./profile-navigation";
import { patchUser } from "../../services/action";

export const ProfileForm = () => {
    const { user } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const initValue = {
        name: user.name,
        email: user.email,
        password: ''
    };

    const [value, setValue] = useState(initValue);

    const onChange = event => {
        setValue({ ...value, [event.target.name]: event.target.value });
    };

    const isChanged = useCallback(() =>
        user.name !== value.name ||
        user.email !== value.email ||
        !!value.password, [user, value]);

    return (
        <div className={styles.main}>
            <div className={styles.menu}>
                <ProfileNavigation />
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
                    value={value.email}
                    name={'email'}
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
                    extraClass="mb-6"
                />
                {
                    isChanged() && (
                        <div className={styles.buttons}>
                            <Button
                                htmlType="button"
                                type="primary"
                                size="medium"
                                extraClass="mr-4"
                                onClick={() => dispatch(patchUser(value))}>
                                Сохранить
                            </Button>
                            <Button
                                htmlType="button"
                                type="primary"
                                size="medium"
                                onClick={() => { setValue(initValue); }}>
                                Отмена
                            </Button>
                        </div>
                    )
                }
            </div>
        </div>
    );

};