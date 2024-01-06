import { useContext } from "react"
import { BookingCard } from "../components/BookingCard"
import { BookingContext } from "../context/BookingContext"
import { ShopContext } from "../context"


export const StepResume = () => {

    const { bookingState: { booking } } = useContext(BookingContext)
    const { shopState } = useContext(ShopContext)

    return (
        <>
            <div className="hide" id="view-3">
                {
                    (!(booking.length > 0) || !localStorage.getItem('contactInfo') || !shopState.name) 
                    ? <h3 className="text-center text-alternative-2 font-weight-normal">Debe completar el paso anterior</h3>
                    : <div id="ocultar-2">
                        <h2 className="text-center mb-2 font-weight-normal">Resumen de tus turnos</h2>
                        <hr/>
                        <p className="form-text text-muted text-center mb-5">Puedes volver atrás y cambiar los datos</p>
                        <div className="container d-flex flex-wrap">
                            {
                                booking.map( (element, i) => <BookingCard data={element} key={i} />)
                            }
                        </div>
                    </div>
                }
            </div>
        </>
    )
}
