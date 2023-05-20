import { useEffect, useMemo, useReducer, useRef } from 'react';

function withLogger(dispatch) {
  return function (action) {
    console.groupCollapsed('Action Type:', action.type, 'Change', action?.key, 'payload', action?.payload);
    return dispatch(action);
  };
}

const useReducerWithLogger = (reducer, initialState, initializer) => {
  const prevState = useRef(initialState);
  const [state, dispatch] = useReducer(reducer, initialState, initializer);

  const dispatchWithLogger = useMemo(() => {
    return withLogger(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (state !== initialState) {
      console.log('Prev state: ', prevState.current);
      console.log('Next state: ', state);
      console.groupEnd();
    }
    prevState.current = state;
  }, [state, initialState]);

  return [state, dispatchWithLogger];
};

export default useReducerWithLogger;
