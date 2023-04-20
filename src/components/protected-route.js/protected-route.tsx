import React, { FC, ReactElement, useEffect } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { checkUserAuth } from '../../services/actions/user';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

type TProtected = {
    withAuth?: boolean;
    element: ReactElement;
};

export const ProtectedRouteElement: FC<TProtected> = ({ withAuth = true, element }) => {
    const { user, isAuthChecked } = useAppSelector(store => store.user);
    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(checkUserAuth());
        // eslint-disable-next-line
    }, []);

    if (!isAuthChecked) {
        return null;
    }

    if (withAuth && !user) { 
        return <Navigate to="/login" state={{ from: location }} />;
    }

    if (!withAuth && user) {
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from}/>;
    }

    return element;
}; 

export const WithAuth = ProtectedRouteElement;
export const WithoutAuth = (props: any) => <ProtectedRouteElement withAuth={false} {...props} />