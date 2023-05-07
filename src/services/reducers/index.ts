import { combineReducers } from 'redux';
import { constructorReducer } from './burger-constructor';
import { forgotPasswordReducer } from './forgot-password';
import { ingredientsReducer } from './ingredients';
import { modalReducer } from './modal';
import { orderReducer } from './order';
import { resetPasswordReducer } from './reset-password';
import { userReducer } from '../slices/user';
import { websocketReducer } from './websocket';
import { selectedOrderReducer } from '../slices/selected-order';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    order: orderReducer,
    modal: modalReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    user: userReducer,
    websocket: websocketReducer,
    selectedOrder: selectedOrderReducer,
});