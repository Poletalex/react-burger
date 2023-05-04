import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../services/reducers";
import { socketMiddleware } from "../services/middleware/socket-middleware";
import {
    connect as FeedWsConnect,
    disconnect as FeedWsDisconnect,
    wsConnecting as FeedWsConnecting,
    wsOpen as FeedWsOpen,
    wsClose as FeedWsClose,
    wsMessage as FeedWsMessage,
    wsError as FeedWsError
} from "../services/actions/ws-feed";

const wsActions = {
    wsConnect: FeedWsConnect,
    wsDisconnect: FeedWsDisconnect,
    wsConnecting: FeedWsConnecting,
    onOpen: FeedWsOpen,
    onClose: FeedWsClose,
    onMessage: FeedWsMessage,
    onError: FeedWsError
}; 

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware(wsActions)),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;