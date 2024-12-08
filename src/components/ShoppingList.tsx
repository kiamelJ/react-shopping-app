import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { List, Card, CardContent } from '@mui/material';
import ShoppingItemComponent from './ShoppingItem';
import { ShoppingItem, api } from '../api';

interface ShoppingListProps {
  items: ShoppingItem[];
  setItems: React.Dispatch<React.SetStateAction<ShoppingItem[]>>;
  editItem: (id: string, item: Omit<ShoppingItem, 'id'>) => void;
  removeItem: (id: string) => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({
  items,
  setItems,
  editItem,
  removeItem,
}) => {
  const handleOnDragEnd = async (result: any) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    // Update the list order in state
    setItems(reorderedItems);

    // Add updated positions to items and send to backend. Här är koden som jag missade första gången för att korrekt göra uppdatering i databasen.
    const itemsWithPositions = reorderedItems.map((item, index) => ({
      ...item,
      position: index, // Add the position field
    }));

    try {
      await api.put('/shoppingitems/updateOrder', itemsWithPositions);
      console.log('Order updated successfully');
    } catch (error) {
      console.error('Failed to update order', error);
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Card style={{ marginTop: '20px', boxShadow: 'none', border: 'none' }}>
        <CardContent style={{ padding: 0 }}>
          <Droppable droppableId='droppable-list'>
            {(provided) => (
              <List {...provided.droppableProps} ref={provided.innerRef}>
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: 'none',
                          padding: 4,
                          margin: '0 0 0 0',
                          backgroundColor: '#ffffff',
                          border: 'none',
                          ...provided.draggableProps.style,
                        }}
                      >
                        <ShoppingItemComponent
                          item={item}
                          editItem={editItem}
                          removeItem={removeItem}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </CardContent>
      </Card>
    </DragDropContext>
  );
};

export default ShoppingList;
