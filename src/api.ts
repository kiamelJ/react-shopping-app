import axios from 'axios';

// Den här const behöver nu vara exporterad så den nås från 'ShoppingList.tsx' för att uppdatera db. 'export' gör precis som det låter, den exporterar
// ut deklarationen (behöver inte vara en const, kan vara annat också) och så kan man importera den i andra filer och då använder du exakt det namnet,
// går ej att sätta annat namn som man kan vid en default export.
export const api = axios.create({
    baseURL: 'https://mjshoppingappapi-adapemdugdf3cuhb.swedencentral-01.azurewebsites.net/api', // CS to Azure API
    // baseURL: 'https://localhost:7158/api', // CS to local api
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

export const updateItem = async (id: string, updatedItem: Omit<ShoppingItem, 'id'>): Promise<ShoppingItem> => {
  const response = await api.put(`/shoppingitems/${id}`, updatedItem);
  console.log('API response for updateItem:', response.data); // Debug log
  return response.data; // Ensure this contains the full item object
};

export const deleteItem = async (id: string): Promise<void> => {
    await api.delete(`/shoppingitems/${id}`);
};

export const updateOrder = async (reorderedItems: ShoppingItem[]): Promise<void> => {
    console.log('Calling updateOrder with:', reorderedItems); // Debug log
    await api.put('/shoppingitems/updateOrder', reorderedItems);
};