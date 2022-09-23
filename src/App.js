import './App.css';
import { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import Item from './components/Item';
import NewItem from './components/NewItem';

function App() {
  const [shoppingList, setShoppingList] = useState([]);
  const [addClicked, setAddClicked] = useState(false);

  useEffect(() => {
    function getCurrentList() {
      if (localStorage.getItem('shoppingList') === null) {
        setShoppingList([]);
      } else {
        const currentList = JSON.parse(localStorage.getItem('shoppingList'));
        setShoppingList(currentList);
      }
    }
    getCurrentList();
  }, [shoppingList]);

  // Allows Add Mode
  function toggleButton() {
    setAddClicked((addClicked) => !addClicked);
  }

  // Helper Functions for updating Shopping List
  // Adds new Item to the Shopping List
  function addNewItem(newItem) {
    if (newItem.length > 0) {
      localStorage.setItem('shoppingList', JSON.stringify([...shoppingList, { id: uuid(), name: newItem, checked: false }]));
      toggleButton();
    }
  }

  // Removes Item from Shopping List
  function removeItem(selectedId) {
    const updatedList = shoppingList.filter((item) => item.id !== selectedId);
    localStorage.setItem('shoppingList', JSON.stringify(updatedList));
  }

  // Updates Item Name in Shopping List
  function updateItem(selectedId, newValue) {
    const itemIndex = shoppingList.findIndex((item) => item.id === selectedId);
    shoppingList[itemIndex].name = newValue;
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
  }

  // Moves Item up in Shopping List
  function moveUp(selectedItem) {
    const itemIndex = shoppingList.findIndex((item) => item.id === selectedItem.id);
    const newList = shoppingList.filter((item) => item.id !== selectedItem.id);
    if (itemIndex > 0) {
      newList.splice(itemIndex-1, 0, selectedItem);
      localStorage.setItem('shoppingList', JSON.stringify(newList));
    }
  }

  // Moves Item Down in Shopping List
  function moveDown(selectedItem) {
    const itemIndex = shoppingList.findIndex((item) => item.id === selectedItem.id);
    const newList = shoppingList.filter((item) => item.id !== selectedItem.id);
    if (itemIndex < shoppingList.length - 1) {
      newList.splice(itemIndex + 1, 0, selectedItem);
      localStorage.setItem('shoppingList', JSON.stringify(newList));
    }
  }


  // Updates Item Checked in Shopping List
  function checkItem(selectedId) {
    const itemIndex = shoppingList.findIndex((item) => item.id === selectedId);
    shoppingList[itemIndex].checked = !shoppingList[itemIndex].checked;
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
  }

  return (
    <div>
      <div className="header">Shopping List</div>
      <ul className="shopping-list">
        {shoppingList.map((item) => (
          <Item
            key={item.id}
            value={item}
            removeItem={removeItem}
            updateItem={updateItem}
            moveUp={moveUp}
            moveDown={moveDown}
            checkItem={checkItem}
          />
        ))}
        {addClicked === true && <NewItem onSubmit={addNewItem} />}
      </ul>
      <button className={`new-button ${addClicked ? 'cancel' : ''}`} onClick={toggleButton}>+</button>
    </div>
  );
}

export default App;
