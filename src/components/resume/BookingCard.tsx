
import { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale";
import { useContext, useEffect, useState } from 'react';
import { BookingContext } from "../../context/BookingContext";
import { BookingCard2 } from "./BookingCard2";
import { Shop } from '../../context/interfaces';
import { getShopByID } from "../../gettersDB/getShops";
import { showShopInfo } from "../../helpers";
import { useLocation } from "react-router-dom";

type PropBookingCard = {
  shopId: string,
  key?: number,
}

registerLocale('es', es);

export const BookingCard = ({shopId}:PropBookingCard) => {
  
  const location = useLocation();
  const { bookingState: { booking } } = useContext(BookingContext)
  const [shop, setShop] = useState({} as Shop)

  useEffect(() => {
    getShopByID(shopId).then(
      resp => setShop( resp )
    )
  },[])

  const handleShowShopInfo = () => {
    showShopInfo(shop)
  }

  return (
    <div className="d-flex flex-column">
      <div className="card w-100 p-0">
          <div className="card-body">
              <div className="card-title d-flex justify-content-between align-items-center">
                <h5 className="m-0">Reservas en {shop.name}</h5>
                <button 
                  className="btn btn-info btn-sm"
                  onClick={handleShowShopInfo}
                >
                  Info Contacto
                </button>
              </div>
              {
                booking.map( (element,i) => {
                  if( shop.id === element.shop )
                  return <BookingCard2 data={element} key={i} />
                } )
              }
          </div>
      </div>
      {
        (location.pathname === '/turnero/step-resumen') &&
        <button className="btn btn-success btn-sm mt-1">Pago Total</button>
      }
    </div>
  )
}
