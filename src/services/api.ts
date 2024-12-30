import axios from 'axios';
import { InventoryItem } from '../types/inventory';

const API_BASE_URL = 'https://api-privee';

// ORIGINAL ISSUE: API calls were made directly in the component, mixing concerns.
// FIXED: Separated API calls into a dedicated service file for better organization and reusability.

export const fetchInventoryItems = async (): Promise<InventoryItem[]> => {
  const response = await axios.get<InventoryItem[]>(`${API_BASE_URL}/info`);
  return response.data;
};

export const orderItem = async (item: InventoryItem): Promise<void> => {
  await axios.post(`${API_BASE_URL}/envoyer-commande`, item);
};

export const cancelOrder = async (item: InventoryItem): Promise<void> => {
  await axios.post(`${API_BASE_URL}/cancel-commande`, item);
};

export const claimItem = async (item: InventoryItem): Promise<void> => {
  await axios.post(`${API_BASE_URL}/relance`, item);
};