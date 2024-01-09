import { createContext, useReducer } from 'react';
import {  AvailabilityState, ShopContextProps, ShopState, availabilityReducer, readAvailability, shopReducer } from "./";
import { tranformDateAviability } from '../helpers';
import { AvailabilityProvider } from './AvailabilityContext';
import { addHours } from 'date-fns';

export const shopInitialState: ShopState = {
    selected: false,
    bookingPerHour: 1,
    id: '',
    name: '',
    availability: [],
    services: [{id: '', name: '', duration: 2, price: 0}]
}

export const initialAvailabilityState: AvailabilityState = {
    selected: null,
    availabilities: [
        {
            id: '',
            title: 'Reserva Ejemplo',
            start: new Date(),
            end: addHours( new Date(), 2),
            service: {
                id: '',
                name: '',
                duration: 1,
                price: 0
            },
            user: {
                id: 'No Registrado',
                name: 'Usuario'
            }
        }
    ]
} 

export const ShopContext = createContext<ShopContextProps> ({} as ShopContextProps);

export const ShopProvider = ({children}: any) => {

    const [shopState, dispatchShop] = useReducer(shopReducer, shopInitialState);
    const [ availabilityState, dispatch ] = useReducer( availabilityReducer, initialAvailabilityState )


    //click al Negocio y carga las reservas que ya tiene el negocio en el context de la app
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
