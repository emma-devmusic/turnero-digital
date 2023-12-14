import { ShopState } from "../context";

export const getShopsDB = async () => {
    let shops: ShopState[];
    const resp = await fetch('../../data.json');
    const { locales } = await resp.json();
    shops = [ ...locales ]
    return shops;
}