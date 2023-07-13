const fetchData = async (file) => {
    try {
        const response = await fetch(file);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

export function BgImage(day) {
    return new Promise((resolve, reject) => {
        fetchData('/config/theme_image.json').then((backgroundImage) => {
            if (backgroundImage && backgroundImage[day]) {
                console.log(backgroundImage[day]);
                resolve(`url(${backgroundImage[day]})`);
            } else {
                resolve("");
            }
        }).catch(reject);
    });
}