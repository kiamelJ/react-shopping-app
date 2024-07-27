import axios from 'axios';

 const api = axios.create({
    baseURL: 'https://localhost:7158/api',
 });

 export interface ShoppingItem {
    id: number;
    name: string;
    isComplete: boolean;
    position: number;
 }

 export const fetchItems = async (): Promise<ShoppingItem[]> => {
    const response = await api.get<ShoppingItem[]>('/shoppingitems');
    return response.data;
 };

 export const createItem = async (item: Omit<ShoppingItem, 'id'>): Promise<ShoppingItem> => {
    const response = await api.post<ShoppingItem>('/shoppingitems', item);
    return response.data;
 };

export const updateItem = async (id: number, item: Omit<ShoppingItem, 'id'>): Promise<ShoppingItem> => {
    const response = await api.put<ShoppingItem>(`/shoppingitems/${id}`, { ...item, id });
    return response.data;
};

 export const deleteItem = async (id: number): Promise<void> => {
    const response = await api.delete(`/shoppingitems/${id}`);
    return response.data;
 };

 export const updateOrder = async (reorderedItems: ShoppingItem[]): Promise<void> => {
  await api.put('/shoppingitems/updateOrder', reorderedItems);
};