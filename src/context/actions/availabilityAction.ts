import { Dispatch } from "react"
import { ShopAvailability, ShopAvailabilityAction, idReserve } from ".."

export const readAvailability = (availibilities: ShopAvailability[], dispatchReserve: Dispatch<ShopAvailabilityAction>) => {
    dispatchReserve({
        type: 'readReserve',
        payload: availibilities
    })
}

export const newAvailability = (reserve: ShopAvailability, dispatchReserve: Dispatch<ShopAvailabilityAction>) => {
    dispatchReserve({
        type: 'newReserve',
        payload: reserve
    })
}

export const updateAvailability = (reserve: ShopAvailability, dispatchReserve: Dispatch<ShopAvailabilityAction>) => {
    dispatchReserve({
        type: 'updateReserve',
        payload: reserve
    })
}

export const deleteReserve = ( id: idReserve, dispatchReserve: Dispatch<ShopAvailabilityAction> ) => {
    dispatchReserve({
        type: 'deleteReserve',
        payload: id
    })
}

export const selectReserve = ( reserve: ShopAvailability, dispatchReserve: Dispatch<ShopAvailabilityAction> ) => {
    dispatchReserve({
        type: 'selectReserve',
        payload: reserve
    })
}

export const unselectReserve = ( dispatchReserve: Dispatch<ShopAvailabilityAction> ) => {
    dispatchReserve({
        type: 'unselectReserve',
        payload: null
    })
}