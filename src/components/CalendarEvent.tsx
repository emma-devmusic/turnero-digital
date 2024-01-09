import { Event } from 'react-big-calendar';

export const CalendarEvent = ({ event } : {event: Event}) => {
    const { user, service, desc } = event;
    
    return (
        <div
            className=''
        >
            <strong>{ service?.name }</strong>
            <i> - { user?.name }</i>
            {
                desc && <p> - { desc }</p>
            }
        </div>
    )
}

