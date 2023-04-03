import { useEffect } from 'react';
import { logout } from "../services/action";
import { useDispatch } from 'react-redux';

export const Logout = () => {
    const dispatch = useDispatch();

    useEffect(() => { 
        dispatch(logout());
        // eslint-disable-next-line
    }, [])

    return null;
};