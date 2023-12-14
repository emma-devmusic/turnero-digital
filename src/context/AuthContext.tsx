import { createContext, useReducer } from "react";
import { AuthContxtProps, AuthState, authReducer } from "./";
import { checkSessionStorage } from "../helpers/helpers";


export const authInitialState: AuthState = { isLogged: false }

export const AuthContext = createContext<AuthContxtProps> ( {} as AuthContxtProps );

//Componente Proveedor del estado
export const AuthProvider = ({children}: any) => {

    const [ authState, dispatch ] = useReducer(authReducer, authInitialState);
    const login = (user: AuthState) => {
        if(!checkSessionStorage().isLogged) {
            sessionStorage.setItem('user', JSON.stringify(user));
        }
        dispatch({ type: 'login', payload: user })
    }
    const logout = () => {
        dispatch({type: "logout", payload: authInitialState})
        sessionStorage.clear();
    }

    return (
        <AuthContext.Provider value={{
            authState,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}