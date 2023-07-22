import {
  parseCSV,
  onKeyDown_Autofill,
  onInput_Autofill,
} from "./sub/AutofillFunctions";
import { useEffect, useState } from "react";

const Location = ({
  location,
  locationRef,
  unsavedChanges,
  setUnsavedChanges,
}) => {
  const [locationSuggestions, setLocationSuggestions] = useState([]); // array of suggestions
  const [filteredlocationSuggestions, setFilteredlocationSuggestions] =
    useState([]); // filtered list of suggestions based on whats typed in
  const [selectedIndex, setSelectedIndex] = useState(0); // index selected in the autofill

  // Parses CSV in the config as the suggestions
  useEffect(() => {
    parseCSV("./config/location.csv")
      .then((data) => {
        setLocationSuggestions(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // This UseEffect sets so whenever something is typed/the suggestion list
  // is refiltered, the index is set back to 0 (to the start of the list)
  useEffect(() => {
    if (filteredlocationSuggestions[0]) {
      setSelectedIndex(0);
    }
  }, [filteredlocationSuggestions]);

  return (
    <div className="me-2 d-flex align-items-center">
      <span
        spellCheck={false}
        ref={locationRef}
        onInput={(event) =>
          onInput_Autofill(
            event,
            locationSuggestions,
            unsavedChanges,
            setUnsavedChanges,
            setFilteredlocationSuggestions
          )
        }
        onKeyDown={(event) =>
          onKeyDown_Autofill(
            event,
            setSelectedIndex,
            locationSuggestions,
            selectedIndex,
            filteredlocationSuggestions,
            unsavedChanges,
            setUnsavedChanges,
            setFilteredlocationSuggestions
          )
        }
        contentEditable={true}
        suppressContentEditableWarning={true}
        className="d-inline editable-content location m-0 p-0"
      >
        {location}
      </span>
      <span className="d-inline location m-0 p-0 autofill-light readonly">
        {" "}
        {filteredlocationSuggestions[selectedIndex]}
      </span>
    </div>
  );
};

export default Location;
