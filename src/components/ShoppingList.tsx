import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { List, Card, CardContent } from '@mui/material';
import ShoppingItemComponent from './ShoppingItem';
import { ShoppingItem } from '../api';

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
  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    // Update the list order in state
    // Update the list order in state
    setItems(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Card style={{ marginTop: '20px' }}>
        <CardContent>
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
                          padding: 16,
                          margin: '0 0 8px 0',
                          backgroundColor: '#ffffff',
                          border: '1px solid #ddd',
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
