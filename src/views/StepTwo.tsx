import { FC, useContext, useEffect, useState } from 'react';
import { Calendar, Event, View } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { CalendarEvent } from '../components/CalendarEvent';
import { getMessagesEs, localizer, eventStyleGetter } from '../calendarConf';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AvailabilityContext, initialAvailabilityState } from '../context';


//@ts-ignore
const DnDCalendar = withDragAndDrop(Calendar);

export const StepTwo: FC = () => {

  const { availabilityState } = useContext(AvailabilityContext)

  const [events, setEvents] = useState<Event[]>(initialAvailabilityState)

  const [lastView, setLastView] = useState<View>( localStorage.getItem('lastView') as View || 'week' );

  const onDoubleClick= (event: Event) => console.log({doubleClick: event})

  const onSelect = (event: Event) => console.log({click: event})
  
  const onViewChanged = (view:View) => {
    setLastView(view)
    localStorage.setItem('lastView',view);
  }

  useEffect(() => {
    setEvents(availabilityState);
  }, [availabilityState])

  return (
    <div className='bg-white rounded p-3'>
      <DnDCalendar
        culture='es'
        defaultView={lastView}
        events={events}
        localizer={localizer}
        style={{ height: '70vh' }}
        components={{
          event: CalendarEvent
        }}
        messages={ getMessagesEs() }
        eventPropGetter= {eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <button 
        id="openModalButton" 
        className="btn btn-primary mt-2" 
        data-toggle="modal" 
        data-target="#ModalCenter"
      >
        Nuevo Turno
      </button>
    </div>
  )
}


