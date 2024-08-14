import axios from "axios";

export const checkImageExists = async (extensions: string[], imageName: string) => {
    let path = '/picture/default.jpg'
    for (const ext of extensions) {
        try {
            const response = await axios.get(`/picture/${imageName}.${ext}`, { responseType: 'blob' });
            if (response.data.type === 'image/png' || response.data.type === 'image/webp') {
                path = `/picture/${imageName}.${ext}`
            }
        } catch (err) {
            path = '/picture/default.jpg'
        }
    }

    return path
};