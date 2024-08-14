import axios from "axios";

export const checkImageExists = async (extensions: string[], imageName: string) => {
    let path = 'https://raw.githubusercontent.com/LuKodo/market_frontend/main/public/picture/default.jpg'
    for (const ext of extensions) {
        try {
            const response = await axios.get(`/picture/${imageName}.${ext}`, { responseType: 'blob' });
            if (response.data.type === 'image/png' || response.data.type === 'image/webp') {
                path = `https://raw.githubusercontent.com/LuKodo/market_frontend/main/public/picture/${imageName}.${ext}`
            }
        } catch (err) {
            path = 'https://raw.githubusercontent.com/LuKodo/market_frontend/main/public/picture/default.jpg'
        }
    }

    return path
};