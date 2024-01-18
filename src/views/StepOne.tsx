import { ShopCard } from '../components/shops/ShopCard';
import { ShopData } from '../components/shops/ShopData';
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
                <h3 className="text-center font-weight-normal mt-5">¿En qué negocio estás buscando un turno? </h3>
                <div className="d-flex container mt-5 justify-content-center w-100" id="locales">
                    <div className='w-75 d-flex justify-contant-end'>
                        <ShopData shop={shopState} />
                    </div>
                    <div className="d-flex flex-column w-100" >
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
            </div>
        </>
    )
}
