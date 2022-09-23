import { useEffect, useRef, useState } from 'react';
import '../styles/NewItem.css';

function NewItem({ onSubmit }) {
  const [textValue, setTextValue] = useState('');
  const addRef = useRef(null);

  useEffect(() => {
    function clickHandler(event) {
      if (addRef.current && !addRef.current.contains(event.target)) {
        onSubmit(textValue);
      }
    }

    document.addEventListener('click', clickHandler);
    addRef.current.focus();

    return () => document.removeEventListener('click', clickHandler);
  }, [addRef, onSubmit, textValue]);

  function handleOnChange(event) {
    setTextValue(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      onSubmit(textValue);
    }
  }

  return (
    <div className="line-item">
      <input type="checkbox" />
      <div className="add-form">
        <input
          ref={addRef}
          className="new-input"
          type="text"
          value={textValue}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

export default NewItem;
