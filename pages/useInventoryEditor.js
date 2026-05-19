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

const handleEdit = (item) => {
    if (!item) return;
    console.log('Editing item:', item.id);
    setOpen(true);
    setEditingItem(item);
    setEditingId(item.id);
    setEditCaseCost(String(item.case_cost ?? ''));
    setEditPromoPrice(String(item.promo_price ?? ''));
    setEditQuantity(String(item.quantity ?? ''));
    setInventoryUpdated(true);
    console.log("testing ....")
  };
  
  const resetEditForm = () => {
    setEditingId(null);
    setEditCaseCost('');
    setEditPromoPrice('');
    setEditQuantity('');
  };

  const handleCancelEdit = () => {
    resetEditForm();
    setInventoryUpdated(false);
  };

  const handleSaveItem = async (item) => {
    const cost = parseFloat(editCaseCost);
    const promo = parseFloat(editPromoPrice);
    const quantity = parseInt(editQuantity);
    if (Number.isNaN(cost) || Number.isNaN(promo) || Number.isNaN(quantity)) {
      return;
    }
    setProduceItems((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, case_cost: cost, promo_price: promo, quantity: quantity } : i
      )
    );
    resetEditForm();

    const response = await produceAPI.updateItemById(item.id, {
      case_cost: cost,
      promo_price: promo,
      quantity: quantity
    });
    console.log('Updated item:', response.data);
    showInventoryNotification('Inventory item updated successfully.');
    setInventoryUpdated(true);
  };

  const handleDeleteItem = async (item) => {
    const response = await produceAPI.deleteItemById(item.id);
    console.log('Deleted item:', response.data);
    setProduceItems((prev) => prev.filter((i) => i.id !== item.id));
    showInventoryNotification('Inventory item deleted successfully.');
    setInventoryUpdated(true);
  };


  return {
    editingId,
    editCaseCost,
    setEditCaseCost,
    editPromoPrice,
    setEditPromoPrice,
    editQuantity,
    setEditQuantity,
    handleEdit,
    handleCancelEdit,
    handleSaveItem,
    open,
    setOpen,
    editingItem,
    setEditingItem,
    handleDeleteItem,
  };
}