import { parseCSV, onKeyDown_Autofill, onInput_Autofill } from './AutofillFunctions';
import { useEffect, useState } from "react";

const AutoComplete = ({organizer, index, setOrganizer, unsavedChanges, setUnsavedChanges, item}) => {
    const [staffList, setStaffList] = useState([]); // array of staff
    const [filteredStaffList, setFilteredStaffList] = useState([]); // array of staff, filtered by what is inputted
    const [selectedIndex, setSelectedIndex] = useState(0); // index in the array of filtered staff that is being tabbed through
      
    // Parses CSV in the config as the suggestions
    useEffect(() => {
        parseCSV('./config/staff.csv')
            .then((data) => {
                setStaffList(data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    // This UseEffect sets so whenever something is typed/the suggestion list 
    // is refiltered, the index is set back to 0 (to the start of the list)
    useEffect(() => {
        if (filteredStaffList[0]){
            setSelectedIndex(0);
        }
    }, [filteredStaffList]);

    // Saves organizer data to array
    function saveData(text) {
        let temp = organizer;
        temp[index] = text;
        setOrganizer(temp);
        return text;
    }

    
    return (
        <div className="col-auto p-0 mt-0 me-1">
            <div className="d-inline-flex align-items-center justify-content-center py-1 px-2 w-auto text-nowrap mt-0 organizer-nametag">
                <p
                    spellCheck={false}
                    onInput={(event) => onInput_Autofill(event, staffList, unsavedChanges, setUnsavedChanges, setFilteredStaffList, saveData)}
                    onKeyDown={(event) => onKeyDown_Autofill(event, setSelectedIndex, staffList,  selectedIndex, filteredStaffList, unsavedChanges, setUnsavedChanges, setFilteredStaffList, saveData)}
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    className="align-items-center d-flex editable-content autofill-p autofill-main m-0 p-0"
                >
                    {item}
                </p>
                <span className="form-control-plaintext text-white m-0 p-0 autofill-options autofill-light readonly"> {filteredStaffList[selectedIndex]}</span>
            </div>
        </div>
    );
};

export default AutoComplete;