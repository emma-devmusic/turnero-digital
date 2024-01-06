import { Dispatch } from "react"
import { ShopAvailability, ShopAvailabilityAction, idReserve } from ".."
import { BookingAction } from "../reducers/bookingReducer"
// import { putOnLocalStorage } from "../../helpers"

export const readBooking = (booking: ShopAvailability[], dispatchReserve: Dispatch<BookingAction>) => {
    booking.forEach( b => {
        dispatchReserve({
            type: 'readBooking',
            payload: b
        })
    })
}

export const newBooking = (reserve: ShopAvailability, dispatchBooking: Dispatch<BookingAction>) => {
    dispatchBooking({
        type: 'newBooking',
        payload: reserve
    })
    // putOnLocalStorage(reserve)
}

export const updateBooking = (reserve: ShopAvailability, dispatchBooking: Dispatch<BookingAction>) => {
    dispatchBooking({
        type: 'updateBooking',
        payload: reserve
    })
}

export const deleteBooking = ( reserve: ShopAvailability, dispatchBooking: Dispatch<BookingAction> ) => {
    dispatchBooking({
        type: 'deleteBooking',
        payload: reserve
    })
}

export const selectBooking = ( reserve: ShopAvailability, dispatchBooking: Dispatch<BookingAction> ) => {
    dispatchBooking({
        type: 'selectBooking',
        payload: reserve
    })
}

export const unselectBooking = ( reserve: ShopAvailability, dispatchBooking: Dispatch<BookingAction>) => {
    dispatchBooking({
        type: 'unselectBooking',
        payload: reserve
    })
}