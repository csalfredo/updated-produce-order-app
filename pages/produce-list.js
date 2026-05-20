// pages/produce-list.js
import React, {useEffect, useState, useCallback} from 'react';
import { useRouter } from 'next/router';
import { useProduce } from '../src/components/context/ProduceContext';
import { useSwitch } from '@nextui-org/react';
import { Stack, Autocomplete, TextField, Button, MenuItem, Select, accordionSummaryClasses } from "@mui/material"
import Snackbar1 from '@mui/material/Snackbar';
import QuantitySelector from './QuantitySelector';
import SendEmail from './SendEmail';
import axios from 'axios';
import Navbar from '../src/components/Navbar';

const ProduceList = () => {
  const { updateProduceList, userCurrentOrder, updateUserOrder, updateTotalBalance, totalBalance,clearOrder, updateCurrentBalance,toggleSubmitButtonClicked,submitButtonClicked} = useProduce();
  const router = useRouter();
  // const { order } = router.query;
  const [produceItems, setProduceItems] = useState([])
  const [listItems, setListItems]=useState([])
  const [editIndex, setEditIndex]=useState(null)
  const [qtyIndex, setQtyIndex]=useState(null)
  const [value, setValue]=useState('')
  const [valueQty, setValueQty]=useState(null)
  const [editButtonIndex, setEditButtonIndex]=useState(null)
  const [deleteButtonIndex, setDeleteButtonIndex]=useState(null)
  const [isDisabled, setIsDisabled]=useState(false)
  const [quantity, setQuantity]=useState('')
  const [isCustomQuantity,setIsCustomQuantity]=useState(false)
  const [selectedQuantity, setSelectedQuantity] = useState('')
  const [submitButton, setSubmitButton]=useState(false)
  const [error, setError]=useState(null)
  const [customQty, setCustomQty]=useState(false)

  // Cart lives in ProduceContext — no URL query handoff
  useEffect(() => {
    if (!router.isReady) return;
    if (userCurrentOrder.length === 0) {
      router.replace('/produceorder');
    }
  }, [router.isReady, userCurrentOrder.length, router]);

  const toggleCustomQty=()=>{
    setCustomQty(!customQty)
  }

  const updateQty=()=>{
    toggleCustomQty()
  }

  const toggleSubmitButton=()=>{
    setSubmitButton(!submitButton)

  }

  const handleQuantityChange = (quantity,index,id) => {
    // setSelectedQuantity(quantity);
    console.log('Selected Quantity:', quantity, ",and index is ", index);

    // produceItems[index].Qty=quantity

    console.log("quantity is ", quantity, ",and is ", id)

    const updatedOrder = userCurrentOrder.map(item =>
      item.id === id ? { ...item, Qty: Number(quantity) } : item
    );
    updateUserOrder(updatedOrder);

    // produceItems[index].Qty=quantity

    userCurrentOrder[index].Qty=quantity
  }

  const handleQtyChange=(qty,Q,index,id)=>{

    console.log("qty is ", qty, ", index is ", index, ",and id is ", id)

    if (qty.length===0) {
      const updatedOrder = userCurrentOrder.map(item =>
        item.id === id ? { ...item, Qty: Number(quantity) } : item
      );
      updateUserOrder(updatedOrder);
  
      // produceItems[index].Qty=quantity
  
      userCurrentOrder[index].Qty=quantity
    }
    else{
      setQuantity(qty);
    }


  }
  const removeOutStocks=()=>{
    let index=0
    let tempValue=''
    let currentID=0

    console.log(listItems)

    while (listItems.length > index) {
      tempValue=listItems[index].stock
      if (tempValue===false) {
        console.log("For this produceItem ", listItems[index].name, " with the id of ", listItems[index].id, ", the stock is out")
        currentID=listItems[index].id
        setListItems(prevItems=>prevItems.filter(item=>item.id !== currentID))
      }
      index++
    }//end of while loop


  }

  const getQuantity=()=>{
    let index=0;
    let currentQuantity=0;


    while (produceItems.length > index) {
      if (produceItems[index].stock !==false) {
          quantityItems[index]=produceItems[index].Qty;
      }
      else{
        quantityItems[index]=0
      }

      index++;
    }//end of while loop

  }

  const getTotalQuantity=()=>{
    // return userCurrentOrder.reduce((total, item) => {
    //   return total + Number(item.Qty || 0);
    // }, 0);
    //TODO:FIRST ASSGIN TOTAL TO ZERO
    let total=0;
    let index=0;
    //TODO:SECOND CHECK IT THE ITEM IS NOT OUT OF STOCK  
    while(userCurrentOrder.length > index){
      //TODO:THIRD IF NOT OUT OF STOCK, THENASSIGN TOTAL TO THE SUM OF THE QUANTITY(total=INT(total)+INT(item.Qty))
      if(userCurrentOrder[index].stock !==false){
        total=total+Number(userCurrentOrder[index].Qty)
      }
      index++;
    }//end of while loop
    //TODO:FOURTH RETURN THE TOTAL
    return total;
  }

  const getTotal = useCallback(() => {
    return userCurrentOrder.reduce((sum, item) => {
      if (item.stock === false) {
        return sum;
      }
      const price = item.promo_price > 0 ? item.promo_price : item.case_cost;
      return sum + price * Number(item.Qty);
    }, 0).toFixed(2);
  }, [userCurrentOrder]);

  // Use useEffect to update total balance when needed
  useEffect(() => {
    updateTotalBalance(parseFloat(getTotal()));
  }, [userCurrentOrder, getTotal]);

  const toggleEdit=(index)=>{
    console.log("editButtonIndex is ",editButtonIndex, "index is ", index)
    let tempValue
    setValue('')
    setValueQty('')
    // setQtyIndex(index !== qtyIndex ? index : null)    
    setEditIndex(index !== editIndex ? index : null)
    setEditButtonIndex(index !== editButtonIndex ? index : null)
    setDeleteButtonIndex(index !== deleteButtonIndex ? index : null)
  }

  const setValueUpdateProduce=()=>{

    console.log("Inside value of setValueUpdateProduce is")
  }


  const setValueUpdateQty=(e,row)=>{
 

    setProduceValue(produceItems[row],row)
    setValueQty(e.target.value)
  }

  const setProduceValue=(newValue, id)=>{
    setValue(newValue);
  }

  const getValue=(indexRow)=>{
    let tempValue


    if(produceItems[indexRow] !==null){
          return produceItems[indexRow]
    }

  }

  const clearProgress=(index)=>{
    setQtyIndex(index !== qtyIndex ? index : null)    
    setEditIndex(index !== editIndex ? index : null)
    setEditButtonIndex(index !== editButtonIndex ? index : null)
    setDeleteButtonIndex(index !== deleteButtonIndex ? index : null)
  }

  const getQtyValue=(index)=>{
    if (produceItems[index] !==null) {
      return produceItems[index].Qty
    }
  }

  const updateData=(index)=>{

    
    //TODO:GET THE PRODUCE NAME FROM THE NEW VALUE
    let updateProduceName = value.name

    //TODO:USING THE INDEX VALUE REPLACE THE CURRENT PRODUCE NAME WITH THE VALUE OF THE NEW NAME
    produceItems[index].name=updateProduceName
    produceItems[index].id=value.id
    produceItems[index].case_cost=value.case_cost
    produceItems[index].inventory=value.inventory
    produceItems[index].promo_price=value.promo_price
    produceItems[index].case_size=value.case_size
    produceItems[index].product_code=value.product_code
    produceItems[index].stock=value.stock
    produceItems[index].Qty=valueQty


    toggleEdit(index)
  
  }

  const deleteRecord=(index)=>{
    let tempID=produceItems[index].id

    // setProduceItems(prevItems=>prevItems.filter(item=>item.id !== tempID))
    updateUserOrder(prevItems=>prevItems.filter(item=>item.id !== tempID))

  }

  const handleDelete = (index) => {
    const tempID = userCurrentOrder[index]?.id;
    if (tempID == null) return;
    updateUserOrder(userCurrentOrder.filter((item) => item.id !== tempID));
  };

  const handleClose3 = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    toggleSubmitButton();
  }

  const submitOrder = async () => {
    try {
      if (!userCurrentOrder?.length) {
        setError('Cannot submit empty order');
        setSubmitButton(true);
        return;
      }

      // Add a check in produce-list.js before submitting order
      async function checkAuthentication() {
        try {
          const response = await axios.get('/api/check-auth');
          console.log('Authentication status:', response.data);
          return response.data.authenticated;
        } catch (error) {
          console.error('Authentication check failed:', error);
          return false;
        }
      }

      // Call this before submitting the order
      const isAuthenticated = await checkAuthentication();
      if (!isAuthenticated) {
        setError('You must be logged in to submit an order');
        // router.push('/login');
        // return;
      }
      
      const items = userCurrentOrder
        .filter((item) => item.stock !== false)
        .map((item) => ({
          name: item.name,
          quantity: Number(item.Qty),
          case_cost: item.case_cost,
          promo: item.promo_price || 0,
          total:
            item.promo_price > 0
              ? item.promo_price * Number(item.Qty)
              : item.case_cost * Number(item.Qty),
        }));

      if (!items.length) {
        setError('No in-stock items to submit');
        setSubmitButton(true);
        return;
      }

      // Create a temporary solution - using a NextJS API route
      // Create a new file: pages/api/proxy-order.js that will forward your request
      const response = await axios.post('/api/proxy-order', { items });

      setError(null);
      toggleSubmitButton();
      
      // Handle successful order
      setTimeout(() => {
        clearOrder();
        toggleSubmitButton();
        router.push('/produceorder');
      }, 2000);
      
    } catch (error) {
      console.error('Order submission error:', error);
      setError(error.response?.data?.message || 'Failed to send order');
      setSubmitButton(true);
    }
  };

  const mainPage = () => {
    router.push('/produceorder');
  };

  if (router.isReady && userCurrentOrder.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-green-50">
      <Navbar title="Review order" />

      <main id="main-content" className="max-w-3xl container mx-auto px-4 py-4 mt-4" role="main">
        <p className="text-xs text-gray-500 mb-3">
          Adjust quantities below, then submit. Out-of-stock lines cannot be submitted.
        </p>
        <div className="mb-4 bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded">
              <span className="text-gray-600">Total quantity</span>
              <span className="text-lg font-semibold">{getTotalQuantity()}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded">
              <span className="text-gray-600">Total amount</span>
              <span className="text-lg font-semibold">${getTotal()}</span>
            </div>
          </div>
        </div>

        {/* Order Items List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="divide-y divide-gray-100">
            {userCurrentOrder.map((item, index) => (
              <div key={item.id} 
                className={`p-3 hover:bg-gray-50 transition-colors
                  ${item.stock === false ? 'opacity-75 bg-gray-50' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0 mr-4">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-medium capitalize truncate">{item.name}</h3>
                      <div className="text-sm">
                        <span className="font-medium">
                          ${item.promo_price === 0 ? item.case_cost : item.promo_price}
                        </span>
                        {item.promo_price > 0 && (
                          <span className="ml-2 text-green-600 text-xs">
                            (Promo: ${item.promo_price})
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      Case size: {item.case_size}
                    </div>
                    {item.stock === false && (
                      <p className="text-xs text-amber-700 mt-1">
                        Out of stock — remove or change quantity before submitting.
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {item.Qty < 10 ? (
                      <QuantitySelector 
                        onQuantityChange={handleQuantityChange}
                        removeItem={handleDelete}
                        index={index}
                        id={item.id}
                        produceItems={userCurrentOrder}
                        outStock={item.stock}
                        toggleCustomQty={toggleCustomQty}
                        productName={item.name}
                      />
                    ) : (
                      <div className="flex items-center gap-1">
                        <TextField
                          value={quantity.length === 0 ? item.Qty : quantity}
                          onChange={(e) => handleQtyChange(quantity, item.Qty, index, item.id)}
                          size="small"
                          className="w-16"
                          InputProps={{
                            className: "text-center text-sm"
                          }}
                        />
                        {customQty && (
                          <Button 
                            onClick={updateQty}
                            variant="contained"
                            size="small"
                            className="min-w-0 px-2 py-1 bg-yellow-500 hover:bg-yellow-600 text-black"
                          >
                            ✓
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex justify-end gap-3">
          <Button variant="outlined" color="primary" onClick={mainPage}>
            Back to cart
          </Button>
          <Button variant="contained" color="primary" onClick={submitOrder} disabled={submitButton}>
            Submit order
          </Button>
        </div>
      </main>

      {/* Success Snackbar */}
      <Snackbar1
        message={error === null ? 'Order Submitted Successfully' : error}
        autoHideDuration={2000}
        open={submitButton}
        onClose={handleClose3}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: error === null ? 'rgb(45, 212, 191)' : 'rgb(239, 68, 68)',
            color: 'black',
            fontWeight: 'bold',
            borderRadius: '4px',
            padding: '0.75rem',
          },
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'      
        }}      
      />
    </div>
  );
};

export default ProduceList;
