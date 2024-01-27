
type CardProfileInfoProps = {
    userName?: string,
    userEmail?: string,
    userPhone?: string | number,
    userAge?: string | number
}

export const CardProfileInfo = ({userEmail, userName, userPhone, userAge}:CardProfileInfoProps) => {
    return (
        <div className="card w-75">
            <div className="card-body">
                <h5 className="card-subtitle">Información del Cliente.</h5>
                <hr />
                <div className="">
                    <p className=""><strong>Nombre:</strong> <span>{userName}</span></p>
                    <p className=""><strong>Correo:</strong> <span>{userEmail}</span></p>
                    <p className=""><strong>Teléfono:</strong> <span>{userPhone}</span></p>
                    <p className=""><strong>Edad:</strong> <span> {userAge || 27} años</span></p>
                </div>
                <hr />
                <button className="btn btn-secondary mr-2">Ajustes de Cuenta</button>
                <button className="btn btn-secondary">Editar Información</button>
                
            </div>
        </div>
    )
}
