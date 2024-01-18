import { Link } from "react-router-dom"
import { ShopState } from "../../context"

type PropShopData = {
    shop:ShopState
}

export const ShopData = ({shop}:PropShopData) => {



    return (
        <div className="card w-100" id="cardShopData">
            {
                shop.name 
                ? 
                <>
                    <img src={shop.img} className="card-img-top" alt="Imagen del negocio"/>
                    <div className="card-body">
                        <h5 className="card-title">{shop.name}</h5>
                        <p className="card-text">{shop.description}</p>
                        <Link to={"/turnero/step-two"} className="btn btn-primary w-100">Reservar aquí</Link>
                    </div>
                </>
                : 
                <div className="d-flex justify-content-center align-items-center h-100 card-empty">
                    <h5 className="card-text mt-0">Selecciona algún negocio.</h5>
                </div>
            }
        </div>
    )
}