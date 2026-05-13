'use client';
import React, { useState } from 'react';
import { IconButton, Drawer, Snackbar, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditInventoryForm from './EditInventoryForm';

const inventory_card = ({inventoryList, setInventory_Updated}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [editingItem, setEditingItem] = useState(null);
  
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
});


const handleCloseNotification = () => {
    setNotification((prev) => ({
        ...prev,
        open: false,
    }));
};

  const handleEdit = (item) => {
    setOpen(true);
    setEditingItem(item);
    // setInventory_Updated((prev) => !prev);
  };
  return (
    <div className="w-full px-4 py-4 flex justify-center items-center">
        <div className="flex flex-col items-center justify-center gap-4 w-full">
        {inventoryList.map((item) => (
                <div key={item.id} className="bg-white border border-gray-300 flex flex-col rounded-lg w-[275px] px-3 py-4 shadow-sm">
                    <div className="w-full flex flex-row items-start gap-2">
                        <div className="flex justify-start items-start flex-1 min-w-0">
                          <p className="text-base font-semibold leading-snug break-words line-clamp-2">{item.name}</p>
                        </div>
                        <div className="flex justify-end items-center shrink-0 gap-1">
                            <IconButton
                                 variant="contained" 
                                 color="primary"
                                 size="small"
                                 onClick={()=>handleEdit(item)}
                                 >
                                    <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                                 variant="contained" 
                                 color="error"
                                 size="small"
                                 >
                                    <DeleteIcon fontSize="small" />
                            </IconButton>
                        </div>
                    </div>
                    <div className="w-full mt-4 flex flex-col gap-1 text-sm">
                        <div className="flex justify-between items-center gap-2">
                            <p className="font-medium text-gray-700">Case Qty:</p>
                            <span className="text-gray-700">{item.quantity}</span>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <p className="font-medium text-gray-700">Price:</p>
                            <span className="text-gray-700">${item.case_cost}</span>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <p className="font-medium text-gray-700">Promo Price:</p>
                            <span className="font-semibold text-green-600">${item.promo_price}</span>
                        </div>
                    </div>

                </div>
            ))}
        </div>
            <Drawer
                anchor="bottom"
                open={open}
                onClose={handleClose}
                BackdropProps={{
                    sx: { backgroundColor: 'rgba(0, 0, 0, 0.55)' },
                }}
                PaperProps={{
                    sx: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    },
                }}
            >
                <EditInventoryForm 
                    item={editingItem}
                    handleClose={handleClose}
                    setInventory_Updated={setInventory_Updated}
                    setNotification={setNotification}
                />
            </Drawer>
            <Snackbar
                open={notification.open}
                autoHideDuration={3000}
                onClose={handleCloseNotification}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseNotification}
                    severity={notification.severity}
                    sx={{ width: '100%' }}
                >
                    {notification.message}
                </Alert>
            </Snackbar>
    </div>
  );
};

export default inventory_card;