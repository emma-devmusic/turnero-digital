import { Event } from 'react-big-calendar';

export const CalendarEvent = ({ event } : {event: Event}) => {
    const { user, service } = event;
    
    return (
        <div
            className=''
            // data-toggle="modal" 
            // data-target="#ModalCenter"
        >
            <strong>{service?.name}</strong>
            <i> - { user?.name }</i>
        </div>
    )
}

