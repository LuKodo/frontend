export const checkImageExists = async (extensions: string[], imageName: string) => {
    let imgUrl = ''
    try {

        const response = await fetch(`${import.meta.env.VITE_API_URL}/files/products/${imageName}/${extensions}`);
        console.log(response);

        if (response.ok) {
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            imgUrl = url
        }
    } catch (err) {
        imgUrl = 'https://raw.githubusercontent.com/LuKodo/market_frontend/main/public/picture/default.jpg'
    }


    return imgUrl
};

export const getCategoryImage = async (extensions: string[], imageName: string) => {
    let imgUrl = ''
    try {

        const response = await fetch(`${import.meta.env.VITE_API_URL}/files/categories/${imageName}/${extensions}`);
        console.log(response);

        if (response.ok) {
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            imgUrl = url
        }
    } catch (err) {
        imgUrl = 'https://raw.githubusercontent.com/LuKodo/market_frontend/main/public/picture/default.jpg'
    }


    return imgUrl
};

export const getPromoImage = async (extensions: string[], imageName: string) => {
    let imgUrl = ''
    try {

        const response = await fetch(`${import.meta.env.VITE_API_URL}/files/promotions/${imageName}/${extensions}`);

        if (response.ok) {
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            imgUrl = url
        }
    } catch (err) {
        imgUrl = 'https://raw.githubusercontent.com/LuKodo/market_frontend/main/public/picture/default.jpg'
    }


    return imgUrl
};