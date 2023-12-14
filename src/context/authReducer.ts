import { AuthState } from "./interfaces";
import { authInitialState } from './AuthContext';

type AuthAction = { type: 'login' | 'logout', payload: AuthState }

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    
    switch ( action.type ) {
        case 'login':
            return {
                ...state,
                isLogged: true,
                userName: action.payload.userName,
                userEmail: action.payload.userEmail,
                userPhone: action.payload.userPhone
            }
        case 'logout':
            return {
                ...authInitialState
            }
        default:
            return state;
    }
}