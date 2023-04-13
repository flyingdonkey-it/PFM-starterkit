import axios from 'axios';
import { UserTransactionsReducerActions } from '../reducers/userTransactionsReducer';

export function fetchUserTransactions(userId) {
  return async function (dispatch) {
    dispatch(userTransactionsLoading());
    const transactionsData = await getAccountTransactions(userId);
    dispatch(userTransactionsLoaded(transactionsData));
  };
}

export function userTransactionsLoaded(payload) {
  return {
    type: UserTransactionsReducerActions.UserTransactionsLoaded,
    payload: payload,
  };
}

export function userTransactionsLoading() {
  return {
    type: UserTransactionsReducerActions.UserTransactionsLoading,
  };
}

async function getAccountTransactions(userId) {
  let dateGroupedTransactions = [];
  let transactionsError = false;

  await axios
    .get(`/api/transactions`, { params: { userId, limit: 30 } })
    .then(function (response) {
      //Group all transactions by postDate
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
      console.warn(error);
      transactionsError = true;
    });

  return {
    dateGroupedTransactions,
    transactionsError,
    isCompleted: !transactionsError,
  };
}
