import { format } from "date-fns"
import { ShopAvailability } from "../../context"
import { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale";
import { firstUppercase } from "../../helpers";
import { useContext } from "react";
import { BookingContext } from "../../context/BookingContext";
import { BookingCard2 } from "./BookingCard2";

type PropBookingCard = {
  title: string,
  key?: number,
}

registerLocale('es', es);

export const BookingCard = ({title}:PropBookingCard) => {

  const { bookingState: { booking } } = useContext(BookingContext)


  return (
    <div className="card w-100 p-0">
        <div className="card-body">
            <div className="card-title d-flex justify-content-between align-items-center  ">
              <h5 className="m-0">Reservas en {title}</h5>
              <button 
                className="btn btn-info btn-sm"
              >
                Info Contacto
              </button>
            </div>
            {
              booking.map( (element,i) => {
                if( title === element.title )
                return <BookingCard2 data={element} key={i} />
              } )
            }
        </div>
    </div>
  )
}
