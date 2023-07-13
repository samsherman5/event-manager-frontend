import Organizer from './sub/Organizer';

const Organizers = ({unsavedChanges, setUnsavedChanges, organizers, setOrganizers}) => {
    // adds an organizer
    // removes an organizer
    function addOrganizer(){
        if (!unsavedChanges){
            setUnsavedChanges(true);
        }
        setOrganizers([
            ...organizers, "Organizer"
        ]);
    }

    function removeOrganizer(){
        if (!unsavedChanges){
            setUnsavedChanges(true);
        }
        setOrganizers(organizers.slice(0, -1));
    }

    return (
        <>
            {organizers.map((item, index) => {
                return (
                    <Organizer key={index} unsavedChanges={unsavedChanges} setUnsavedChanges={setUnsavedChanges} organizer={organizers} setOrganizer={setOrganizers} item={organizers[index]} index={index} />
                );
            })}
            <div className="add-nametag d-flex justify-content-center align-items-center mb-0 p-1">
                <button onClick={addOrganizer} className="weight-500 add-nametag-inner">+</button>
                <button onClick={removeOrganizer} className="weight-500 add-nametag-inner">-</button>
            </div>
        </>
    );
}

export default Organizers;