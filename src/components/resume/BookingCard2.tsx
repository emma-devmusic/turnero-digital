import { format } from "date-fns"
import { ShopAvailability } from "../../context"
import { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale";
import { firstUppercase } from "../../helpers";
import { useContext } from "react";
import { BookingContext } from "../../context/BookingContext";

type PropBookingCard = {
  data: ShopAvailability,
  key?: number,
}

registerLocale('es', es);

export const BookingCard2 = ({data}:PropBookingCard) => {

    const dateStart = new Date(data.start || 0);
    const dateEnd = new Date(data.end || 0);
    const day = format(dateStart, "EEEE dd 'de' LLLL 'de' yyyy", {locale: es})
    const timeStart = format(dateStart, "HH:mm");
    const timeEnd = format(dateEnd, "HH:mm");

    const handleClickEdit = () => {
        console.log(data)
    }

    return (
        <>
            <hr />
            <h6 className="card-subtitle mb-2">{data.service?.name}</h6>
            <p className="card-text">
            <strong>Precio: </strong> 
            <span>${data.price}</span>
            <br />
            <strong>Fecha:</strong> <span>{firstUppercase(day)}</span>
            <br />
            <span>De </span> <strong>{timeStart}</strong> <span>a </span> <strong>{timeEnd}</strong>
            </p>
            <div className="d-flex justify-content-between">
            <button 
                className="btn btn-outline-primary" 
                onClick={handleClickEdit}  
            >Editar</button>
            <button className="btn btn-outline-danger" >Eliminar</button>
            </div>
        </>
    )
}
