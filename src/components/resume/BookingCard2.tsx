import { format } from "date-fns"
import { ShopAvailability } from "../../context"
import { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale";
import { firstUppercase } from "../../helpers";
import Swal from "sweetalert2";
import { useContext } from "react";
import { UiContext } from "../../context/UiContext";
import { BookingContext } from "../../context/BookingContext";

type PropBookingCard = {
  data: ShopAvailability,
  key?: number,
}

registerLocale('es', es);

export const BookingCard2 = ({data}:PropBookingCard) => {


    const { setModalOpen } = useContext(UiContext)
    const { bookingState , selectBooking, dispatchBooking, deleteBooking, unselectBooking } = useContext(BookingContext)

    const dateStart = new Date(data.start || 0);
    const dateEnd = new Date(data.end || 0);
    const day = format(dateStart, "EEEE dd 'de' LLLL 'de' yyyy", {locale: es})
    const timeStart = format(dateStart, "HH:mm");
    const timeEnd = format(dateEnd, "HH:mm");

    const handleClickEdit = () => {
        selectBooking(data, dispatchBooking)
        setModalOpen({
            for: 'from-resume',
            isOpen: true
        })
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
            if( bookingState.selected) {
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
                        <br />
                        <strong><i>Para:</i></strong> <i>{data?.user?.name}</i>
                        <br />
                        <strong>Notas: </strong>{data.desc}
                    </p>
                </div>
                <div className="d-flex flex-column">
                    <button className="btn btn-outline-success btn-sm">
                        Pago Individual
                    </button>
                    <button 
                        className="btn btn-outline-primary mt-2 btn-sm" 
                        onClick={handleClickEdit}  
                    >
                        Editar
                    </button>
                    <button 
                        onClick={handleDelete}
                        className="btn btn-outline-danger mt-2 btn-sm" 
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </>
    )
}
