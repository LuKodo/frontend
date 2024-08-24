export const getImage = async (extensions: string[], imageName: string, type: string) => {
    let imgUrl = ''
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/files/${type}/${imageName}/${extensions}`);

        if (response.ok) {
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            imgUrl = url
        }
    } catch (err) {
    }


    return imgUrl
};