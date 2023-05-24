import { WebsocketStatus } from "../../utils/constants";
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "../actions/ws-feed";
import { wsFeedReducer } from "./ws-feed";
import { initialState } from "./ws-feed";

describe('wsFeed reducer', () => {
    it('инициализация', () => {
        expect(wsFeedReducer(undefined, {})).toEqual(initialState);
    });

    it('wsConnecting', () => {
        expect(wsFeedReducer(undefined, {
            type: wsConnecting.type
        })).toEqual({
            ...initialState,
            status: WebsocketStatus.CONNECTING
        });
    });

    it('wsOpen', () => {
        expect(wsFeedReducer(undefined, {
            type: wsOpen.type
        })).toEqual({
            ...initialState,
            status: WebsocketStatus.ONLINE,
            error: ''           
        });
    });

    it('wsClose', () => {
        expect(wsFeedReducer(undefined, {
            type: wsClose.type
        })).toEqual({
            ...initialState,
            status: WebsocketStatus.OFFLINE
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
            ...initialState,
            wsMessage: payload
        });
    });

    it('wsError', () => {
        expect(wsFeedReducer(undefined, {
            type: wsError.type,
            payload: 'test error'
        })).toEqual({
            ...initialState,
            error: 'test error'
        });
    });
});