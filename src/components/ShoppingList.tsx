import React from 'react';
import { List, Card, CardContent } from '@mui/material';
import ShoppingItemComponent from './ShoppingItem';
import { ShoppingItem } from '../api';
import { Droppable, Draggable } from 'react-beautiful-dnd';

interface ShoppingListProps {
  items: ShoppingItem[];
  editItem: (id: string, item: Omit<ShoppingItem, 'id'>) => void;
  removeItem: (id: string) => void;
  setItems: (items: ShoppingItem[]) => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({
  items,
  editItem,
  removeItem,
  setItems,
}) => {
  return (
    <Card style={{ marginTop: '20px' }}>
      <CardContent>
        <Droppable droppableId='shoppingList'>
          {(provided) => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => {
                console.log('Item ID:', item.id, 'Type:', typeof item.id); // Debug line
                return (
                  <Draggable
                    key={item.id}
                    draggableId={String(item.id)}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ShoppingItemComponent
                          item={item}
                          editItem={editItem}
                          removeItem={removeItem}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </CardContent>
    </Card>
  );
};

export default ShoppingList;
