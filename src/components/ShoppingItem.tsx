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
    <ListItem
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        padding: '16px',
        margin: '8px 0',
        border: 'none',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.2)', // Light box shadow
        borderRadius: '8px', // Rounded corners for a modern look
        backgroundColor: '#fff',
      }}
    >
      <span>{item.name}</span> {/* Ensure this renders correctly */}
      <Box>
        <IconButton onClick={handleEdit} sx={{ color: '#1E90FF' }}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleRemove} sx={{ color: '#FF0000' }}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </ListItem>
  );
};

export default ShoppingItemComponent;
