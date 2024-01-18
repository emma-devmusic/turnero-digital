import { useContext, useEffect, useState } from 'react';
import { ShopState } from '../../context/interfaces';
import { ShopContext, shopInitialState } from '../../context/ShopContext';

export const ShopCard = ({shop}: {shop: ShopState}) => {

    const { shopState, clickShop } = useContext(ShopContext)
    const [shopCardState, setShopState] = useState(shop as ShopState)
    
    useEffect(()=> {
        setShopState(shop)
    },[shopState])

    const handleClick = () => {
        if(shopCardState.id === shopState.id){
            clickShop(shopInitialState, 'unselect')
            return
        }
        clickShop(shopCardState, 'select');
    }
    
    return (
        <div 
            className={`btn-local rounded d-flex justify-content-center align-items-center ${shop.selected && 'selected'}`} 
            onClick={handleClick}    
        >
            {shop.name}
        </div>       
    )
}
