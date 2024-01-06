import { Event } from "react-big-calendar";
import { AuthState, ShopServices, ShopState } from "../context"
import { uid } from 'uid';
import { ShopAvailability } from '../context/';
import { format, getDate, getDay, getMonth, hoursToMinutes, minutesToHours, setHours, setMinutes } from "date-fns";

type FormValues = {
    id?: 'string' | number,
    service?: ShopServices,
    name: string,
    notes?: string,
    start: Date,
    end: Date,
    title: string,
    price: number | string
}
type TimeObjToExclude = { arrayNumber: number[], date: Date, duration: number }


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
export const formValuesFormated = ({ id, end, name, start, title, service, price }:FormValues, type: 'new' | 'update') => {
    return {
        id: (type ==='new') ? uid() : id,
        bgColor: (type==='new') ? 'darkgreen': undefined,
        price,
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
    // && day !== 6;
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


export const datesToExcludes = (arrayObj:TimeObjToExclude[]) => {
    let array: any[] = []
    arrayObj?.forEach( e => {
        for(let i= 0; i< e.duration; i++){
            for(let j = 0; j < 2; j++){
                let min = j * 30 + e.arrayNumber[1];
                if(e.arrayNumber[1] === 30) min = (j === 1) ? 0 : 30
                array.push(
                    setHours(setMinutes(e.date, min ), e.arrayNumber[0] + i)
                )
            }
        }
    })
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