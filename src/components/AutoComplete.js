import { useEffect, useState } from "react";
import Papa from 'papaparse';

const AutoComplete = ({organizer, index, setOrganizer, unsavedChanges, setUnsavedChanges, item}) => {
    const [staffList, setStaffList] = useState([]); // array of staff
    const [filteredStaffList, setFilteredStaffList] = useState([]); // array of staff, filtered by what is inputted
    const [selectedIndex, setSelectedIndex] = useState(0); // index in the array of filtered staff that is being tabbed through

    if (typeof item !== 'string') {
        throw Error('Expected item to be string'); 
    }

    function parseCSV (file) {
        fetch( file )
        .then( response => response.text() )
        .then( responseText => {
            // -- parse csv
            let data = Papa.parse(responseText, { header: false });
            const flattenedArray = [].concat(...data.data);
            setStaffList(flattenedArray);
        });
    }     
      
    useEffect(() => {
        parseCSV('./staff.csv');
    }, []);

    useEffect(() => {
        if (filteredStaffList[0]){
            setSelectedIndex(0);
        }
    }, [filteredStaffList]);

    function onKeyDown_Autofill(event) {
        if (event.key === "Tab") {
            if (filteredStaffList && filteredStaffList[selectedIndex + 1]) {
                setSelectedIndex(selectedIndex + 1);
            } else {
                setSelectedIndex(0);
            }
            event.preventDefault();
        }
        else if (event.key === "Enter") {
            event.preventDefault();
            if (filteredStaffList[selectedIndex] && filteredStaffList[selectedIndex] !== "") {
                const newText = filteredStaffList[selectedIndex];
                const text = event.target.textContent;
                let temp = organizer;
                const searchString = text+newText;
                const correctlyCase = correctCase(searchString);
                temp[index] = correctlyCase[0];
                setOrganizer(temp);
                event.target.textContent = temp[index];
                setFilteredStaffList([""]);
            }

            if (!unsavedChanges){
                setUnsavedChanges(true);
            }
            // set the inside of the main text to the autofill text
            event.target.blur();
        }
    }

    const onInput_Autofill = (event) => {
        if (!unsavedChanges){
            setUnsavedChanges(true);
        }
        const text = event.target.textContent;
        let temp = organizer;
        temp[index] = text;
        setOrganizer(temp);

        const filteredStaff = search(text);
        setFilteredStaffList(filteredStaff);
    };

    // Filtering array (staff list) for text (what is in the input)
    function filter(array, searchString) {
        const lowercaseSearch = searchString.toLowerCase();
        const filteredArray = array.filter(x => x.toLowerCase().startsWith(lowercaseSearch))
          .map(x => x.substring(searchString.length).replace(/ /g, '\u00A0'));
        return filteredArray;
    }    
    
    function correctCase(searchString) {
        searchString = searchString.replace(/\u00A0/g, ' ');
        var searchWords = searchString.toLowerCase().split(' ');
        const filteredArray = staffList.filter(x => {
          const lowercaseItem = x.toLowerCase();
          return searchWords.every(word => lowercaseItem.includes(word));
        });
      
        const correctCasedArray = filteredArray.map(x => {
          const matchedWords = searchWords.filter(word => x.toLowerCase().includes(word));
          let correctCasedItem = '';
      
          for (let i = 0; i < x.length; i++) {
            if (matchedWords.some(word => x.toLowerCase().indexOf(word) === i)) {
              correctCasedItem += x[i].toUpperCase();
            } else {
              correctCasedItem += x[i].toLowerCase();
            }
          }
      
          return correctCasedItem;
        });
      
        return correctCasedArray;
    }
              

    // Running a filter for the staff list
    function search(text){
        if (text === "") {
            return [""];
        }
        const filteredStaff = filter(staffList, text);
        if (!filteredStaff[0]) {
            return [""];
        }
        return filteredStaff;
    }
    console.log(organizer);
    return (
        <div className="col-auto p-0 me-1">
            <div className="d-inline-flex align-items-center justify-content-center py-1 px-2 w-auto text-nowrap organizer-nametag mt-2 py-0">
                <p
                    spellCheck={false}
                    onInput={onInput_Autofill}
                    onKeyDown={onKeyDown_Autofill}
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    className="editable-content autofill-p autofill-main m-0 p-0"
                >
                    {item}
                </p>
                <span className="form-control-plaintext m-0 p-0 autofill-options readonly"> {filteredStaffList[selectedIndex]}</span>
            </div>
        </div>
    );
};

export default AutoComplete;