import React from "react";
import { useInventory } from "../context/InventoryContext";
import styles from "./InventoryItem.module.css";
import { InventoryItem } from "../types/inventory";

interface InventoryItemProps {
  item: InventoryItem;
}

export const InventoryItemComponent: React.FC<InventoryItemProps> = ({
  item,
}) => {
  const { orderItem, cancelOrder, claimItem } = useInventory();

  // ORIGINAL ISSUE: The quantity display logic was incorrect.
  // FIXED: Implemented correct logic for displaying quantity information.
  const getQuantityInfo = (quantity: number, title: string): string => {
    return quantity >= 10 ? `${quantity} ${title}` : `Commander le ${title}`;
  };

  return (
    <div className={styles.item}>
      <h2>{item.title}</h2>
      <p>{getQuantityInfo(item.quantite, item.title)}</p>
      {/* ORIGINAL ISSUE: Not all item properties were displayed.
          FIXED: Added display for all available item properties. */}
      {item.commentaire && <p>Commentaire: {item.commentaire}</p>}
      {item.couleur && <p>Couleur: {item.couleur}</p>}
      {item.materiaux.length > 0 && (
        <p>Matériaux: {item.materiaux.join(", ")}</p>
      )}
      <div className={styles.buttonGroup}>
        {/* ORIGINAL ISSUE: Button text didn't match requirements and lacked accessibility.
            FIXED: Updated button text and added aria-labels for accessibility. */}
        <button
          onClick={() => orderItem(item)}
          aria-label={`Commander ${item.title}`}
        >
          Commander
        </button>
        <button
          onClick={() => cancelOrder(item)}
          aria-label={`Annuler la commande de ${item.title}`}
        >
          Annuler
        </button>
        <button
          className={styles.claimButton}
          onClick={() => claimItem(item)}
          aria-label={`Réclamer ${item.title}`}
        >
          Réclamer
        </button>
      </div>
    </div>
  );
};