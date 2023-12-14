
export const Register = () => {
    return (
        <div className="container d-flex flex-column align-items-center h-100" id="login-register-container">
            <h2>Registrate</h2>
            <hr className="hr mb-4"/>
            <form id="register-form">
                <div className="form-group d-flex mb-4 align-items-center">
                    <svg className="icon-form" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z"/></svg>
                    <input type="email" className="ml-2 form-control" id="email" aria-describedby="emailHelp" placeholder="Ingresá tu email"/>
                </div>
                <div className="form-group d-flex mb-4 align-items-center">
                    <svg className="icon-form" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M12 4a8 8 0 0 0-6.96 11.947A4.99 4.99 0 0 1 9 14h6a4.99 4.99 0 0 1 3.96 1.947A8 8 0 0 0 12 4m7.943 14.076A9.959 9.959 0 0 0 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12a9.958 9.958 0 0 0 2.057 6.076l-.005.018l.355.413A9.98 9.98 0 0 0 12 22a9.947 9.947 0 0 0 5.675-1.765a10.055 10.055 0 0 0 1.918-1.728l.355-.413l-.005-.018M12 6a3 3 0 1 0 0 6a3 3 0 0 0 0-6" clipRule="evenodd"/></svg>
                    <input type="text" className="ml-2 form-control" id="name" placeholder="Ingresá tu nombre y apellido"/>
                </div>
                <div className="form-group d-flex mb-4 align-items-center">
                    <svg className="icon-form" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5zm0 6c1.4 0 2.8 1.1 2.8 2.5V11c.6 0 1.2.6 1.2 1.3v3.5c0 .6-.6 1.2-1.3 1.2H9.2c-.6 0-1.2-.6-1.2-1.3v-3.5c0-.6.6-1.2 1.2-1.2V9.5C9.2 8.1 10.6 7 12 7m0 1.2c-.8 0-1.5.5-1.5 1.3V11h3V9.5c0-.8-.7-1.3-1.5-1.3"/></svg>
                    <input type="password" className="ml-2 form-control" id="password" placeholder="Ingresá tu contraseña"/>
                </div>
                <div className="form-group d-flex mb-4 align-items-center">
                    <svg className="icon-form" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5zm0 6c1.4 0 2.8 1.1 2.8 2.5V11c.6 0 1.2.6 1.2 1.3v3.5c0 .6-.6 1.2-1.3 1.2H9.2c-.6 0-1.2-.6-1.2-1.3v-3.5c0-.6.6-1.2 1.2-1.2V9.5C9.2 8.1 10.6 7 12 7m0 1.2c-.8 0-1.5.5-1.5 1.3V11h3V9.5c0-.8-.7-1.3-1.5-1.3"/></svg>
                    <input type="password" className="ml-2 form-control" id="password2" placeholder="Reingresá la contraseña"/>
                </div>
                <div className="d-flex">
                    <small id="emailHelp" className="form-text text-muted mr-1">Completa los campos para poder registrarte.</small>
                    <small className="form-text text-muted"><a href="./login.html">¿Ya tienes una cuenta?</a></small>
                </div>
                <button type="submit" className="btn btn-primary mt-4" id="submit-form">Registrarse</button>
            </form>

        </div>

    )
}
