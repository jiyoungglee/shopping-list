import { useState, useEffect } from 'react';
import '../styles/EditableItem.css';

function EditableItem({ editRef, menuRef, saveEdit, onCancel, editValue }) {
  const [newValue, setNewValue] = useState(editValue);

  useEffect(() => {
    function clickHandler(event) {
      if (editRef.current
            && !editRef.current.contains(event.target)
            && !menuRef.current.contains(event.target)
      ) {
        saveEdit(newValue);
      }
    }

    document.addEventListener('click', clickHandler);
    editRef.current.focus();
    return () => document.removeEventListener('click', clickHandler);
  }, [editRef, saveEdit, newValue, menuRef]);

  function handleOnChange(event) {
    setNewValue(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      saveEdit(newValue);
    }
  }

  return (
    <div className="edit-container">
      <input
        ref={editRef}
        className="edit-text"
        type="text"
        value={newValue}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
      />
      <button className="cancel-edit-button" type="button" onClick={onCancel}>X</button>
    </div>
  );
}

export default EditableItem;
