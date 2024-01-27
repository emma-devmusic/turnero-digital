import { AuthBooking } from "../context"

type DataLoginForm = {
    email: string,
    password: string
}

type UserDB = {
    id: string,
    email: string,
    name: string,
    password: string,
    phone?: number,
    photo?: string,
    bookings?: AuthBooking[]
}


export const getUserDB = async (dataLoginForm: DataLoginForm) => {
    const resp = await fetch('../../data.json');
    const { usuarios } = await resp.json();
    let userLogin: UserDB = {
        id: '',
        email: '',
        name: '',
        password: '',
    };
    let flag = false;
    usuarios.forEach( (userDB: UserDB) => {
        if( userDB.email === dataLoginForm.email && userDB.password === dataLoginForm.password){
            flag = true;
            userLogin = userDB;
        }
    });
    return { flag, userLogin }
}


