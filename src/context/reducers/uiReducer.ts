import { UiState } from ".."

export const uiInitialState:UiState = {
        isLoading: false,
        modal: { isOpen: false, for: ''}
}

type UiAction = {
    type: 'modal-open',
    payload: { isOpen: boolean, for: '' | 'from-resume' | 'from-calendar' }
} | {
    type: 'modal-close',
    payload: null | undefined
} | {
    type: 'is-loading',
    payload?: null | undefined
} | {
    type: 'isnt-loading',
    payload?: null | undefined
}

export const uiReducer = (state = uiInitialState, { type, payload }: UiAction) => {
    switch (type) {
        case 'modal-open': 
        return {
            ...state,
            modal: payload
        }

        case 'modal-close':
            return {
                ...state,
                modal: uiInitialState.modal
            }
        
        case 'is-loading':
            return {
                ...state,
                isLoading: true
            }
        
        case 'isnt-loading':
            return {
                ...state,
                isLoading: false
            }

    default:
        return state
    }
}
