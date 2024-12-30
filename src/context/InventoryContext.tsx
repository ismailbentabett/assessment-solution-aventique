import React, { createContext, useContext, useState, useCallback } from "react";
import * as api from "../services/api";
import { InventoryContextType, InventoryItem } from "../types/inventory";

// ORIGINAL ISSUE: No global state management was implemented.
// FIXED: Implemented React Context for global state management.

const InventoryContext = createContext<InventoryContextType | undefined>(
  undefined
);

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useInventory must be used within an InventoryProvider");
  }
  return context;
};

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ORIGINAL ISSUE: No proper error handling or loading states.
  // FIXED: Implemented error handling and loading states for all API calls.

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedItems = await api.fetchInventoryItems();
      setItems(fetchedItems);
    } catch {
      setError("Failed to fetch inventory items. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const orderItem = useCallback(
    async (item: InventoryItem) => {
      setLoading(true);
      setError(null);
      try {
        await api.orderItem(item);
        await fetchItems();
      } catch {
        setError("Failed to order item. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [fetchItems]
  );

  const cancelOrder = useCallback(
    async (item: InventoryItem) => {
      setLoading(true);
      setError(null);
      try {
        await api.cancelOrder(item);
        await fetchItems();
      } catch {
        setError("Failed to cancel order. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [fetchItems]
  );

  const claimItem = useCallback(
    async (item: InventoryItem) => {
      setLoading(true);
      setError(null);
      try {
        await api.claimItem(item);
        await fetchItems();
      } catch {
        setError("Failed to claim item. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [fetchItems]
  );

  const value: InventoryContextType = {
    items,
    loading,
    error,
    fetchItems,
    orderItem,
    cancelOrder,
    claimItem,
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};
