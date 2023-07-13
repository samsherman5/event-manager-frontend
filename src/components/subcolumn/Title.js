import { parseCSV, onKeyDown_Autofill, onInput_Autofill } from './sub/AutofillFunctions';
import { useEffect, useState } from "react";

const Title = ({title, titleRef, unsavedChanges, setUnsavedChanges}) => {
    const [eventSuggestions, setEventSuggestions] = useState([]); // array of suggestions
    const [filteredEventSuggestions, setFilteredEventSuggestions] = useState([]); // filtered list of suggestions based on whats typed in
    const [selectedIndex, setSelectedIndex] = useState(0); // index selected in the autofill
      
    // Parses CSV in the config as the suggestions
    useEffect(() => {
        parseCSV('./config/events.csv')
            .then((data) => {
                setEventSuggestions(data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    // This UseEffect sets so whenever something is typed/the suggestion list 
    // is refiltered, the index is set back to 0 (to the start of the list)
    useEffect(() => {
        if (filteredEventSuggestions[0]){
            setSelectedIndex(0);
        }
    }, [filteredEventSuggestions]);


    return (
        <div className='me-3 d-flex align-items-center'>
            <span 
                spellCheck={false}
                ref={titleRef}
                onInput={(event) => onInput_Autofill(event, eventSuggestions, unsavedChanges, setUnsavedChanges, setFilteredEventSuggestions)}
                onKeyDown={(event) => onKeyDown_Autofill(event, setSelectedIndex, eventSuggestions,  selectedIndex, filteredEventSuggestions, unsavedChanges, setUnsavedChanges, setFilteredEventSuggestions)}
                contentEditable={true} 
                suppressContentEditableWarning={true} 
                className="d-inline editable-content title m-0 p-0"
            >
                {title}
            </span>
            <span className="d-inline title m-0 p-0 autofill-light readonly"> {filteredEventSuggestions[selectedIndex]}</span>
        </div>
    );
}

export default Title;    