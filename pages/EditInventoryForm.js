import React, { useEffect, useState } from 'react';
import { Alert, Button, Snackbar, TextField } from '@mui/material';
import {produceAPI} from '../src/components/api';

const EditInventoryForm = ({item, handleClose, setInventory_Updated, setNotification}) => {
 


    const [formValues, setFormValues] = useState({
        name: '',
        quantity: '',
        case_cost: '',
        promo_price: '',
    });

    useEffect(() => {
        if (!item) return;

        setFormValues({
            name: item.name ?? '',
            quantity: item.quantity ?? '',
            case_cost: item.case_cost ?? '',
            promo_price: item.promo_price ?? '',
        });
    }, [item]);

    const handleInputChange = (field) => (event) => {
        setFormValues((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };


    console.log('Editing item:', item);


    const handleSaveItem = async (item) => {
        console.log('item is ', item);
    
        console.log('Saving item:', formValues);
     
        const itemId=item.id;
        const cost = parseFloat(formValues.case_cost);
        const promo = parseFloat(formValues.promo_price);
        const quantity = parseInt(formValues.quantity);
        if (Number.isNaN(cost) || Number.isNaN(promo) || Number.isNaN(quantity)) {
          setNotification({
            open: true,
            message: 'Please enter valid numbers for quantity, price, and promo price.',
            severity: 'error',
          });
          return;
        }
        // setProduceItems((prev) =>
        //   prev.map((i) =>
        //     i.id === item.id ? { ...i, case_cost: cost, promo_price: promo, quantity: quantity } : i
        //   )
        // );
        // resetEditForm();
  
        try {
          const response = await produceAPI.updateItemById(itemId, {
            name: formValues.name,
            case_cost: cost,
            promo_price: promo,
            quantity: quantity
          });
          console.log('Updated item:', response.data);
          setInventory_Updated((prev) => !prev);
          setNotification({
            open: true,
            message: 'Inventory item updated successfully.',
            severity: 'success',
          });
          handleClose();
        } catch (error) {
          console.error('Error updating inventory item:', error);
          setInventory_Updated((prev) => !prev);
          setNotification({
            open: true,
            message: 'Inventory item was not updated. Please try again.',
            severity: 'error',
          });
        }
      };
  
    return (
        <div className="bg-transparent">
            <div className="w-10/12 flex flex-col items-center justify-center mx-auto bg-white p-4 my-4 rounded-lg">
                <h2 className="text-xl font-bold">Edit Inventory Item</h2>
                <form className="w-full flex flex-col items-center justify-center rounded-lg p-4 gap-4">
                    <div>
                        <div>
                            <p className="text-xs font-medium text-gray-700">Description</p>
                        </div>
                        <TextField variant="outlined" size="small" 
                        value={formValues.name}
                        onChange={handleInputChange('name')}
                        sx={{ 
                            width: 220,
                            '& .MuiInputBase-input': {
                            padding: '6px 8px',
                            fontSize: '0.8rem',
                            textAlign: 'center',
                            },
                            '& .MuiInputLabel-root': {
                            fontSize: '0.8rem',
                            },}} />
                    </div>
                    
                    <div className="flex flex-row items-end justify-center gap-2">
                        <div className="flex flex-col">
                            <p className="text-xs font-medium text-gray-700">Qty</p>
                            <TextField
                                variant="outlined" 
                                size="small" 
                                value={formValues.quantity}
                                onChange={handleInputChange('quantity')}
                                sx={{    width: 40,
                                    '& .MuiInputBase-input': {
                                    padding: '6px 8px',
                                    fontSize: '0.8rem',
                                    textAlign: 'center',
                                    },
                                    '& .MuiInputLabel-root': {
                                    fontSize: '0.8rem',
                                    },}}
                            />
                        </div>

                        <div className="flex flex-col">
                            <p className="text-xs font-medium text-gray-700">Price</p>
                            <TextField
                                variant="outlined"
                                size="small"
                                value={formValues.case_cost}
                                onChange={handleInputChange('case_cost')}
                                sx={{    width: 70,
                                    '& .MuiInputBase-input': {
                                    padding: '6px 8px',
                                    fontSize: '0.8rem',
                                    textAlign: 'center',
                                    },
                                    '& .MuiInputLabel-root': {
                                    fontSize: '0.8rem',
                                    },}}
                                />
                        </div>

                        <div className="flex flex-col">
                            <p className="text-xs font-medium text-gray-700">Promo Price</p>
                            <TextField
                                variant="outlined"
                                size="small"
                                value={formValues.promo_price}
                                onChange={handleInputChange('promo_price')}
                                sx={{    width: 90,
                                    '& .MuiInputBase-input': {
                                    padding: '6px 8px',
                                    fontSize: '0.8rem',
                                    textAlign: 'center',
                                    },
                                    '& .MuiInputLabel-root': {
                                    fontSize: '0.8rem',
                                    },}}
                                />
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <Button
                            onClick={() => handleSaveItem(item)}
                            variant="contained" 
                            sx=
                            {{ width: 215,
                                height: 28,
                                backgroundColor: '#16a34a',
                                fontSize: '0.8rem',
                                color: 'white',
                            }}>
                            Save
                        </Button>
                    </div>
                    <div className="flex justify-center items-center">
                        <Button
                            onClick={handleClose}
                            variant="contained" 
                            sx=
                            {{ width: 215,
                                height: 28,
                                backgroundColor: '#e5e7eb',
                                fontSize: '0.8rem',
                                color: '#374151',
                                '&:hover': {
                                    backgroundColor: '#d1d5db',
                                },
                            }}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>

        </div>

    );
};

export default EditInventoryForm;