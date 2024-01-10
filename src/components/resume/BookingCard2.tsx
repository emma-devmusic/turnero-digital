import { format } from "date-fns"
import { ShopAvailability } from "../../context"
import { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale";
import { firstUppercase } from "../../helpers";

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
            <div className="d-flex justify-content-between">
                <div>
                    <h6 className="card-subtitle mb-2">{data.service?.name}</h6>
                    <p className="card-text">
                        <strong>Precio: </strong> 
                        <i>${data.price}</i>
                        <br />
                        <strong>Fecha:</strong> <span>{firstUppercase(day)}</span>
                        <br />
                        <span>De </span><strong>{timeStart}</strong><span>a </span><strong>{timeEnd}</strong>
                        <p><strong>Notas: </strong>{data.desc}</p>
                    </p>
                </div>
                <div className="d-flex flex-column justify-content-between">
                    <button className="btn btn-outline-success">
                        Pago Individual
                    </button>
                    <button 
                        className="btn btn-outline-primary mt-3" 
                        onClick={handleClickEdit}  
                    >
                        Editar
                    </button>
                    <button 
                        className="btn btn-outline-danger mt-3" 
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </>
    )
}
