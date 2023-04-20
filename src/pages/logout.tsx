import { useEffect } from 'react';
import { logout } from "../services/actions/user";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';

export const Logout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logout());
        navigate('/login');
        // eslint-disable-next-line
    }, []);

    return null;
};