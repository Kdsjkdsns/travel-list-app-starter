import React, {useState} from "react";

const initialItems = [
  {id: 2, description: 'Pants', quantity: 2, packed: false},
  {id: 1, description: 'Shirt', quantity: 5, packed: false},
];

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form({onAddItems}) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };

    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>

      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>

      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Item..."
      />

      <button>Add</button>
    </form>
  );
}

function Item({item, handleDeleteItem, handleUpdateItem}) {
  return (
    <li style={{cursor: "pointer"}}>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => handleUpdateItem(item.id)}
      />
      <span style={{ textDecoration: item.packed ? "line-through" : "none" }}>
        {item.quantity} {item.description}
      </span>
      <button onClick={(e) => {e.stopPropagation(); handleDeleteItem(item.id);}}>❌</button>
    </li>
  );
}

function PackingList({items, handleDeleteItem, handleUpdateItem}) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} handleDeleteItem={handleDeleteItem} handleUpdateItem={handleUpdateItem} /> //Receive
        ))}
      </ul>
    </div>
  );
}

function Stats({items}) {
  if (items.length === 0) {
    return (
      <footer className="stats">
        <em>You have no items in your list.</em>
      </footer>
    );
  }

  const total = items.length;
  const packed = items.filter((item) => item.packed).length;
  const percentage = Math.round((packed / total) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100 ? 'You got everything!' : `You have ${total} items. You packed ${packed} (${percentage}%).`}
      </em>
    </footer>
  );
}

function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleUpdateItem(id) {
    setItems(items.map(item => 
    item.id === id ? { ...item, packed: !item.packed } : item
  )); //toggles the packed property for the item with the matching id
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} handleDeleteItem={handleDeleteItem} handleUpdateItem={handleUpdateItem} />
      <Stats items={items} />
    </div>
  );
}

export default App;