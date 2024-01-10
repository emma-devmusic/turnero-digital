import { useContext, useState } from "react";
import { BookingContext } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";
import { formValidate, getContactDataFromLocalStorage } from "../helpers";
import { ErrorsMsgForm } from "../components/ErrorsMsgForm";
import { AuthContext, ShopContext } from "../context";

export const StepThree = () => {

    const navigate = useNavigate()
    const { authState:{ userEmail, userName, userPhone } } = useContext(AuthContext)
    const { bookingState: { booking } } = useContext(BookingContext);
    const { shopState } = useContext(ShopContext)
    const { name, email, phone } = getContactDataFromLocalStorage()



    const [trySend, setTrySend] = useState(false)
    const [formValues, setFormValues] = useState({
        name:  userName || name ||'',
        email:  userEmail || email ||'',
        phone:  userPhone || phone ||''
    })

    const handleInputChange = ({target}: any) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }
    
    const handleSave = (e: any) => {
        setTrySend(true)
        e.preventDefault();
        if(formValidate(formValues).length === 0){
            localStorage.setItem('contactInfo', 
                JSON.stringify( formValues )
            )
            navigate('/turnero/step-resume')
        }
    }

    return (
        <>
            <div className="hide" id="view-3">
                {
                    !(booking.length > 0 && shopState.selected) 
                    ? <h3 className="text-center text-alternative-2 font-weight-normal">Debe completar el paso anterior</h3>
                    : <div id="ocultar-2">
                        <h2 className="text-center mb-2 font-weight-normal">Coloca tus datos</h2>
                        <hr/>
                        <p className="form-text text-muted text-center mb-5">No compartiremos tu información con nadie</p>
                        <form className="mx-auto">
                            <div className="form-group mb-4">
                                <input 
                                    onChange={handleInputChange}
                                    type="text" 
                                    className="form-control" 
                                    name="name"
                                    value={formValues.name}
                                    placeholder="Nombre y Apellido"
                                />
                            </div>
                            <div className="form-group mb-4">
                                <input 
                                    onChange={handleInputChange}
                                    type="email" 
                                    className="form-control" 
                                    name="email" 
                                    value={formValues.email}
                                    placeholder="Correo"
                                />
                            </div>
                            <div className="form-group mb-4">
                                <input 
                                    onChange={handleInputChange}
                                    type="phone" 
                                    className="form-control" 
                                    name="phone" 
                                    value={formValues.phone}
                                    placeholder="Teléfono"
                                />
                            </div>
                            {
                                trySend && formValidate(formValues).map( (msg,i) => <ErrorsMsgForm text={msg} key={i} />)
                            }
                            <button 
                                onClick={handleSave}
                                type="submit" 
                                className="btn btn-outline-primary mt-4 w-100" 
                                id="save-data"
                            >Mostrar Resumen</button>
                        </form>
                    </div>
                }
            </div>
        </>
    )
}
