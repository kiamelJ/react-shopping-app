import React, { useState, useEffect } from 'react';
import {
  fetchItems,
  createItem,
  updateItem,
  deleteItem,
  ShoppingItem,
} from './api';
import ShoppingList from './components/ShoppingList';
import ShoppingForm from './components/ShoppingForm';
import './App.css';

const App: React.FC = () => {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getItems = async () => {
      const itemsFromServer = await fetchItems();
      setItems(itemsFromServer);
      setLoading(false);
    };
    getItems();
  }, []);

  const addItem = async (item: Omit<ShoppingItem, 'id'>) => {
    const newItem = await createItem(item);
    setItems([...items, newItem]);
  };

  const editItem = async (
    id: number,
    updatedItem: Omit<ShoppingItem, 'id'>
  ) => {
    try {
      const newItem = await updateItem(id, updatedItem);

      setItems(items.map((item) => (item.id === id ? newItem : item)));
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  };

  const removeItem = async (id: number) => {
    try {
      await deleteItem(id);
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  return (
    <div className='App'>
      <h1>Shopping List</h1>
      <ShoppingForm addItem={addItem} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ShoppingList
          items={items}
          editItem={editItem}
          removeItem={removeItem}
        />
      )}
    </div>
  );
};

export default App;
