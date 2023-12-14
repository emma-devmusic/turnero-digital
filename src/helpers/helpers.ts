import { AuthState, ShopState } from "../context"
import { uid } from 'uid';
type FormValues = {
    name: string,
    notes: string,
    start: Date,
    end: Date,
    title: string
}


export const checkSessionStorage = () : AuthState => {
    const user = JSON.parse(
        sessionStorage.getItem('user') || '{"isLogged": false}'
    )
    return user
}

export const tranformDateAviability = (shop: ShopState)  => {
    shop.availability.map( e => {
        e.start = new Date( e.start )
        e.end = new Date( e.end )
        return e
    })
    const availability = shop.availability
    shop.availability = []
    const shopFormated = { ...shop }
    return {
        shopFormated,
        availability
    }
}

export const formValuesFormated = ({ end, name, notes, start, title }:FormValues) => {
    return {
        id: uid(),
        end,
        notes,
        start,
        title,
        user: {
            id: 'No Registrado',
            name
        }
    }
}