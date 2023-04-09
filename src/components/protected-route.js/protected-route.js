import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from "react-router-dom";
import { checkUserAuth } from '../../services/action';
import PropTypes from 'prop-types';

export const ProtectedRouteElement = ({ withAuth = true, element }) => {
    const { user, isAuthChecked } = useSelector(store => store.user);
    const dispatch = useDispatch();
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
export const WithoutAuth = props => <ProtectedRouteElement withAuth={false} {...props} />

ProtectedRouteElement.propTypes = {
    withAuth: PropTypes.bool,
    element: PropTypes.element.isRequired
};