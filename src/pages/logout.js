import { useEffect } from 'react';
import { logout } from "../services/actions/user";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logout());
        navigate('/login');
        // eslint-disable-next-line
    }, []);

    return null;
};