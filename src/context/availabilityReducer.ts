import { ShopAvailability, idReserve } from ".";

export type ShopAvailabilityAction = { 
    type: 'newReserve' | 'deleteReserve' | 'updateReserve' | 'readReserve', 
    payload: ShopAvailability | ShopAvailability[] | idReserve 
}


export const availabilityReducer: any = ( state: ShopAvailability[], action: ShopAvailabilityAction ) => {
    switch (action.type) {
        case 'readReserve':
            return action.payload;
        case 'updateReserve':
            return [
                ...state,
                action.payload
            ]
        default:
            return state
    }
}
