export const getImage = async (imageName: string, type: string) => {
    try {
        const response = await fetch(`http://localhost/api/getfile/${imageName}/${type}`);

        if (response.ok && response.status === 200) {
            const data = await response.json();
            return data.url;
        }
    } catch (err) {
    }
};