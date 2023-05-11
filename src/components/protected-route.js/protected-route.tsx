import React, { FC, ReactElement } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from '../../store/hooks';
import { Loader } from './loader/loader';

type TProtected = {
    withAuth?: boolean;
    element: ReactElement;
};

export const ProtectedRouteElement: FC<TProtected> = ({ withAuth = true, element }) => {
    const { user, isAuthChecked } = useAppSelector(store => store.user);
    const location = useLocation();

    if (!isAuthChecked) {
        return <Loader />;
    }

    if (withAuth && !user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    if (!withAuth && user) {
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from} />;
    }

    return element;
};

export const WithAuth = ProtectedRouteElement;
export const WithoutAuth = (props: any) => <ProtectedRouteElement withAuth={false} {...props} />