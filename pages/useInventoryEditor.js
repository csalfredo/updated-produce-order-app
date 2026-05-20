import { useState } from 'react';
import {produceAPI} from '../src/components/api';


export default function useInventoryEditor({
  produceItems,
  setProduceItems,
  setInventoryUpdated = () => {},
  showInventoryNotification = () => {},
}) {
  const [editingId, setEditingId] = useState(null);
  const [editCaseCost, setEditCaseCost] = useState('');
  const [editPromoPrice, setEditPromoPrice] = useState('');
  const [editQuantity, setEditQuantity] = useState('');
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  //     setOpen(true);
//     setEditingItem(item);

  // handleEdit, resetEditForm, handleCancelEdit, handleSaveItem go here
//   const handleEdit = (id) => {
//     console.log('Editing item:', id);
//     console.log('Produce items:', produceItems);

//     const item = produceItems.find((i) => i.id === id);
//     if (!item) return;
//     setEditingId(id);
//     setEditCaseCost(String(item.case_cost ?? ''));
//     setEditPromoPrice(String(item.promo_price ?? ''));
//     setEditQuantity(String(item.quantity ?? ''));
//     setInventoryUpdated(true);
//   };

  /** Desktop table: inline row edit only (no drawer). */
  const handleInlineEdit = (item) => {
    if (!item) return;
    setOpen(false);
    setEditingItem(null);
    setEditingId(item.id);
    setEditCaseCost(String(item.case_cost ?? ''));
    setEditPromoPrice(String(item.promo_price ?? ''));
    setEditQuantity(String(item.quantity ?? ''));
  };

  /** Mobile cards: open bottom drawer form. */
  const handleDrawerEdit = (item) => {
    if (!item) return;
    setEditingId(item.id);
    setEditingItem(item);
    setEditCaseCost(String(item.case_cost ?? ''));
    setEditPromoPrice(String(item.promo_price ?? ''));
    setEditQuantity(String(item.quantity ?? ''));
    setOpen(true);
  };

  const resetEditForm = () => {
    setEditingId(null);
    setEditCaseCost('');
    setEditPromoPrice('');
    setEditQuantity('');
    setOpen(false);
    setEditingItem(null);
  };

  const handleCancelEdit = () => {
    resetEditForm();
  };

  const handleSaveItem = async (item) => {
    const cost = parseFloat(editCaseCost);
    const promo = parseFloat(editPromoPrice);
    const quantity = parseInt(editQuantity);
    if (Number.isNaN(cost) || Number.isNaN(promo) || Number.isNaN(quantity)) {
      return;
    }
    const inStock = quantity > 0;
    setProduceItems((prev) =>
      prev.map((i) =>
        i.id === item.id
          ? {
              ...i,
              case_cost: cost,
              promo_price: promo,
              quantity,
              inventory: String(quantity),
              stock: inStock,
            }
          : i
      )
    );
    resetEditForm();
    setOpen(false);
    setEditingItem(null);

    const response = await produceAPI.updateItemById(item.id, {
      case_cost: cost,
      promo_price: promo,
      quantity,
      stock: inStock,
      inventory: String(quantity),
    });
    console.log('Updated item:', response.data);
    showInventoryNotification('Inventory item updated successfully.');
    setInventoryUpdated(true);
  };

  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const requestDeleteItem = (item) => {
    if (item) setItemToDelete(item);
  };

  const cancelDeleteItem = () => {
    if (!deleteLoading) setItemToDelete(null);
  };

  const confirmDeleteItem = async () => {
    if (!itemToDelete) return;
    setDeleteLoading(true);
    try {
      const response = await produceAPI.deleteItemById(itemToDelete.id);
      console.log('Deleted item:', response.data);
      setProduceItems((prev) => prev.filter((i) => i.id !== itemToDelete.id));
      showInventoryNotification('Inventory item deleted successfully.');
      setInventoryUpdated(true);
      setItemToDelete(null);
    } catch (err) {
      showInventoryNotification(
        err.message || 'Failed to delete item.',
        'error',
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  return {
    editingId,
    editCaseCost,
    setEditCaseCost,
    editPromoPrice,
    setEditPromoPrice,
    editQuantity,
    setEditQuantity,
    handleInlineEdit,
    handleDrawerEdit,
    handleCancelEdit,
    handleSaveItem,
    open,
    setOpen,
    editingItem,
    setEditingItem,
    requestDeleteItem,
    itemToDelete,
    cancelDeleteItem,
    confirmDeleteItem,
    deleteLoading,
  };
}