import { Event } from "react-big-calendar";
import { AuthState, ShopServices, ShopState } from "../context"
import { uid } from 'uid';
import { ShopAvailability } from '../context/';
import { format, getDate, getDay, getMonth, hoursToMinutes, minutesToHours, setHours, setMinutes } from "date-fns";

type FormValues = {
    assist?: boolean,
    done?: boolean,
    id?: 'string' | number,
    service?: ShopServices,
    bgColor?: string,
    name: string,
    desc?: string,
    start: Date,
    end: Date,
    title: string,
    price: number | string
}
type TimeObjToExclude = { arrayNumber: number[], date: Date, duration: number }


export const getContactDataFromLocalStorage = () => 
    JSON.parse(
        localStorage.getItem('contactInfo') || ''
    );


export const checkSessionStorage = () : AuthState => {
    const user = JSON.parse(
        sessionStorage.getItem('user') || '{"isLogged": false}'
    )
    return user
}

export const tranformDateAviability = (shop: ShopState)  => {
    shop.availability.map( (e:any) => {
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


//devuelve la reserva formateada para ser guardada en la base de datos
export const formValuesFormated = ({ id, end, name, start, title, service, price, assist, done, desc, bgColor }:FormValues, type: 'new' | 'update') => {
    return {
        assist: false,
        done: false,
        id: (type ==='new') ? uid() : id,
        bgColor: (type==='new') ? 'darkgreen' : bgColor,
        price,
        desc,
        end,
        service,
        start,
        title,
        user: {
            id: 'No Registrado',
            name
        }
    }
}


//selecciona un servicio del arreglo de servicios segun un id
export const getServiceSelected = 
( services:ShopServices[], id: string) => services.find(e=> e.id === id);



export const putOnLocalStorage = (event: Event) => {
    if(localStorage.getItem('booking')){
        const newEventsString = localStorage.getItem('booking') || '';
        const newEventsObj = JSON.parse(newEventsString);
        const newArrayEvents = [...newEventsObj, event]
        localStorage.setItem('booking',
            JSON.stringify(newArrayEvents)
        )
        return
    }
    localStorage.setItem('booking', 
        JSON.stringify([event])
    )
}

export const firstUppercase = (str: string) => {
    const firstLetter = str.charAt(0).toUpperCase();
    const restLetters = str.slice(1)
    return firstLetter + restLetters
}


//filtra los domingos de semana para la selección de fechas
export const isWeekday = (date: Date) => {
    const day = getDay(date);
    return day !== 0 
};


export const getNumbersOfTime:any = (time: any[]) => {
    let arrayTime: any[] = []
    time.forEach( e => {
        let arrayNumber = [];
        let stringTime: string = e.time;
        arrayNumber = stringTime.split(':').map(e => parseInt(e))
        arrayTime.push( { arrayNumber, date: e.date, duration: e.duration } )
    });
    return arrayTime
}


export const datesToExcludes = (arrayObj:TimeObjToExclude[], stop: number) => {
    let array: any[] = []
    let objCounter:any = {};
    arrayObj?.forEach( e => {
        let string = `${e.arrayNumber[0]}${e.arrayNumber[1]}`;
        if(objCounter[string] >= 1){
            objCounter = {
                ...objCounter,
                [string]: objCounter[string] + 1
            }
        } else {
            objCounter = {
                ...objCounter,
                [string]: 1
            }
        }
        for(let i= 0; i< e.duration; i++){
            for(let j = 0; j < 2; j++){
                let min = j * 30 + e.arrayNumber[1];
                if(e.arrayNumber[1] === 30){
                    min = (j === 1) ? 0 : 30
                } 
                if(objCounter[string] === stop){
                    array.push(
                        setHours(setMinutes(e.date, min ), e.arrayNumber[0] + i)
                    )
                }
            }
        }
    });
    return array
}

export const onClickDate = (event: any, arrayAvailabilities: ShopAvailability[]) => {
    let timeAv: any;
    let monthAv:Event[] = arrayAvailabilities.filter(
        e => getMonth(event) === getMonth(e.start || event)
    );
    if(monthAv.length > 0) {
        let dayAv:Event[] = monthAv.filter(
            e => getDate(event) === getDate(e.start || event)
        );
        if(dayAv.length > 0) {
            timeAv = dayAv.map(
                e => {
                    const dateStart = new Date(e.start || 0)
                    return {
                        time: format(dateStart, "HH:mm"),
                        date: dateStart,
                        duration: e.service?.duration
                    }
                }
            )
            return getNumbersOfTime(timeAv) 
        }
    }
}
export const minToHoursString = (minutes: number) => {
    const min = (minutes % 60 === 0) ? '00' : '30';
    const hour = minutesToHours(minutes);
    const string = `${hour}:${min}`;
    return string
}
export const differenceOfTimeInMin = ( durationService: number, timeToNexBooking: number ) => {
    const minutesService = hoursToMinutes(durationService);
    return minutesService - timeToNexBooking;
}


export const formValidate = (form:any) => {
    let emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let phoneRegex = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/g;
    let nameRegex =  /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(?:\s+[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+){1,5}(?:\s+[-\sa-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+)?$/g;
    let toCheck = ['email', 'name', 'password', 'phone']
    let arrayErrors:string[] = [];
    let prop:string

    for (prop in form) {
        toCheck.forEach(e => {
            if(e === prop){
                if(prop === 'email' && !emailRegex.test(form[prop])){
                    arrayErrors.push('*Email incorrecto.');
                }
                if(prop === 'phone' && !phoneRegex.test(form[prop])){
                    arrayErrors.push('*Datos telefónicos incorrectos.');
                }
                if(prop === 'name' && !nameRegex.test(form[prop])) {
                    arrayErrors.push('*Escribe tu nombre y apellido correctamente.');
                }
                if(prop === 'password' && form[prop].length < 6) {
                    arrayErrors.push('*El password debe de ser de al menos 6 dígitos.')
                }
            }
        })        
    }
    return arrayErrors
}