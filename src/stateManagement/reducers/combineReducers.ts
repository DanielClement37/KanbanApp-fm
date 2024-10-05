import {Action} from "../actions/actiontypes.ts";

export function combineReducers<S>(reducers: {
    [K in keyof S]: (state: S[K], action: Action) => S[K];
}): (state: S, action: Action) => S {
    return (state: S, action: Action): S => {
        const newState = {} as S;
        let hasChanged = false;
        for (const key in reducers) {
            const reducer = reducers[key];
            const previousStateForKey = state[key];
            const nextStateForKey = reducer(previousStateForKey, action);
            newState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        }
        return hasChanged ? newState : state;
    };
}