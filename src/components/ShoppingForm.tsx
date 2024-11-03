import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { ShoppingItem } from '../api';

interface ShoppingFormProps {
  addItem: (item: Omit<ShoppingItem, 'id'>) => void;
  items: ShoppingItem[];
}

const ShoppingForm: React.FC<ShoppingFormProps> = ({ addItem, items }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    addItem({ name, isComplete: false, position: items.length });
    setName('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <TextField
        label='Lägg till vara'
        variant='outlined'
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: '10px', flexGrow: 1 }}
      />
      <Button
        variant='contained'
        sx={{
          backgroundColor: '#3CB371',
          color: '#fff',
          '&:hover': { backgroundColor: '#2E8B57' },
          width: '160px',
          height: '56px',
        }}
        type='submit'
      >
        Lägg till
      </Button>
    </form>
  );
};

export default ShoppingForm;
