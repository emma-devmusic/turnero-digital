import { Outlet, useLocation, useNavigate} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import { checkSessionStorage } from "./helpers/helpers";
import { Modal } from "./components/Modal";


export const App = () => {
  
  const { authState, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const arrayPublicPath = ['/turnero', '/turnero/step-one', '/turnero/step-two', '/turnero/step-three', '/turnero/step-resume'];
  const arrayNoSignInPath = ['/login', '/register' ];
  const userInSessionStorage = checkSessionStorage();
  const logged = arrayNoSignInPath.includes(location.pathname) && userInSessionStorage.isLogged;
  const noLogged = !arrayNoSignInPath.includes(location.pathname) && !userInSessionStorage.isLogged && !arrayPublicPath.includes(location.pathname);

  useEffect(() => {
    if(userInSessionStorage.isLogged) {
      login({ ...userInSessionStorage })
    }
    if( logged ) {
      navigate('/turnero/profile');
    } else if( noLogged) {
      navigate('/turnero');
    }
  }, [location.pathname]);
  
  return (
    <>
      <Navbar 
        href={ 
          ( useLocation().pathname !== '/register') 
          ? 'login' 
          : 'register' 
        } 
      /> 
      <Outlet />
      <Modal />
    </>
  )
}
