import { combineReducers } from 'redux';
import { constructorReducer } from './burger-constructor';
import { forgotPasswordReducer } from './forgot-password';
import { ingredientsReducer } from './ingredients';
import { modalReducer } from './modal';
import { resetPasswordReducer } from './reset-password';
import { userReducer } from '../slices/user';
import { wsFeedReducer } from './ws-feed';
import { selectedOrderReducer } from '../slices/selected-order';
import { wsProfileReducer } from './ws-profile';
import { orderReducer } from '../slices/order';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    order: orderReducer,
    modal: modalReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    user: userReducer,
    wsFeed: wsFeedReducer,
    wsProfile: wsProfileReducer,
    selectedOrder: selectedOrderReducer,
});