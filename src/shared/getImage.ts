export const getImage = async (imageName: string, type: string, size?: number): Promise<string> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/getfile/${imageName}/${type}`);
        return await checkResponse(response);
    } catch (err) {
        console.error(err);
        return getDefaultImage(size);
    }
};

const checkResponse = async (response: Response): Promise<string> => {
    if (response.status === 200) {
        const data = await response.json();
        return data.url;
    } else {
        throw new Error(response.statusText);
    }
}

export const getDefaultImage = (relation: number|null = null) => {
    switch (relation) {
        case 1:
            return 'https://placehold.co/1416x431/png'
        case 2:
            return 'https://placehold.co/595x370/png'
        case 3:
            return 'https://placehold.co/370x310/png'
        case 4:
            return 'https://placehold.co/290x370/png'
        case 281:
            return 'https://placehold.co/281x281/FFFFFF/CCCCCC/png?text=No+Image'
        case 100:
            return 'https://placehold.co/100x100/333333/CCCCCC/png?text=No+Image'
        default:
            return 'https://placehold.co/595x370/png';
    }
}