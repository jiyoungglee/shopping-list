import '../styles/Item.css';
import { useState, useRef, useEffect } from 'react';
import ItemOptions from './ItemOptions';
import EditableItem from './EditableItem';

function Item({ value, removeItem, updateItem, moveUp, moveDown, checkItem }) {
  const [editEnabled, setEditEnabled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const editRef = useRef(null);

  function saveEdit(newText) {
    if (newText.length > 0) {
      updateItem(value.id, newText);
      setEditEnabled(false);
    } else {
      removeItem(value.id);
    }
  }

  function toggleMenu() {
    setMenuOpen((menuOpen) => !menuOpen);
  }

  function onUp() {
    moveUp(value);
    toggleMenu();
  }

  function onDown() {
    moveDown(value);
    toggleMenu();
  }

  function onEdit() {
    setEditEnabled(true);
  }

  useEffect(() => {
    setMenuOpen(false);
  }, [editEnabled]);

  function onCancel() {
    setEditEnabled((editEnabled) => !editEnabled);
  }

  return (
    <div className="line-item">
      <input type="checkbox" name={value.name} value={value.name} checked={value.checked} onChange={() => checkItem(value.id)} />
      <div className="item-content">
        { editEnabled
          ? (
            <EditableItem
              editRef={editRef}
              menuRef={menuRef}
              saveEdit={saveEdit}
              onCancel={onCancel}
              editValue={value.name}
            />
          )
          : <div className="item-label">{value.name}</div>}
      </div>
      <ItemOptions
        menuRef={menuRef}
        menuOpen={menuOpen}
        onOpen={toggleMenu}
        onEdit={onEdit}
        onDelete={() => removeItem(value.id)}
        onUp={onUp}
        onDown={onDown}
      />
    </div>
  );
}

export default Item;
