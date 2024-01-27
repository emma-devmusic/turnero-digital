type CardProfileProps = {
    authImg: string,
    authName: string,
    authDesc: string
}

export const CardProfilePhoto = ({ authImg, authName, authDesc }:CardProfileProps) => {

    return (
        <div className="card shadow-sm" style={{width: '18rem'}}>
            <img src={authImg} className="card-img-top" alt="Imagen del perfil"/>
            <div className="card-body">
                <h5 className="card-title">{authName}</h5>
                <p className="card-text">{authDesc}</p>
            </div>
        </div>
    )
}
