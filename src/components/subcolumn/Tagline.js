const Tagline = ({
  tagline,
  taglineRef,
  unsavedChanges,
  setUnsavedChanges,
}) => {
  // unsaved changes & hit enter to stop typing
  function handleKeyDown(event) {
    if (!unsavedChanges) {
      setUnsavedChanges(true);
    }
    if (event.key === "Enter") {
      event.preventDefault();
      event.target.blur();
    }
  }

  return (
    <div className="d-flex align-items-center">
      <p
        spellCheck={false}
        ref={taglineRef}
        onKeyDown={handleKeyDown}
        contentEditable={true}
        suppressContentEditableWarning={true}
        className="d-inline editable-content tagline m-0 p-0"
      >
        {tagline}
      </p>
    </div>
  );
};

export default Tagline;
