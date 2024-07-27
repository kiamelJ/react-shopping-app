import React from 'react';
import ShoppingItemComponent from './ShoppingItem';
import { ShoppingItem } from '../api';

interface ShoppingListProps {
  items: ShoppingItem[];
  editItem: (id: number, item: Omit<ShoppingItem, 'id'>) => void;
  removeItem: (id: number) => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({
  items,
  editItem,
  removeItem,
}) => {
  return (
    <ul>
      {items.map((item) => (
        <ShoppingItemComponent
          key={item.id} // Ensure the key prop is unique
          item={item}
          editItem={editItem}
          removeItem={removeItem}
        />
      ))}
    </ul>
  );
};

export default ShoppingList;
