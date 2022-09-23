import '../styles/ItemOptions.css';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

function ItemOptions({ menuRef, menuOpen, onOpen, onEdit, onDelete, onUp, onDown }) {
  // ClickHandler to Open and Close Menu
  useEffect(() => {
    function clickHandler(event) {
      if (menuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        onOpen();
      }
    }
    document.addEventListener('click', clickHandler);
    return () => {
      document.removeEventListener('click', clickHandler);
    };
  }, [menuOpen, menuRef, onOpen]);

  // Renders button and conditional menu options
  return (
    <div ref={menuRef} className="menu">
      <button type="button" className="menu-button" onClick={onOpen}>
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </button>
      {menuOpen
        && (
        <div className="list">
          <button className="options" onClick={onUp}>MOVE UP</button>
          <button className="options" onClick={onDown}>MOVE DOWN</button>
          <button className="options" onClick={onEdit}>EDIT</button>
          <button className="options" onClick={onDelete}>DELETE</button>
        </div>
        )}
    </div>
  );
}

export default ItemOptions;
