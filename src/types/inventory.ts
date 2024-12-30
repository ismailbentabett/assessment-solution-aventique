// ORIGINAL ISSUE: The initial interface was incomplete and didn't match the API response structure.
// FIXED: Created a comprehensive InventoryItem interface that matches the API response.
export interface InventoryItem {
  quantite: number;
  title: string;
  commentaire: string | null;
  couleur: string | null;
  materiaux: string[];
}

// ORIGINAL ISSUE: There was no proper state management or context.
// FIXED: Created a context type to manage global state and actions.
export interface InventoryContextType {
  items: InventoryItem[];
  loading: boolean;
  error: string | null;
  fetchItems: () => Promise<void>;
  orderItem: (item: InventoryItem) => Promise<void>;
  cancelOrder: (item: InventoryItem) => Promise<void>;
  claimItem: (item: InventoryItem) => Promise<void>;
}