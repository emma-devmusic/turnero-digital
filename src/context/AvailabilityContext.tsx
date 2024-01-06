import { createContext } from 'react';
import { AvailabilityContextProps } from "./";
import { newAvailability, readAvailability, updateAvailability, deleteReserve, selectReserve, unselectReserve } from './actions/availabilityAction';


export const AvailabilityContext = createContext<AvailabilityContextProps> ({} as AvailabilityContextProps);


export const AvailabilityProvider = ({children, availabilityState, dispatch}: any) => {

    return (
        <AvailabilityContext.Provider value={{
            availabilityState,
            readAvailability, 
            newAvailability, 
            updateAvailability, 
            deleteReserve,
            selectReserve,
            unselectReserve,
            dispatch
        }}>
            {children}
        </AvailabilityContext.Provider>
    )
}
