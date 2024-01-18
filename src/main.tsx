import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext.tsx";
import { router } from './routes/routes.tsx';
import { ShopProvider } from './context/ShopContext.tsx';
import { BookingProvider } from './context/BookingContext.tsx';
import { UiProvider } from './context/UiContext.tsx';
import './css/style.css';


const ContextProvider = ({children}: any) => {
    return (
      <UiProvider>
        <AuthProvider>
          <ShopProvider>
            <BookingProvider>
              {children}
            </BookingProvider>
          </ShopProvider>
        </AuthProvider> 
      </UiProvider>
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



