import React from 'react';
import { ListItem, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ShoppingItem } from '../api';

interface ShoppingItemProps {
  item: ShoppingItem;
  editItem: (id: string, item: Omit<ShoppingItem, 'id'>) => void;
  removeItem: (id: string) => void;
}

const ShoppingItemComponent: React.FC<ShoppingItemProps> = ({
  item,
  editItem,
  removeItem,
}) => {
  console.log('Rendering item:', item); // Log the item being rendered

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

  const handleRemove = () => {
    removeItem(item.id);
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
        <span>{item.name}</span> {/* Ensure this renders correctly */}
        <Box>
          <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleRemove}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </ListItem>
  );
};

export default ShoppingItemComponent;
