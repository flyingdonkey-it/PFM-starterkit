import { combineReducers } from "@reduxjs/toolkit";
import userTransactionsReducer from "./userTransactionsReducer";

const rootReducer = combineReducers( {
    userTransactions: userTransactionsReducer
});

export default rootReducer;