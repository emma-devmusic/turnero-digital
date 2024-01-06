import { shopInitialState, ShopState } from '..';

type ShopAction = { type: 'select' | 'unselect' , payload: ShopState | null}


export const shopReducer = (state: ShopState, action: ShopAction ) => {
    
    switch (action.type) {
        case 'select':
            return {
                ...state,
                ...action.payload,
                selected: true,
            }
    
        case 'unselect':
            return {
                ...state,
                ...shopInitialState,
                selected: false
            }
        
        default:
            return state;
    }
}

