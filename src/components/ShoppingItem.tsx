import React from 'react';
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
      editItem(item.id, { name: updatedName, isComplete: item.isComplete });
    }
  };

  return (
    <li>
      {item.name}
      <button onClick={handleEdit}>Edit</button>
      <button onClick={() => removeItem(item.id)}>Delete</button>
    </li>
  );
};

export default ShoppingItemComponent;
