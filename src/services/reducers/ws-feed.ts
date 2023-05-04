import { createReducer } from "@reduxjs/toolkit";
import { WebsocketStatus } from "../../utils/constants";
import { TOrder } from "../../utils/types";
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "../actions/ws-feed";

export type TWsStore = {
    status: WebsocketStatus,
    error: string | null,
    orders: Array<TOrder>
}

const initialState: TWsStore = {
    status: WebsocketStatus.OFFLINE,
    error: '',
    orders: []
};

export const feedReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(wsConnecting, (state) => {
            state.status = WebsocketStatus.CONNECTING;
        })
        .addCase(wsOpen, (state) => {
            state.status = WebsocketStatus.ONLINE;
            state.error = '';
        })
        .addCase(wsClose, (state) => {
            state.status = WebsocketStatus.OFFLINE;
        })
        .addCase(wsMessage, (state, action) => {
            state.orders = action.payload;
        })
        .addCase(wsError, (state, action) => {
            state.error = action.payload;
        })
});