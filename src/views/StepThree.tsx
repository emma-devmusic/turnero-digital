
export const StepThree = () => {
    return (
        <>
            <div className="hide" id="view-3">
                <h3 className="text-center text-alternative-2 font-weight-normal">Debe completar el paso anterior</h3>
                <div id="ocultar-2">
                    <h2 className="text-center mb-2 font-weight-normal">Coloca tus datos</h2>
                    <hr/>
                    <p className="form-text text-muted text-center mb-5">No compartiremos tu información con nadie</p>
                    <form className="mx-auto">
                        <div className="form-group mb-4">
                            <input type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Nombre"/>
                        </div>
                        <div className="form-group mb-4">
                            <input type="email" className="form-control" id="email" placeholder="Correo"/>
                        </div>
                        <div className="form-group mb-4">
                            <input type="phone" className="form-control" id="phone" placeholder="Teléfono"/>
                        </div>
                        <button type="submit" className="btn btn-outline-primary mt-4 w-100" id="save-data">Guardar información de Contacto | Mostrar Resumen</button>
                      </form>
                </div>
            </div>
        </>
    )
}
