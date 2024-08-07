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
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <TextField
        label='Add Item'
        variant='outlined'
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <Button variant='contained' color='primary' type='submit'>
        Add
      </Button>
    </form>
  );
};

export default ShoppingForm;
