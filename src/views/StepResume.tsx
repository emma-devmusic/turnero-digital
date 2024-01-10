import { useContext, useEffect, useState } from "react"
import { BookingCard } from "../components/resume/BookingCard"
import { BookingContext } from "../context/BookingContext"
import { ShopContext } from "../context"
import { ContactCard } from "../components/resume/ContactCard"


export const StepResume = () => {

    const { bookingState: { booking } } = useContext(BookingContext)
    const { shopState } = useContext(ShopContext)
    const [arrayBooking, setArrayBooking] = useState<any>([] as string[])

    useEffect(() => {
        const newArray:string[] = []
        booking.forEach( e => {
            if(!newArray.includes(e.title)) {
                newArray.push(e.title);
            }
        })
        setArrayBooking(newArray)
    },[booking])

    return (
        <>
            <div className="stepResume" id="view-3">
                {
                    (!(booking.length > 0) || !localStorage.getItem('contactInfo') || !shopState.name) 
                    ? <h3 className="text-center text-alternative-2 font-weight-normal">Debe completar el paso anterior</h3>
                    : 
                    <>
                        <ContactCard />
                        <div className="d-flex stepResume-bookings">
                            {
                                arrayBooking.map( (title:string, i:number) => <BookingCard title={title} key={i} />)
                            }
                        </div>
                    </>
                }
            </div>
        </>
    )
}
