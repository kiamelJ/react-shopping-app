import React from 'react';
import { ListItem, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ShoppingItem } from '../api';

interface ShoppingItemProps {
  item: ShoppingItem;
  editItem: (id: number, item: Omit<ShoppingItem, 'id'>) => void;
  removeItem: (id: number) => void;
}

const ShoppingItemComponent: React.FC<ShoppingItemProps> = ({
  item,
  editItem,
  removeItem,
}) => {
  const handleEdit = () => {
    const updatedName = prompt('Enter new name:', item.name);
    if (updatedName) {
      editItem(item.id, {
        name: updatedName,
        isComplete: item.isComplete,
        position: item.position,
      });
    }
  };

  return (
    <ListItem>
      {item.name}
      <IconButton onClick={handleEdit}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => removeItem(item.id)}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default ShoppingItemComponent;
