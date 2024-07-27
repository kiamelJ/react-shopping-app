import React from 'react';
import { ListItem, IconButton, Box } from '@mui/material';
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <span>{item.name}</span>
        <Box>
          <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => removeItem(item.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </ListItem>
  );
};

export default ShoppingItemComponent;
