import { combineReducers } from 'redux';
import { constructorReducer } from './burger-constructor';
import { forgotPasswordReducer } from './forgot-password';
import { ingredientsReducer } from './ingredients';
import { modalReducer } from './modal';
import { orderReducer } from './order';
import { registerReducer } from './register';
import { resetPasswordReducer } from './reset-password';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    order: orderReducer,
    modal: modalReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    register: registerReducer
});