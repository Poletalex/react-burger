import { WebsocketStatus } from "../../utils/constants";
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "../actions/ws-feed";
import { wsFeedReducer } from "./ws-feed";

describe('wsFeed reducer', () => {
    it('инициализация', () => {
        expect(wsFeedReducer(undefined, {})).toEqual({
            status: WebsocketStatus.OFFLINE,
            error: '',
            wsMessage: null
        });
    });

    it('wsConnecting', () => {
        expect(wsFeedReducer(undefined, {
            type: wsConnecting.type
        })).toEqual({
            status: WebsocketStatus.CONNECTING,
            error: '',
            wsMessage: null
        });
    });

    it('wsOpen', () => {
        expect(wsFeedReducer(undefined, {
            type: wsOpen.type
        })).toEqual({
            status: WebsocketStatus.ONLINE,
            error: '',
            wsMessage: null            
        });
    });

    it('wsClose', () => {
        expect(wsFeedReducer(undefined, {
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
        expect(wsFeedReducer(undefined, {
            type: wsMessage.type,
            payload
        })).toEqual({
            status: WebsocketStatus.OFFLINE,
            error: '',
            wsMessage: payload
        });
    });

    it('wsError', () => {
        expect(wsFeedReducer(undefined, {
            type: wsError.type,
            payload: 'test error'
        })).toEqual({
            status: WebsocketStatus.OFFLINE,
            error: 'test error',
            wsMessage: null
        });
    });
});