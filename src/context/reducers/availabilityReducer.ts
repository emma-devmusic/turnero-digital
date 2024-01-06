import { AvailabilityState, ShopAvailability, idReserve } from "../";

export type ShopAvailabilityAction = { 
    type: 'newReserve' | 'deleteReserve' | 'updateReserve' | 'readReserve' | 'selectReserve' | 'unselectReserve', 
    payload: ShopAvailability | ShopAvailability[] | idReserve | null
}


export const availabilityReducer = ( state: AvailabilityState, action: any ) => {
    switch (action.type) {
        case 'readReserve':
            return {
                selected: null,
                availabilities: action.payload
            }
        case 'newReserve':
            return {
                ...state,
                availabilities: [
                    ...state.availabilities,
                    action.payload
                ]
            }
        case 'selectReserve':
            return {
                ...state,
                selected: action.payload
            }
        case 'unselectReserve':
            return {
                ...state,
                selected: null
            }
        case 'updateReserve':
            return {
                ...state,
                availabilities: state.availabilities.map( 
                    reserve => (reserve.id === action.payload.id) ? action.payload : reserve
                )
            }
        case 'deleteReserve':
            return {
                ...state,
                availabilities: state.availabilities.filter(
                    reserve => reserve.id !== action.payload
                )
            }
        default:
            return state
    }
}
