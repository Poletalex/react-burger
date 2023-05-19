import styles from './loader.module.css';

export const Loader = () => {
    return (<p className={styles.main + " text text_type_main-medium ml-4 mr-4 mb-10"}>
        Подождите, идет проверка токена...
    </p>)
};
