
export const getShopsDB = async () => {
    const resp = await fetch('../../data.json');
    const { locales } = await resp.json();
    return locales;
}

export const getShopByID = async (shopId:string) => {
    const resp = await fetch('../../data.json')
    const { locales } = await resp.json()
    return locales.find( (shop:any) => shop.id == shopId)
}