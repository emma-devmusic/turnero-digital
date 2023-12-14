import { Event } from 'react-big-calendar';

export const CalendarEvent = ({ event } : {event: Event}) => {
    const { title, user } = event;
        
    return (
        <>
            <strong>{title}</strong>
            <i> - { user?.name }</i>
        </>
    )
}

