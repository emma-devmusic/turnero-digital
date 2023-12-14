import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUserDB } from "../gettersDB/getUser";
import Swal from "sweetalert2";

export const Login = () => {
    
    const navigate = useNavigate();
    const { authState , login } = useContext( AuthContext );
    const [ loginForm, setLoginFrom ] = useState({
        email: '',
        password: ''
    })
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginFrom({
            ...loginForm,
            [e.target.name]: e.target.value
        })
    }

    const handlerLoginForm = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const { flag, userLogin } = await getUserDB(loginForm);
        if(flag) {
            let user = {
                isLogged: flag,
                userEmail: userLogin.email,
                userName: userLogin.name,
                userPhone: 3731455146
            }
            login(user)
            navigate("/turnero/profile");
        }
        Swal.fire({
            icon: flag ? 'success' : "warning",
            title: flag ? "Ingresando..." : "No estás registrado, o los datos son incorrectos.",
            showConfirmButton: false,
            timer: flag ? 1500 : 3000
        });
    }

    return (
        <div className="container d-flex flex-column align-items-center h-100" id="login-register-container">
            <h2>Ingresá a tu cuenta.</h2>
            <hr className="hr mb-4"/>
            <form id="login-form">
                <div className="form-group d-flex mb-4 align-items-center">
                    <svg className="icon-form" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z"/></svg>
                    <input 
                        type="email" 
                        className="ml-2 form-control" 
                        id="email" 
                        name="email" 
                        value={loginForm.email}
                        onChange={handleInputChange}
                        placeholder="Ingresá tu email"
                    />
                </div>
                <div className="form-group d-flex mb-4 align-items-center">
                    <svg className="icon-form" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5zm0 6c1.4 0 2.8 1.1 2.8 2.5V11c.6 0 1.2.6 1.2 1.3v3.5c0 .6-.6 1.2-1.3 1.2H9.2c-.6 0-1.2-.6-1.2-1.3v-3.5c0-.6.6-1.2 1.2-1.2V9.5C9.2 8.1 10.6 7 12 7m0 1.2c-.8 0-1.5.5-1.5 1.3V11h3V9.5c0-.8-.7-1.3-1.5-1.3"/></svg>
                    <input 
                        type="password" 
                        className="ml-2 form-control" 
                        id="password" 
                        name="password" 
                        value={loginForm.password}
                        onChange={handleInputChange}
                        placeholder="Ingresá tu contraseña"
                    />
                </div>
                <div className="d-flex">
                    <small id="emailHelp" className="form-text text-muted mr-1">Completa los campos para poder ingresar.</small>
                    <small className="form-text text-muted"><a href="./register.html">¿Aún no tienes una cuenta?</a></small>
                </div>
                <button type="submit" className="btn btn-primary mt-4" id="submit-form" onClick={(e) => handlerLoginForm(e)}>Ingresar</button>
            </form>
        </div>
    )
}
