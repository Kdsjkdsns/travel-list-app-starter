import React, {useState} from 'react';

// Initial packing items
const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, packed: false },
  { id: 2, description: "Pants", quantity: 2, packed: false },
];

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form() {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  function handleSubmit(e) {
    e.preventDefault();
    setDescription('');
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>

      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
      </select>

      <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Item...' />

      <button>Add</button>
    </form>
  );
}

function Item({item, togglePacked}) {
  return <li
    onClick={() => togglePacked(item.id)}
    style={{textDecoration: item.packed ? 'line-through' : 'none', cursor : 'pointer'}}
    >
      {item.quantity} {item.description}
  </li>
}

function PackingList({items, setItems}) {
  function togglePacked(id) {
    setItems(items.map(item =>
      item.id === id ? { ...item, packed: !item.packed } : item
    ));
  }

  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} togglePacked={togglePacked} />
        ))}
      </ul>
    </div>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items in the list. You already packed Y (Z%).</em>
    </footer>
  );
}

function App() {
  const [items, setItems] = useState(initialItems);

  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList items={items} setItems={setItems}/>
      <Stats />
    </div>
  );
}

export default App;
