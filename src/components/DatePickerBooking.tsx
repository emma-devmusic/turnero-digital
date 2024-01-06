import DatePicker from 'react-datepicker';
import { datesToExcludes, differenceOfTimeInMin, isWeekday, minToHoursString, onClickDate } from '../helpers';
import { useContext, useEffect, useState } from 'react';
import { AvailabilityContext } from '../context';
import { BookingContext } from '../context/BookingContext';
import { differenceInMinutes} from 'date-fns';
import Swal from 'sweetalert2';


export const DatePickerBooking = ({ 
    formValues, 
    onDateChanged, 
    durationService, 
    isInvalid, 
    setIsInvalid 
}:any) => {
    
    const { availabilityState } = useContext(AvailabilityContext)
    const { bookingState } = useContext(BookingContext)

    const [objTimesToExclude, setObjTimesToExclude] = useState([])
    const [dateSelected, setDateSelected] = useState(new Date())

    const arrayAvailabilities = [...availabilityState.availabilities, ...bookingState.booking]

    const handleCalendarClose = () => {
        let difference = 0;
        datesToExcludes(objTimesToExclude).forEach( e =>{
            if(differenceInMinutes(e, dateSelected) > 0 && difference === 0){
                difference = differenceInMinutes(e, dateSelected);
                const time = minToHoursString(
                    differenceOfTimeInMin(durationService,difference)
                    );
                if(differenceOfTimeInMin(durationService, difference) > 0) {
                    setIsInvalid('is-invalid');
                    Swal.fire(
                        'Revisá las horas!', 
                        `<p>Te faltan <strong>${time}hs</strong> para el servicio que seleccionaste</p>`, 
                        'warning'
                    );
                } else {
                    setIsInvalid('');
                }
            }
        })
    }

    const filterPassedTime = (time: any) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
        return currentDate.getTime() < selectedDate.getTime();
    };

    useEffect(()=>{
        handleCalendarClose()
    },[durationService])

    return (
        <div className="form-group mb-2">
            <label className='d-block'>Fecha y hora</label>
            <DatePicker 
                className={'form-control d-block ' + isInvalid}
                minDate={ new Date() }
                selected={ formValues.start } 
                onCalendarClose={handleCalendarClose}
                onChange={(event: any) => {
                    setObjTimesToExclude( 
                        onClickDate(event, arrayAvailabilities) 
                    )    
                    setDateSelected(event)
                    onDateChanged(event, 'start')
                }} 
                dateFormat={'Pp'}
                showTimeSelect
                locale={'es'}
                timeCaption='Hora'
                filterDate={isWeekday}
                filterTime={filterPassedTime}
                excludeTimes={ datesToExcludes(objTimesToExclude) || [] }
                placeholderText="Selecciona una fecha disponible"
            />
        </div>
    )
}
