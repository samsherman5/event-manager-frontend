import { useEffect, useState } from "react";

const Theme = ({day}) => {
    const [themes, setThemes] = useState(null);

    const fetchData = async (file) => {
        try {
            const response = await fetch(file);
            const data = await response.json();
            setThemes(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData('./config/themes.json');
    }, []);

    return (
        <>
            { themes && themes[day]? (
                <h1 className="mb-3 display-3 text-center weight-650 theme"><mark>{themes[day]} {day}</mark></h1>
            ) : (
                <h1 className="mb-3 display-3 text-center weight-650 theme"><mark>{day}</mark></h1>
            )}
        </>
    );
}

export default Theme;