import { Dispatch } from "react";
import { ShopAvailabilityAction } from ".";

export type idReserve = string | number;


// AuthContext
export interface AuthState {
    uid?: string,
    userName?: string,
    userEmail?: string,
    userPhone?: number,
    isLogged: boolean
}

export interface AuthContxtProps {
    authState: AuthState;
    login: (user: AuthState) => void;
    logout: () => void;
}

export interface ShopAvailability {
    id: string | number,
    title: string,
    start: Date,
    end: Date,
    user: {
        id: string,
        name: string
    }
}

export interface ShopServices {
    id: string,
    name: string
}

export interface ShopState {
    selected?: boolean,
    id: string,
    name: string,
    availability: ShopAvailability[] | [],
    services: ShopServices[]
}

export interface ShopContextProps {
    shopState: ShopState;
    clickShop: (shop: ShopState , select: 'select' | 'unselect') => void;
}



export interface AvailabilityContextProps {
    availabilityState: ShopAvailability[],
    readAvailability: ( availabilities: ShopAvailability[], dispatchReserv: Dispatch<ShopAvailabilityAction> ) => void;
    newAvailability: ( reserve: ShopAvailability, dispatchReserv: Dispatch<ShopAvailabilityAction> ) => void;
    updateAvailability: ( reserve: ShopAvailability, dispatchReserv: Dispatch<ShopAvailabilityAction> ) => void;
    deleteReserve: ( id: string | number, dispatchReserv: Dispatch<ShopAvailabilityAction> ) => void;
    dispatch: Dispatch<ShopAvailabilityAction>
}   