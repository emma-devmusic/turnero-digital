import { useContext, useEffect, useState } from "react"
import { AuthBooking, AuthContext } from "../../context"
import { getShopByID } from "../../gettersDB/getShops"
import { format } from "date-fns"
import { es } from "date-fns/locale"

type RowBookingProps = {
    key?:string | number | undefined,
    authBooking: AuthBooking
}

export const RowBooking = ({authBooking}:RowBookingProps) => {
    
    const [nameShop, setNameShop] = useState('');
    const {authState: {userName}} = useContext(AuthContext);

    const dateStart = new Date(authBooking.start || 0);
    const dateEnd = new Date(authBooking.end || 0);
    const day = format(dateStart, "EEEE dd 'de' LLLL 'de' yyyy", {locale: es})
    const timeStart = format(dateStart, "HH:mm");
    const timeEnd = format(dateEnd, "HH:mm");

    useEffect( () => {
        getShopByID(authBooking.shop).then(
            data => setNameShop(data.name)
        )
    },[])
    
    return (
        <div className="card-body border-bottom">
            <h6 className="card-title">{ nameShop }</h6>
            <h6 className="card-subtitle"><i>{ authBooking.service?.name }</i></h6>
            <p className="card-text m-0"><span>Precio: </span><i>{authBooking.price}</i></p>
            <p className="card-text m-0"><span>Fecha: </span><i>{day}</i></p>
            <span>De </span><i>{timeStart}</i><span> a </span><i>{timeEnd}</i>
            <p className="card-text m-0"><span>Para: </span><i>{authBooking.user?.name}</i></p>
            <p className="card-text m-0"><span>Notas: </span><i>{authBooking.desc}</i></p>
        </div>   
    )
}
