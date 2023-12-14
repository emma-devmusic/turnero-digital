import { useContext, useEffect, useState } from 'react';
import { ShopState } from '../context/interfaces';
import { ShopContext, shopInitialState } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

export const ShopCard = ({shop}: {shop: ShopState}) => {

    const { shopState, clickShop } = useContext(ShopContext)
    const [shopCardState, setShopState] = useState(shop as ShopState)
    const navigate = useNavigate()
    
    useEffect(()=> {
        setShopState(shop)
    },[shopState])

    const handleClick = () => {
        if(shopCardState.id === shopState.id){
            clickShop(shopInitialState, 'unselect')
            return
        }
        clickShop(shopCardState, 'select');
        navigate('/turnero/step-two')
    }
    
    return (
        <button 
            className={`btn btn-primary btn-local ${shop.selected && 'selected'}`} 
            onClick={handleClick}    
        >
            {shop.name}
        </button>       
    )
}
