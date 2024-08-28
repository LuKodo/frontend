export const getImage = async (imageName: string, type: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/getFile/${imageName}/${type}`);

        if (response.ok && response.status === 200) {
            const data = await response.json();
            return data.url;
        }
    } catch (err) {
    }
};