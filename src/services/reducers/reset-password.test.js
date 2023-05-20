import { resetPasswordReducer } from "./reset-password";
import {
    RESET_PASSWORD_CLOSE,
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS
} from "../actions/reset-password";

describe('reset password reducer', () => {
    it('инициализация', () => {
        expect(resetPasswordReducer(undefined, {})).toEqual({
            request: false,
            success: false,
            failed: false
        });
    });

    it('выполнение запроса', () => {
        expect(resetPasswordReducer(undefined, {
            type: RESET_PASSWORD_REQUEST
        })).toEqual({
            request: true,
            success: false,
            failed: false,
        });
    });

    it('запрос выполнен успешно', () => {
        expect(resetPasswordReducer(undefined, {
            type: RESET_PASSWORD_SUCCESS
        })).toEqual({
            failed: false,
            request: false,
            success: true
        });
    });

    it('запрос не выполнен', () => {
        expect(resetPasswordReducer(undefined, {
            type: RESET_PASSWORD_FAILED
        })).toEqual({
            success: false,
            failed: true,
            request: false
        });
    });

    it('выход со страницы', () => {
        expect(resetPasswordReducer(undefined, {
            type: RESET_PASSWORD_CLOSE
        })).toEqual({
            success: false,
            failed: false,
            request: false
        });
    });


});