import { ProfileNavigation } from "./profile-navigation";
import styles from './profile.module.css';

export const OrdersHistory = () => {
    return (
        <div className={styles.main}>
            <div className={styles.menu}>
                <ProfileNavigation />
            </div>
            <div className={styles.form + ' ml-15'}>
                <p className="text text_type_main-large">
                История заказов
            </p>
            </div>
        </div>
    );
};