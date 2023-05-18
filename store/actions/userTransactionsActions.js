import axios from 'axios';
import { UserTransactionsReducerActions } from '../reducers/userTransactionsReducer';

export const fetchUserTransactions = userId => {
  return async dispatch => {
    dispatch(userTransactionsLoading());
    const transactionsData = await getAccountTransactions(userId);
    dispatch(userTransactionsLoaded(transactionsData));
  };
};

export const userTransactionsLoaded = payload => {
  return {
    type: UserTransactionsReducerActions.UserTransactionsLoaded,
    payload: payload,
  };
};

export const userTransactionsLoading = () => {
  return {
    type: UserTransactionsReducerActions.UserTransactionsLoading,
  };
};

const getAccountTransactions = async userId => {
  let dateGroupedTransactions = [];
  let transactionsError = false;

  await axios
    .get(`/api/transactions`, { params: { userId, limit: 30 } })
    .then(response => {
      //Group all transactions by postDate
      dateGroupedTransactions = response.data.reduce((r, a) => {
        if (a.postDate) {
          r[a.postDate.slice(0, 10)] = r[a.postDate.slice(0, 10)] || [];
          r[a.postDate.slice(0, 10)].push(a);
          return r;
        }
      }, Object.create(null));

      dateGroupedTransactions = Object.entries(dateGroupedTransactions);
    })
    .catch(error => {
      console.warn(error);
      transactionsError = true;
    });

  return {
    dateGroupedTransactions,
    transactionsError,
    isCompleted: !transactionsError,
  };
};
