///Data
import React, { createContext, useContext } from 'react'
import useReducerWithLogger from './logger'
import axios from 'axios'



export const TransactionsDataContext = createContext()
export const useTransactionsDataContext = () => useContext(TransactionsDataContext)

///gerekli ilk stateler buraya yazılacak
let initialState = {
    transactionsAll:[],
    allTransactions:{
        dateGroupedTransactions:[]
    }
    // test için şimdilik burada kalsın
}

//reducer baglantısı
const reducer = (state, action) => {
	switch (action.type) {
        // Buraya bir sürü case ekleyebiliriz

        case 'TransactionsDataContext_FETCH_STATE':
			let allTransactions = action.payload
			return { ...state,  allTransactions }

		case 'TransactionsDataContext_UPDATE_STATE':
			let value = action.payload
			return { ...state, [action.key]: { ...state[action.key], ...value } }
		default:
			console.error(`${action.type} ->Action Not Found`)
			return state
	}
}

///Contex Provider
const TransactionsDataContextProvider = (props) => {
	initialState = { ...initialState, ...props.initialState }
	const [state, dispatch] = useReducerWithLogger(reducer, initialState)
    const userId = sessionStorage.getItem('userId')

	const updateState = (key, value) => {
		dispatch({
			type: 'TransactionsDataContext_UPDATE_STATE',
			payload: value,
			key: key,
		})
	}
    const getAllTransactions = async (key, value) =>{

  let dateGroupedTransactions = [];
  let transactionsError = false;
        // burada datayı çağırdık 
        const allTransactions = []
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
        dispatch({
            type:'TransactionsDataContext_FETCH_STATE',
            payload: {
                dateGroupedTransactions,
                transactionsError,
                isCompleted: !transactionsError,
              }

        })
    }

	return (
		<TransactionsDataContext.Provider
			value={{
				updateState,
				state,
                getAllTransactions
			}}
			displayName="TransactionsDataContext">
			{props.children}
		</TransactionsDataContext.Provider>
	)
}

export default TransactionsDataContextProvider
