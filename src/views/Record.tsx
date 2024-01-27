import { useContext } from "react"
import { AuthContext } from "../context"
import { getShopByID } from "../gettersDB/getShops"
import { RowBooking } from "../components/record/RowBooking"

export const Record = () => {

  const { authState: {userBookings} } = useContext(AuthContext)

  return (
    <div className="container w-75">
      <h4 className="text-center">Historial de Turnos</h4>
      <hr />
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Filtrar</span>
        <input type="text" className="form-control" placeholder="Username"/>
      </div>
      <div className="card">
        {
          userBookings?.map((authBooking,i) => 
            <RowBooking authBooking={authBooking} key={i} />
            )
        }

      </div>
    </div>
  )
}
