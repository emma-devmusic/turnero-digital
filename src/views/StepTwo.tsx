import { FC, useContext, useEffect, useState } from 'react';
import { Calendar, Event, View } from 'react-big-calendar';
import { CalendarEvent } from '../components/CalendarEvent';
import { getMessagesEs, localizer, eventStyleGetter } from '../calendarConf';
import { AvailabilityContext, ShopContext } from '../context';
import { useLocation, useNavigate } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import Swal from 'sweetalert2';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ModalBooking } from '../components/ModalBooking';
import { getItem } from 'localforage';
import { format, getTime } from 'date-fns';


//@ts-ignore
const DnDCalendar = withDragAndDrop(Calendar);

export const StepTwo: FC = () => {


  const [modalIsOpen, setIsOpen] = useState(false);
  const { shopState } = useContext(ShopContext)
  const { bookingState, selectBooking, dispatchBooking, unselectBooking, deleteBooking } = useContext(BookingContext)
  const { 
    availabilityState: {availabilities, selected}, 
    selectReserve, 
    unselectReserve,
    deleteReserve, 
    dispatch, 
  } = useContext(AvailabilityContext)

  const navigate = useNavigate()

  const stateBookingInCorrectShop = () => {
    const toAdd = bookingState.booking.filter( b => b.title === shopState.name)
    return [...availabilities, ...toAdd]
  }

  const [events, setEvents] = useState<Event[]>(stateBookingInCorrectShop() as Event[])
  const [lastView, setLastView] = useState<View>( localStorage.getItem('lastView') as View || 'week' );

  const onDoubleClick= (event: Event) => {
    document.getElementById('editReserve')?.click();
  }

  const onSelect = (event: Event) => {
    
    if(event.bgColor === 'darkgreen') {
      unselectReserve(dispatch)
      selectBooking(event, dispatchBooking)
    } else {
      unselectBooking(event, dispatchBooking);
      selectReserve(event, dispatch)
    }
    const dateStarting = new Date(event.start || 0)
    console.log(
      event
    )
  }
  
  const onViewChanged = (view:View) => {
    setLastView(view)
    localStorage.setItem('lastView',view);
  }

  const handleNewReserve = () => {
    unselectReserve(dispatch)
    unselectBooking({}, dispatchBooking);
    setIsOpen(true)
  }

  const handleEditClick = () => {
    setIsOpen(true)
  }

  const handleDelete = () => {
    Swal.fire({
      title: "¿Estás seguro de eliminar el registro?",
      text: "La acción no puede deshacerse",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "grey",
      confirmButtonText: "Si, borrar",
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        if(selected){
          deleteReserve(selected?.id || '' , dispatch)
          unselectReserve(dispatch)
        } else if( bookingState.selected) {
          deleteBooking(bookingState.selected, dispatchBooking);
          unselectBooking(bookingState.selected, dispatchBooking)
        }
        Swal.fire({
          title: "¡Eliminado!",
          text: "Registro eliminado con éxito.",
          icon: "success"
        });
      }
    });
  }
  useEffect(() => {
    unselectReserve(dispatch);
  },[useLocation().pathname]);

  useEffect(() => {
    setEvents(stateBookingInCorrectShop() as Event[]);
  }, [availabilities, bookingState.booking]);

  const handleNextStep = () => {
    navigate('/turnero/step-three')
  }

  if(!shopState.selected) return <h3 className="text-center text-alternative-2 font-weight-normal">Debe completar el paso anterior</h3>

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
        timeslots={2}
        messages={ getMessagesEs() }
        eventPropGetter= {eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <div className='d-flex justify-content-between'>
        <div>
          <ModalBooking modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
          <button className="btn btn-primary mt-2 mr-2" onClick={handleNewReserve} id="buttonOpenModal">Nuevo Turno</button>
          {
            (selected || bookingState.selected) && 
            <>
              <button 
                id='editReserve'
                className='btn btn-outline-primary mt-2 mr-2'
                onClick={handleEditClick}
              >Editar</button>
              <button 
                className='btn btn-outline-danger mt-2'
                onClick={handleDelete}  
              >Eliminar</button>
            </>
          }
        </div>
        {
          (bookingState.booking.length > 0) && 
          <button 
            className='btn btn-primary mt-2'
            onClick={handleNextStep}  
          >Siguiente</button>
        }
      </div>
    </div>
  )
}


