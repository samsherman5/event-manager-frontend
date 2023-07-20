

const Title = ({tagline, taglineRef, unsavedChanges, setUnsavedChanges}) => {

    // unsaved changes & hit enter to stop typing
    function handleKeyDown(event) {
        if (!unsavedChanges){
            setUnsavedChanges(true);
        }
        if (event.key === "Enter") {
            event.preventDefault();
            event.target.blur(); 
        }
    }

    return (
        <div className='d-flex align-items-center'>
            <span 
                spellCheck={false}
                ref={taglineRef}
                onKeyDown={handleKeyDown}
                contentEditable={true} 
                suppressContentEditableWarning={true} 
                className="d-inline editable-content h5 m-0 p-0"
            >
                {tagline}
            </span>
        </div>
    );
}

export default Title;    