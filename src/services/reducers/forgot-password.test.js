import { forgotPasswordReducer } from "./forgot-password";
import {
    FORGOT_PASSWORD_CLOSE,
    FORGOT_PASSWORD_FAILED,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS
} from "../actions/forgot-password";

describe('forgot password reducer', () => { 
    it('инициализация', () => { 
        expect(forgotPasswordReducer(undefined, {})).toEqual({
            request: false,
            success: false,
            failed: false
        });
    });

    it('выполнение запроса', () => { 
        expect(forgotPasswordReducer(undefined, {
            type: FORGOT_PASSWORD_REQUEST
        })).toEqual({
            request: true,
            success: false,
            failed: false,
        });
    });

    it('запрос выполнен успешно', () => {
        expect(forgotPasswordReducer(undefined, {
            type: FORGOT_PASSWORD_SUCCESS
        })).toEqual({
            failed: false,
            request: false,
            success: true
        });
    });

    it('запрос не выполнен', () => {
        expect(forgotPasswordReducer(undefined, {
            type: FORGOT_PASSWORD_FAILED
        })).toEqual({
            success: false,
            failed: true,
            request: false
        });
    });

    it('выход со страницы', () => {
        expect(forgotPasswordReducer(undefined, {
            type: FORGOT_PASSWORD_CLOSE
        })).toEqual({
            success: false,
            failed: false,
            request: false
        });
    });

    
});