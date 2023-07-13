import Papa from 'papaparse';

// This parses the CSV suggestions file using file directory param
export function parseCSV(file) {
    return new Promise((resolve, reject) => {
        fetch(file)
        .then(response => response.text())
        .then(responseText => {
            let data = Papa.parse(responseText, { header: false });
            const flattenedArray = [].concat(...data.data);
            resolve(flattenedArray);
        })
        .catch(error => reject(error));
    });
}

// This OnKeyDown works so whenever you press tab, you go through the array
// Also, Enter saves the text you are currently on as the new text
export function onKeyDown_Autofill(event, setSelectedIndex, staffList,  selectedIndex, filteredList, unsavedChanges, setUnsavedChanges, setFilteredList, saveData) {
    if (event.key === "Tab") {
        if (filteredList && filteredList[selectedIndex + 1]) {
            setSelectedIndex(selectedIndex + 1);
        } else {
            setSelectedIndex(0);
        }
        event.preventDefault();
    }
    else if (event.key === "Enter") {
        event.preventDefault();
        if (filteredList[selectedIndex] && filteredList[selectedIndex] !== "") {
            const newText = filteredList[selectedIndex];
            const text = event.target.textContent;
            event.target.textContent = correctCase(text+newText, staffList);
            setFilteredList([""]);
            if (saveData) {
                saveData(event.target.textContent);
            };
        }

        if (!unsavedChanges){
            setUnsavedChanges(true);
        }
        // set the inside of the main text to the autofill text
        event.target.blur();
    }
}

// Filters list based on what is typed
// Also saves data (if enabled) 
export function onInput_Autofill(event, list, unsavedChanges, setUnsavedChanges, setFilteredList, saveData) {
    if (!unsavedChanges){
        setUnsavedChanges(true);
    }

    var text; 

    if (saveData) {
        text = saveData(event.target.textContent);
    } else {
        text = event.target.textContent;
    }

    const filteredList = search(list, text);
    setFilteredList(filteredList);
};

// Filtering array (staff list) for text (what is in the input)
function filter(array, searchString) {
    const lowercaseSearch = searchString.toLowerCase();
    const filteredArray = array.filter(x => x.toLowerCase().startsWith(lowercaseSearch))
      .map(x => x.substring(searchString.length).replace(/ /g, '\u00A0'));
    return filteredArray;
}    
          

// Running a filter for the staff list
function search(list, text){
    if (text === "") {
        return [""];
    }
    const filteredList = filter(list, text);
    if (!filteredList[0]) {
        return [""];
    }
    return filteredList;
}

// This correctly cases when finalizing autofill (because it is not case-sensitive) (ex: j(ake Rowen) would turn into Jake Rowen)
function correctCase(searchTerm, array) {
    searchTerm = searchTerm.replace(/\u00A0/g, ' ');
    searchTerm = searchTerm.toLowerCase(); // Convert the search term to lowercase for case-insensitive comparison
  
    // Find the element in the array
    const foundItem = array.find(item => item.toLowerCase() === searchTerm);
    
    // Return the found item with its original casing
    if (foundItem) {
        const originalCaseItem = array[array.findIndex(item => item.toLowerCase() === searchTerm)];
        return originalCaseItem;
    }
    
    // If the item is not found, return null or any other appropriate value
    return null;
}