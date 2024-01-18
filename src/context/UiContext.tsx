import { FC, createContext, useReducer } from "react";
import { ModalTypes, UiContextProps } from ".";
import { uiInitialState, uiReducer } from "./reducers/uiReducer";


export const UiContext = createContext<UiContextProps>({} as UiContextProps)

export const UiProvider = ({children}:any) => {

    const [uiState, dispatch] = useReducer(uiReducer, uiInitialState)

    const setLoading = (isLoading: 'is-loading' | 'isnt-loading') => {
        dispatch({
            type: isLoading
        })
    }

    const setModalOpen = (modalTypes: ModalTypes) => {
        dispatch({
            type: 'modal-open',
            payload: modalTypes
        })
    }

    return (
        <UiContext.Provider value={{
            uiState,
            setLoading,
            setModalOpen
        }}>
            {children}
        </UiContext.Provider>
    )
}