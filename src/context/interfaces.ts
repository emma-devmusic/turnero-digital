import { Dispatch } from "react";
import { ShopAvailabilityAction } from ".";
import { newBooking, deleteBooking, updateBooking, selectBooking, unselectBooking } from './actions/bookingActions';
import { BookingAction } from "./reducers/bookingReducer";

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
    id?: string | number;
    allDay?: boolean | undefined;
    name?: string | undefined;
    title?: string; 
    start?: Date | string ;
    end?: Date | string ;
    resource?: any;
    service?: ShopServices;
    desc?: string;
    bgColor?: string;
    user?: { id: string | number , name: string };
    price?: number | string;
}

export interface ShopServices {
    id: string,
    name: string,
    duration: number,
    price: number | string
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

export interface AvailabilityState {
    selected: ShopAvailability | null,
    availabilities: ShopAvailability[]
}


export interface AvailabilityContextProps {
    availabilityState: AvailabilityState,
    readAvailability: ( availabilities: ShopAvailability[], dispatchReserv: Dispatch<ShopAvailabilityAction> ) => void;
    newAvailability: ( reserve: ShopAvailability, dispatchReserv: Dispatch<ShopAvailabilityAction> ) => void;
    updateAvailability: ( reserve: ShopAvailability, dispatchReserv: Dispatch<ShopAvailabilityAction> ) => void;
    selectReserve: ( reserve: ShopAvailability, dispatchReserv: Dispatch<ShopAvailabilityAction> ) => void;
    unselectReserve: ( dispatchReserv: Dispatch<ShopAvailabilityAction> ) => void;
    deleteReserve: ( id: string | number, dispatchReserv: Dispatch<ShopAvailabilityAction> ) => void;
    dispatch: Dispatch<ShopAvailabilityAction>
}   

export interface BookingState {
    booking: ShopAvailability[] | [],
    selected: ShopAvailability | null
}

type BookingActionDispatch = ( reserve: ShopAvailability, dispatchReserve: Dispatch<BookingAction> ) => void;

export interface BookingContextProps {
    bookingState: BookingState,
    newBooking: BookingActionDispatch,
    deleteBooking: BookingActionDispatch,
    updateBooking: BookingActionDispatch,
    selectBooking: BookingActionDispatch,
    unselectBooking: BookingActionDispatch,
    dispatchBooking: Dispatch<BookingAction>
}