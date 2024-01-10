import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context"
import { getContactDataFromLocalStorage } from "../../helpers"

export const ContactCard = () => {

    const { authState: { userEmail, userName, userPhone } } = useContext(AuthContext)
    const { name, email, phone } = getContactDataFromLocalStorage()

    const [userState, setUserState] = useState({
        name: '',
        email: '',
        phone: 0
    })
    
    useEffect(() =>{
        setUserState({
            name: userName || name,
            email: userEmail || email,
            phone: userPhone || phone
        })
    },[])


    return (
        <div className="card w-100 contact-card">
            <div className="card-body d-flex flex-column justify-content-between">
                <div>
                    <div>
                        <h4 className="card-title mb-5">Datos de contacto</h4>
                        <hr />
                    </div>
                    <div className="d-flex flex-column">
                        <p className="d-flex justify-content-between m-0">
                            <span>Nombre: </span>
                            <i>{ userState.name }</i>
                        </p>
                        <hr />
                        <p className="d-flex justify-content-between m-0">
                            <span>Correo: </span>
                            <i>{ userState.email }</i>
                        </p>
                        <hr />
                        <p className="d-flex justify-content-between m-0">
                            <span>Teléfono: </span>
                            <i>{ userState.phone }</i>
                        </p>
                        <hr />
                    </div>
                </div>
                <div>
                    <p className="card-subtitle text-muted text-center">Powered by <i className="text-primary">Ding</i></p>
                </div>
            </div>
        </div>
    )
}
