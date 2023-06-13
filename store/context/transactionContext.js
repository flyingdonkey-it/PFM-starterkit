///Data
import React, { createContext, useContext } from 'react';
import useReducerWithLogger from './logger';
import axios from 'axios';
import useSessionStorage from '../hooks/useSessionStorage';

export const TransactionsDataContext = createContext();
export const useTransactionsDataContext = () => useContext(TransactionsDataContext);

let initialState = {
  allTransactions: {
    dateGroupedTransactions: [],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'TransactionsDataContext_FETCH_STATE':
      let allTransactions = action.payload;
      return {
        ...state,
        dateGroupedTransactions: allTransactions.dateGroupedTransactions,
        transactionsError: allTransactions.transactionsError,
        isCompleted: allTransactions.isCompleted,
      };

    case 'TransactionsDataContext_UPDATE_STATE':
      let value = action.payload;
      return { ...state, [action.key]: { ...state[action.key], ...value } };
    default:
      console.error(`${action.type} ->Action Not Found`);
      return state;
  }
};

const TransactionsDataContextProvider = props => {
  initialState = { ...initialState, ...props.initialState };
  const [state, dispatch] = useReducerWithLogger(reducer, initialState);
   const s_storage = useSessionStorage();
  const userId = s_storage.getItem('userId');
  

  const updateState = (key, value) => {
    dispatch({
      type: 'TransactionsDataContext_UPDATE_STATE',
      payload: value,
      key: key,
    });
  };
  const getAllTransactions = async () => {
    let dateGroupedTransactions = [];
    let transactionsError = false;
    await axios
      .get(`/api/transactions`, { params: { userId, limit: 30 } })
      .then(function (response) {
        dateGroupedTransactions = response.data.reduce(function (r, a) {
          if (a.postDate) {
            r[a.postDate.slice(0, 10)] = r[a.postDate.slice(0, 10)] || [];
            r[a.postDate.slice(0, 10)].push(a);
            return r;
          }
        }, Object.create(null));

        dateGroupedTransactions = Object.entries(dateGroupedTransactions);
      })
      .catch(function (error) {
        transactionsError = true;
      });
    dispatch({
      type: 'TransactionsDataContext_FETCH_STATE',
      payload: {
        dateGroupedTransactions,
        transactionsError,
        isCompleted: !transactionsError,
      },
    });
  };

  return (
    <TransactionsDataContext.Provider
      value={{
        updateState,
        state,
        getAllTransactions,
      }}
      displayName="TransactionsDataContext"
    >
      {props.children}
    </TransactionsDataContext.Provider>
  );
};

export default TransactionsDataContextProvider;
