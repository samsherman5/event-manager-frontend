import { useEffect, useState } from "react";
import Papa from 'papaparse';

const AutoComplete = (props) => {
    const [staffList, setStaffList] = useState([]); // array of staff
    const [filteredStaffList, setFilteredStaffList] = useState([]); // array of staff, filtered by what is inputted
    const [selectedIndex, setSelectedIndex] = useState(0); // index in the array of filtered staff that is being tabbed through

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
        const file = './staff.csv';
        parseCSV(file);
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
                let temp = props.organizer;
                const searchString = text+newText;
                const correctlyCase = correctCase(searchString);
                temp[props.index] = correctlyCase[0];
                props.setOrganizer(temp);
                event.target.textContent = temp[props.index];
                setFilteredStaffList([""]);
            }

            if (!props.unsavedChanges){
                props.setUnsavedChanges(true);
            }
            // set the inside of the main text to the autofill text
            event.target.blur();
        }
    }

    const onInput_Autofill = (event) => {
        if (!props.unsavedChanges){
            props.setUnsavedChanges(true);
        }
        const text = event.target.textContent;
        let temp = props.organizer;
        temp[props.index] = text;
        props.setOrganizer(temp);

        const filteredStaff = search(text);
        setFilteredStaffList(filteredStaff);
    };

    // Filtering array (staff list) for text (what is in the input)
    function filter(array, searchString) {
        const lowercaseSearch = searchString.toLowerCase();
        const filteredArray = array.filter(item => item.toLowerCase().startsWith(lowercaseSearch))
          .map(item => item.substring(searchString.length).replace(/ /g, '\u00A0'));
        return filteredArray;
    }    
    
    function correctCase(searchString) {
        searchString = searchString.replace(/\u00A0/g, ' ');
        var searchWords = searchString.toLowerCase().split(' ');
        const filteredArray = staffList.filter(item => {
          const lowercaseItem = item.toLowerCase();
          return searchWords.every(word => lowercaseItem.includes(word));
        });
      
        const correctCasedArray = filteredArray.map(item => {
          const matchedWords = searchWords.filter(word => item.toLowerCase().includes(word));
          let correctCasedItem = '';
      
          for (let i = 0; i < item.length; i++) {
            if (matchedWords.some(word => item.toLowerCase().indexOf(word) === i)) {
              correctCasedItem += item[i].toUpperCase();
            } else {
              correctCasedItem += item[i].toLowerCase();
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
                    {props.item}
                </p>
                <span className="form-control-plaintext m-0 p-0 autofill-options readonly"> {filteredStaffList[selectedIndex]}</span>
            </div>
        </div>
    );
};

export default AutoComplete;