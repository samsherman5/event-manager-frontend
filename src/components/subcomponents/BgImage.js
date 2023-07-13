const fetchData = async (file) => {
    try {
        const response = await fetch(file);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

export default function BgImage(day) {
    fetchData('/config/theme_image.json').then((backgroundImage) => {
        if (backgroundImage && backgroundImage[day]) {
            document.body.style.backgroundImage = `url(${backgroundImage[day]})`;
        } else {
            document.body.style.backgroundImage = "";
        }
    });
}