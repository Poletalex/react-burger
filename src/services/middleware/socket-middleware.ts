import { ActionCreatorWithPayload, ActionCreatorWithoutPayload, Middleware } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export type TWsActions = {
    wsConnect: ActionCreatorWithPayload<string>,
    wsDisconnect: ActionCreatorWithoutPayload,
    wsSendMessage?: ActionCreatorWithPayload<any>,
    wsConnecting: ActionCreatorWithoutPayload,
    onOpen: ActionCreatorWithoutPayload,
    onClose: ActionCreatorWithoutPayload,
    onError: ActionCreatorWithPayload<string>,
    onMessage: ActionCreatorWithPayload<any>,
};

export const socketMiddleware = (wsActions: TWsActions): Middleware<{}, RootState> => {
    return store => {
        let socket: WebSocket | null = null;
        let isConnected = false;
        let reconnectTimer = 0;
        let url = '';

        return next => action => {
            const { dispatch } = store;
            const {
                wsConnect,
                wsDisconnect,
                wsSendMessage,
                onOpen,
                onClose,
                onError,
                onMessage,
                wsConnecting } = wsActions;
            
            // соединение с сокетом
            if (wsConnect.match(action)) {
                url = action.payload;
                socket = new WebSocket(url);
                isConnected = true;
                dispatch(wsConnecting());
            }

            // если соединение уже есть
            if (socket) {
                socket.onopen = () => {
                    dispatch(onOpen());
                };

                socket.onerror = (event) => {
                    console.log(event);
                    dispatch(onError('error'));
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch(onMessage(parsedData));
                };

                socket.onclose = event => {
                    if (event.code !== 1000) {
                        dispatch(onError(event.code.toString()));
                    } 
                    dispatch(onClose());

                    /* if (isConnected) {
                        dispatch(wsConnecting());
                        reconnectTimer = window.setTimeout(() => {
                            dispatch(wsConnect(url));
                        }, 3000)
                    } */
                };

                if (wsSendMessage?.match(action)) {
                    socket.send(JSON.stringify(action.payload));
                }

                if (wsDisconnect.match(action)) {
                    clearTimeout(reconnectTimer)
                    isConnected = false;
                    reconnectTimer = 0;
                    socket.close();
                    socket = null;
                    dispatch(onClose());
                }
            }

            next(action);
        };
    };
};