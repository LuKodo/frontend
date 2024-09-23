export const getImage = async (imageName: string, type: string) => {
    try {
        const response = await fetch(`http://triton.inversioneslacentral.com/market/api/uploads/${type}/${imageName}.webp`);

        if (response.ok && response.status === 200) {
            const data = await response.json();
            return data.url;
        }
    } catch (err) {
    }
};