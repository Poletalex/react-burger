import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ProfileNavigation } from "./profile-navigation";
import styles from './profile.module.css';
import { BURGER_WSS, WebsocketStatus } from "../../utils/constants";
import { OrderCard } from "../../components/order/order-card.js/order-card";
import { selectOrder } from "../../services/slices/selected-order";
import { connect, disconnect } from "../../services/actions/ws-profile";

export const OrdersHistory = () => {
    const dispatch = useAppDispatch();
    const { ingredients } = useAppSelector(store => store.ingredients);
    const { wsMessage, status } = useAppSelector(store => store.wsProfile);
    const { orders } = wsMessage || {};

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        dispatch(connect(`${BURGER_WSS}orders?token=${accessToken}`));

        /* return () => {
            if (status !== WebsocketStatus.OFFLINE) dispatch(disconnect());
        }; */
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={styles.main}>
            <div className={styles.menu}>
                <ProfileNavigation />
            </div>
            <div className={styles.orders + ' ml-15 pr-2'}>
                {
                    ingredients && orders?.map(nextOrder => (
                        <OrderCard
                            key={nextOrder._id}
                            data={nextOrder}
                            onClick={() => {
                                dispatch(selectOrder(nextOrder));
                            }} />
                    ))
                }
            </div>
        </div>
    );
};