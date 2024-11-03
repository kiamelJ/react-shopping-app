import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';
import {
  fetchItems,
  createItem,
  updateItem,
  deleteItem,
  ShoppingItem,
} from './api';
import ShoppingList from './components/ShoppingList';
import ShoppingForm from './components/ShoppingForm';
import './styles.css';

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
    id: string,
    updatedItem: Omit<ShoppingItem, 'id'>
  ) => {
    const newItem = await updateItem(id, updatedItem);
    console.log('Updated item from API:', newItem); // Log the updated item
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? newItem : item))
    );
  };

  const removeItem = async (id: string) => {
    await deleteItem(id);
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <Container maxWidth='sm' style={{ marginTop: '20px' }}>
      <Card>
        <CardContent>
          <Typography variant='h4' align='center' gutterBottom>
            Shopping List
          </Typography>
          <ShoppingForm addItem={addItem} items={items} />
          {loading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100px',
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <ShoppingList
              items={items}
              setItems={setItems}
              editItem={editItem}
              removeItem={removeItem}
            />
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default App;
