import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext.tsx";
import { router } from './routes/routes.tsx';
import './css/style.css';
import { ShopProvider } from './context/ShopContext.tsx';


const ContextProvider = ({children}: any) => {
    return (
      <AuthProvider>
        <ShopProvider>
            {children}
        </ShopProvider>
      </AuthProvider> 
    )
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  // </React.StrictMode>
  ,
)



