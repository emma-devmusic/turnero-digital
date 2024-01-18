import { useContext, useEffect, useState } from "react"
import { BookingCard } from "../components/resume/BookingCard"
import { BookingContext } from "../context/BookingContext"
import { ShopContext } from "../context"
import { ContactCard } from "../components/resume/ContactCard"


export const StepResume = () => {

    const { bookingState: { booking } } = useContext(BookingContext);
    const { shopState } = useContext(ShopContext);
    const [arrayBookingShops, setArrayBookingShops] = useState<any>([]);

    useEffect(() => {
        const newArray:string[] = []
        booking.forEach( e => {
            if(!newArray.includes(e.shop || '')) {
                newArray.push(e.shop || '');
            }
        })
        setArrayBookingShops(newArray)
    },[booking])


    return (
        <>
            <div className="stepResume" id="view-3">
                {
                    (!(booking.length > 0) || !localStorage.getItem('contactInfo') || !shopState.name) 
                    ? <h3 className="text-center text-alternative-2 font-weight-normal w-100">No tienes reservas.</h3>
                    : 
                    <>
                        <ContactCard />
                        <div className="d-flex stepResume-bookings">
                            {
                                arrayBookingShops.map( (shopId:string, i:number) => <BookingCard shopId={shopId} key={i} />)
                            }
                        </div>
                    </>
                }
            </div>
        </>
    )
}
