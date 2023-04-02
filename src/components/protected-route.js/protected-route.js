import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import { checkUserAuth } from '../../services/action';

export const ProtectedRouteElement = ({ withAuth = true, element }) => {
    const { user, isAuthChecked } = useSelector(store => store.user);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserAuth());
        // eslint-disable-next-line
    }, []);

    if (!isAuthChecked) {
        return null;
    }

    if (withAuth && !user) { 
        return <Navigate to="/login" replace />;
    }

    if (!withAuth && user) {
        return <Navigate to="/" replace />;
    }

    return element;
}; 

export const WithAuth = ProtectedRouteElement;
export const WithoutAuth = props => <ProtectedRouteElement withAuth={false} {...props} />