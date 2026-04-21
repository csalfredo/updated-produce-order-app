import React, { useState } from 'react';
import { MenuItem, Select, TextField, Menu, Button} from '@mui/material';
import {styled } from "@mui/material/styles"
import { useProduce } from '../src/components/context/ProduceContext';

const CustomMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    maxHeight: '75%', // Adjust the value to set the desired height
    overflowY:'auto',
  },
}));


const QuantitySelector = ({ onQuantityChange, removeItem,index,id,produceItems,outStock,toggleCustomQty }) => {
  const [quantity, setQuantity] = useState('');
  const [isCustomQuantity, setIsCustomQuantity] = useState(false);
  const [customQty, setCustomQty]=useState(false)
  const { updateProduceList, userCurrentOrder, updateUserOrder, updateTotalBalance, totalBalance } = useProduce();

  console.log("outStock is ", outStock)

  // const toggleCustomQty=()=>{
  //   setCustomQty(!customQty)
  // }

  const handleQuantityChange = (event) => {
    const value = event.target.value;

    console.log("value is ", value)

    // //TODO:THIS INDICATES IF 
    // updateQntySelector();
    
    if (value === '10+') {
      toggleCustomQty()
      setIsCustomQuantity(true);
      setQuantity('');
      onQuantityChange('',index,id); // Notify parent of empty selection
    } else if(value===0){
        removeItem(index)
    }
    else {
      setIsCustomQuantity(false);
      setQuantity(value);
      onQuantityChange(value,index,id); // Notify parent of the selected quantity
    }
  };

  const handleCustomQuantityChange = (event) => {
    const value = event.target.value;

    console.log(value)

    setQuantity(value);
    // setIsCustomQuantity(false)
    onQuantityChange(value,index,id); // Notify parent of the custom quantity
  };

  const getValue=()=>{
    console.log("index is ", index)

    return produceItems[index].Qty
  }

  // const updateQty=()=>{
  //   toggleCustomQty()
  // }

  return (
    <div className='flex justify-center items-center'>

      {console.log("quantity is ", quantity.length)}

      {outStock===false ? <p className='text-orange-500 font-bold text-sm'>OUT OF STOCK</p> 
        : 
        !isCustomQuantity ? (
        <Select
          value={quantity.length===0 ? getValue() : quantity}
          onChange={handleQuantityChange}
          displayEmpty
          sx={{background: '#E8E8E8',width: "100%", height: "45px", lineHeight: 'normal'}}
          className="border border-gray-300 rounded"
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: '75%', // Set the desired max height
                overflowY: 'auto',
              },
            },
          }}
        >
          <MenuItem key={0} value={0}>0(DELETE)</MenuItem>
          {/* {[...Array(10).keys()].map((num) => (
            <MenuItem key={num} value={num}>{num}</MenuItem>
          ))} */}
          {Array.from({ length: 9}, (_, index)=>index+1).map((num)=>(
            <MenuItem key={num} value={num}>{num}</MenuItem>
          ))}
          <MenuItem value="10+">10+</MenuItem>
        </Select>
      ) : (
          <TextField
            value={quantity}
            onChange={handleCustomQuantityChange}
            placeholder="Qty"
            className="border border-gray-300 rounded"
            sx={{
              width:"80%",
              fontSize: '1.20rem',
            
            }}
        />
      )}
      {console.log("customQty is ", customQty)}
      {/* <div className='ml-2'>
        {customQty===true &&
          <Button onClick={updateQty} className='text-black bg-yellow-500 rounded-xl text-sm/[14px] hover:bg-yellow-600'>UPDATE</Button>
        }
      </div> */}
    </div>
  );
};

export default QuantitySelector;