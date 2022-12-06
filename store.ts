import { useLayoutEffect } from 'react';
import create from 'zustand';
import createContext from 'zustand/context';

import * as types from './types';

const actionTypes: Record<string, types.ActionType> = {
   
};

let store: any;

const initialState: types.State  = {
  
};

const context = createContext();
export const Provider: any = context.Provider;
export const useStore: any = context.useStore;

export const initializeStore = (preloadState = {}) => create<types.State>(set => ({
    ...initialState,
    ...preloadState,
    dispatch: (action: types.Action) => set(state => reducer(state, action))
}));

export const useCreateStore = (initialState: types.State) => {
    if (typeof window === 'undefined') {
        return () => initializeStore(initialState)
    }

    store = store ?? initializeStore(initialState);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLayoutEffect(() => {
        if (initialState && store) {
            store.setState({
                ...store.getState(),
                ...initialState
            });
        }
    }, [initialState]);

    return () => store;
};

const reducer = (state: types.State, action: types.Action): types.State => {
    switch (action.type) {

        default: {
            return state;
        }
    }
};