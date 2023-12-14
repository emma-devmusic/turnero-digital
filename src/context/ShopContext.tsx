import { createContext, useReducer } from 'react';
import {  ShopAvailability, ShopContextProps, ShopState, availabilityReducer, readAvailability, shopReducer } from "./";
import { tranformDateAviability } from '../helpers';
import { AvailabilityProvider } from './AvailabilityContext';
import { addHours } from 'date-fns';

export const shopInitialState: ShopState = {
    selected: false,
    id: '',
    name: '',
    availability: [],
    services: [{id: '', name: ''}]
}

export const initialAvailabilityState: ShopAvailability[] = [
    {
        id: '',
        title: 'Reserva Ejemplo',
        start: new Date(),
        end: addHours( new Date(), 2),
        user: {
            id: 'No Registrado',
            name: 'Usuario'
        }
    }
]

export const ShopContext = createContext<ShopContextProps> ({} as ShopContextProps);

export const ShopProvider = ({children}: any) => {

    const [shopState, dispatchShop] = useReducer(shopReducer, shopInitialState);
    const [ availabilityState, dispatch ] = useReducer( availabilityReducer, initialAvailabilityState )

    const clickShop = ( shop: ShopState, select: 'select' | 'unselect') => {
        shop.selected = true
        const { shopFormated , availability } = tranformDateAviability(shop)
        readAvailability( availability, dispatch )
        dispatchShop({
            type: select,
            payload: shopFormated
        })
    }

    return (
        <ShopContext.Provider value={{
            shopState,
            clickShop,
        }}>
            <AvailabilityProvider availabilityState={availabilityState} dispatch={dispatch} >
                {children}
            </AvailabilityProvider>
        </ShopContext.Provider>
    )
}
