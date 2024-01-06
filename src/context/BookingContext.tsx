import { createContext, useReducer } from 'react';
import { BookingContextProps, BookingState } from "./";
import { bookingReducer } from './reducers/bookingReducer';
import { newBooking, deleteBooking, updateBooking, selectBooking, unselectBooking } from './actions/bookingActions';


export const BookingContext = createContext( {} as BookingContextProps );


const bookingInitialState: BookingState = {
    booking: [],
    selected: null
}

export const BookingProvider = ({children}: any) => {

    const [bookingState, dispatch] = useReducer(bookingReducer, bookingInitialState)
    

    return (
        <BookingContext.Provider value={{
            bookingState,
            newBooking,
            deleteBooking,
            updateBooking,
            selectBooking,
            unselectBooking,
            dispatchBooking: dispatch,
        }}>
            {children}
        </BookingContext.Provider>
    )
}
