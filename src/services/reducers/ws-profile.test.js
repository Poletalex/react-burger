import { WebsocketStatus } from "../../utils/constants";
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "../actions/ws-profile";
import { wsProfileReducer } from "./ws-profile";

describe('wsProfile reducer', () => {
    it('инициализация', () => {
        expect(wsProfileReducer(undefined, {})).toEqual({
            status: WebsocketStatus.OFFLINE,
            error: '',
            wsMessage: null
        });
    });

    it('wsConnecting', () => {
        expect(wsProfileReducer(undefined, {
            type: wsConnecting.type
        })).toEqual({
            status: WebsocketStatus.CONNECTING,
            error: '',
            wsMessage: null
        });
    });

    it('wsOpen', () => {
        expect(wsProfileReducer(undefined, {
            type: wsOpen.type
        })).toEqual({
            status: WebsocketStatus.ONLINE,
            error: '',
            wsMessage: null
        });
    });

    it('wsClose', () => {
        expect(wsProfileReducer(undefined, {
            type: wsClose.type
        })).toEqual({
            status: WebsocketStatus.OFFLINE,
            error: '',
            wsMessage: null
        });
    });

    it('wsMessage', () => {
        const payload = {
            success: true,
            orders: [],
            total: 10,
            totalToday: 1
        };
        expect(wsProfileReducer(undefined, {
            type: wsMessage.type,
            payload
        })).toEqual({
            status: WebsocketStatus.OFFLINE,
            error: '',
            wsMessage: payload
        });
    });

    it('wsError', () => {
        expect(wsProfileReducer(undefined, {
            type: wsError.type,
            payload: 'test error'
        })).toEqual({
            status: WebsocketStatus.OFFLINE,
            error: 'test error',
            wsMessage: null
        });
    });
});