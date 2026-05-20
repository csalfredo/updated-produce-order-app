import React, { useState } from 'react';
import { MenuItem, Select, TextField } from '@mui/material';
import { useProduce } from '../src/components/context/ProduceContext';

const QuantitySelector = ({
  onQuantityChange,
  removeItem,
  index,
  id,
  produceItems,
  outStock,
  toggleCustomQty,
  productName = 'item',
}) => {
  const [quantity, setQuantity] = useState('');
  const [isCustomQuantity, setIsCustomQuantity] = useState(false);

  const handleQuantityChange = (event) => {
    const value = event.target.value;

    if (value === '10+') {
      toggleCustomQty();
      setIsCustomQuantity(true);
      setQuantity('');
      onQuantityChange('', index, id);
    } else if (value === 0 || value === '0') {
      removeItem(index);
    } else {
      setIsCustomQuantity(false);
      setQuantity(value);
      onQuantityChange(value, index, id);
    }
  };

  const handleCustomQuantityChange = (event) => {
    const value = event.target.value;
    setQuantity(value);
    onQuantityChange(value, index, id);
  };

  const getValue = () => produceItems[index]?.Qty ?? '';

  if (outStock === false) {
    return (
      <p className="text-amber-700 font-medium text-sm" role="status">
        Out of stock
      </p>
    );
  }

  if (!isCustomQuantity) {
    return (
      <Select
        value={quantity.length === 0 ? getValue() : quantity}
        onChange={handleQuantityChange}
        displayEmpty
        inputProps={{
          'aria-label': `Quantity for ${productName}`,
        }}
        sx={{
          background: '#f3f4f6',
          width: '100%',
          minWidth: 88,
          minHeight: 44,
          lineHeight: 'normal',
        }}
        MenuProps={{
          PaperProps: {
            style: { maxHeight: '50%' },
          },
        }}
      >
        <MenuItem value={0} sx={{ minHeight: 44 }}>
          Remove
        </MenuItem>
        {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
          <MenuItem key={num} value={num} sx={{ minHeight: 44 }}>
            {num}
          </MenuItem>
        ))}
        <MenuItem value="10+" sx={{ minHeight: 44 }}>
          10+
        </MenuItem>
      </Select>
    );
  }

  return (
    <TextField
      value={quantity}
      onChange={handleCustomQuantityChange}
      placeholder="Qty"
      type="number"
      inputProps={{
        min: 1,
        'aria-label': `Custom quantity for ${productName}`,
      }}
      sx={{
        width: '100%',
        minWidth: 88,
        '& .MuiInputBase-root': { minHeight: 44 },
      }}
    />
  );
};

export default QuantitySelector;
