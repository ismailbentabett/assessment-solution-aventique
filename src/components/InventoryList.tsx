import React, { useEffect } from 'react';
import { useInventory } from '../context/InventoryContext';
import { InventoryItemComponent } from './InventoryItem';
import styles from './InventoryList.module.css';

export const InventoryList: React.FC = () => {
  const { items, loading, error, fetchItems } = useInventory();

  // ORIGINAL ISSUE: Items were fetched in the main component, mixing concerns.
  // FIXED: Moved fetching logic to a separate effect in a dedicated list component.
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // ORIGINAL ISSUE: No loading or error states were displayed.
  // FIXED: Added loading and error state handling.
  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div className={styles.list}>
      <h1>Inventaire</h1>
      {/* ORIGINAL ISSUE: Items were rendered directly in the main component.
          FIXED: Separated item rendering into a dedicated InventoryItemComponent. */}
      {items.map((item) => (
        <InventoryItemComponent key={item.title} item={item} />
      ))}
    </div>
  );
};