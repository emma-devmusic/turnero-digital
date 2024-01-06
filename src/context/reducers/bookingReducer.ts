import { BookingState, ShopAvailability, idReserve } from "../";

export type BookingAction = { 
    type: 'newBooking' | 'deleteBooking' | 'updateBooking' | 'readBooking' | 'selectBooking' | 'unselectBooking', 
    payload: ShopAvailability 
}


export const bookingReducer = ( state: BookingState, action: BookingAction ) => {
    switch (action.type) {
        case 'readBooking':
            return {
                selected: null,
                booking: [...state.booking, action.payload]
            }
        case 'newBooking':
            return {
                ...state,
                booking: [
                    ...state.booking,
                    action.payload
                ]
            }
        case 'selectBooking':
            return {
                ...state,
                selected: action.payload
            }
        case 'unselectBooking':
            return {
                ...state,
                selected: null
            }
        case 'updateBooking':
            return {
                ...state,
                booking: state.booking.map( 
                    booking => (booking.id === action.payload?.id) ? action.payload : booking
                )
            }
        case 'deleteBooking':
            return {
                ...state,
                booking: state.booking.filter(
                    booking => booking.id !== action.payload?.id
                )
            }
        default:
            return state
    }
}
