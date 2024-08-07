import axios from 'axios';

const api = axios.create({
    //  baseURL: 'https://mjshoppingappapi-adapemdugdf3cuhb.swedencentral-01.azurewebsites.net/api',
    baseURL: 'https://localhost:7158/api',
});

export interface ShoppingItem {
    id: string;
    name: string;
    isComplete: boolean;
    position: number;
}

export interface ShoppingItemDTO {
    name: string;
    isComplete: boolean;
    position: number;
}

export const fetchItems = async (): Promise<ShoppingItem[]> => {
    const response = await api.get<ShoppingItem[]>('/shoppingitems');
    return response.data;
};

export const createItem = async (item: ShoppingItemDTO): Promise<ShoppingItem> => {
    const response = await api.post<ShoppingItem>('/shoppingitems', item);
    return response.data;
};

export const updateItem = async (id: string, item: ShoppingItemDTO): Promise<ShoppingItem> => {
    console.log('Calling updateItem with:', id, item); // Debug log
    const response = await api.put<ShoppingItem>(`/shoppingitems/${id}`, item);
    return response.data;
};

export const deleteItem = async (id: string): Promise<void> => {
    await api.delete(`/shoppingitems/${id}`);
};

export const updateOrder = async (reorderedItems: ShoppingItem[]): Promise<void> => {
    console.log('Calling updateOrder with:', reorderedItems); // Debug log
    await api.put('/shoppingitems/updateOrder', reorderedItems);
};