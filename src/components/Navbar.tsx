import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { checkSessionStorage } from "../helpers/helpers";

export const Navbar = ({ href }: { href: string }) => {

    const { logout } = useContext(AuthContext);
    const { isLogged } = checkSessionStorage();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/turnero/step-one">Turnero</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"   aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            {
                                isLogged
                                &&
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/turnero/profile">Perfil</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/turnero/journal">Mis Turnos</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/turnero/panel">Panel</Link>
                                    </li>
                                </>
                            }
                        </ul>

                        {
                            isLogged 
                            ? <button className="btn btn-primary my-2 my-sm-0" onClick={handleLogout}>Salir</button>
                            : <Link to={href} className="btn btn-primary my-2 my-sm-0" id="register">{ href==='register' ? 'Registrarse' : 'Ingresar' }</Link >
                        }
                            
                    </div>
                </div>
            </nav>
        </>
    )
}
