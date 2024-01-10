import { ShopCard } from '../components/shops/ShopCard';
import { ShopContext } from '../context/ShopContext';
import { ShopState } from '../context/interfaces';
import { getShopsDB } from '../gettersDB/getShops';
import { useEffect, useState, useContext } from 'react';


export const StepOne = () => {

    const [shops, setShops] = useState([] as ShopState[])
    const {shopState} = useContext(ShopContext)
    
    const arrayShop = async() => {
        const array = await getShopsDB()
        setShops(array)
    }
    useEffect(()=> {
        arrayShop();
    },[])

    

    return (
        <>
            <div className="hide" id="view-1">
                <h2 className="text-center font-weight-normal mt-5">¿En qué negocio estás buscando un turno? &#129300;</h2>
                <div className="d-flex flex-wrap justify-content-center mt-5" id="locales">
                {
                    shops.map( (shop, i) => (
                        <ShopCard shop={{
                            selected: shop.id === shopState.id,
                            ...shop
                        }} key={i} />
                    ))
                }
                </div>
            </div>
        </>
    )
}
