import React, { useState } from 'react';
import { ShoppingItem } from '../api';

interface ShoppingFormProps {
  addItem: (item: Omit<ShoppingItem, 'id'>) => void;
}

const ShoppingForm: React.FC<ShoppingFormProps> = ({ addItem }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    addItem({ name, isComplete: false });
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Add Item'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type='submit'>Add</button>
    </form>
  );
};

export default ShoppingForm;
