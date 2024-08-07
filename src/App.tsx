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
  updateOrder,
} from './api';
import ShoppingList from './components/ShoppingList';
import ShoppingForm from './components/ShoppingForm';
import './styles.css';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

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
    try {
      console.log('Editing item with id:', id); // Debug log
      const newItem = await updateItem(id, updatedItem);
      setItems(items.map((item) => (item.id === id ? newItem : item)));
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  };

  const removeItem = async (id: string) => {
    try {
      await deleteItem(id);
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, reorderedItem);

    reorderedItems.forEach((item, index) => {
      item.position = index;
    });

    setItems(reorderedItems);
    console.log('Updating order with:', reorderedItems); // Debug log
    updateOrder(reorderedItems);
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
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <ShoppingList
                items={items}
                editItem={editItem}
                removeItem={removeItem}
                setItems={setItems}
              />
            </DragDropContext>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default App;
