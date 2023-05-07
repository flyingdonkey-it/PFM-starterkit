import { useEffect, useMemo, useReducer, useRef } from 'react'

function withLogger(dispatch) {
	return function (action) {
		console.groupCollapsed('Action Type:', action.type, 'Change', action?.key, 'payload', action?.payload)
		return dispatch(action)
	}
}
const useReducerWithLogger = (...args) => {
	let prevState = useRef(args.initialState)
	const [state, dispatch] = useReducer(...args)

	const dispatchWithLogger = useMemo(() => {
		return withLogger(dispatch)
	}, [dispatch])

	useEffect(() => {
		if (state !== args.initialState) {
			console.log('Prev state: ', prevState.current)
			console.log('Next state: ', state)
			console.groupEnd()
		}
		prevState.current = state
	}, [state])

	return [state, dispatchWithLogger]
}

export default useReducerWithLogger
