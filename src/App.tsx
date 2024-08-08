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
      console.log('Items fetched from API:', itemsFromServer); // Debug log
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
      console.log('Editing item with id:', id, updatedItem); // Debug log
      const newItem = await updateItem(id, updatedItem);
      console.log('Updated item received from API:', newItem); // Debug log
      setItems((prevItems) => {
        const updatedItems = prevItems.map((item) =>
          item.id === id ? newItem : item
        );
        console.log('Items after edit:', updatedItems); // Debug log
        return updatedItems;
      });
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

    const updatedItems = reorderedItems.map((item, index) => ({
      ...item,
      position: index,
    }));

    setItems(updatedItems);
    console.log('Updating order with:', updatedItems); // Debug log
    updateOrder(updatedItems);
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
