import { createReducer } from "@reduxjs/toolkit";
import { WebsocketStatus } from "../../utils/constants";
import { TWsStore } from "../../utils/types";
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "../actions/ws-profile";

const initialState: TWsStore = {
    status: WebsocketStatus.OFFLINE,
    error: '',
    wsMessage: null
};

export const wsProfileReducer = createReducer(initialState, (builder) => {
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
            state.wsMessage = action.payload;
        })
        .addCase(wsError, (state, action) => {
            state.error = action.payload;
        })
});