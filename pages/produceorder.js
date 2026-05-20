import React from 'react'
import Images from 'next/image'
import { useRouter } from 'next/router';
import {useProduce} from '../src/components/context/ProduceContext'
// import { useProduce } from './context/ProduceContext';
import Responsiveproduceorder from '../src/components/Responsiveproduce'
// import Responsiveproduceorder from '@/components/Responsiveproduceorder'
import { Stack, Autocomplete, TextField, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Alert, Snackbar, Box } from "@mui/material"
import MuiAlert from '@mui/material/Alert'
import trashDelete from "../src/components/images/deleteTrash.png"
import gala_apple from "../src/components/images/gala_apple.png"
import fuji_apple from "../src/components/images/FUJIAPPLE.png"
import honey_crisp from "../src/components/images/honeycrisp.png"
import granny_smith from "../src/components/images/appleGranny.png"
import oranges_navel from "../src/components/images/navel_oranges.png"
import lemons from "../src/components/images/lemons.png"
import limes from "../src/components/images/LIMES.png"
import strawberries from "../src/components/images/strawberries.png"
import bananas from "../src/components/images/BANANAS.png"
import blueberries from "../src/components/images/blueberries.png"
import cabbage from "../src/components/images/cabbage.png"
import cauliflower from "../src/components/images/cauliflower.png"
import green_grapes from "../src/components/images/green_grapes.png"
import raspberries from "../src/components/images/raspberries.png"
import red_grapes from "../src/components/images/red_grapes.png"
import roma from "../src/components/images/roma.png"
import tomato from "../src/components/images/tomato.png"
import watermelon from "../src/components/images/watermelon.png"
import Image from 'next/image';
import { useState, useEffect } from 'react'
import { toggle, user } from '@nextui-org/react'
import Navbar from '../src/components/Navbar';
// import { Search } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import DeleteIcon from '@mui/icons-material/Delete'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import HelpIcon from '@mui/icons-material/Help'
// import ProtectedRoute from '../components/ProtectedRoute';
import { authService } from '../src/components/auth';
// import {  Autocomplete,  AutocompleteSection,  AutocompleteItem} from "@nextui-org/autocomplete";
export default function produceorder() {

  
    // const [produceListItems, setProduceListItems] = useState([{id:0, name:"apple gala", product_code:"110", inventory:"40", case_cost:27.41, case_size:"40 lbs", promo_price:17.49, stock:true, produce_Image: gala_apple, Qty:1,totalBalance:0.00},
    //                         {id:1, name:"apple fuji", product_code:"108", inventory:"20", case_cost:27.41, case_size:"40 lbs", promo_price:0, stock:true, produce_Image: fuji_apple, Qty:1,totalBalance:0.00},
    //                         {id:2, name:"apple honeycrisp", product_code:"111", inventory:"80", case_cost:27.41, case_size:"40 lbs", promo_price:12.49, stock:true, produce_Image: honey_crisp, Qty:1,totalBalance:0.00},
    //                         {id:3, name:"apple granny smith", product_code:"114", inventory:"10", case_cost:49.50, case_size:"40 lbs", promo_price:0, stock:false, produce_Image: granny_smith, Qty:1,totalBalance:0.00},
    //                         {id:4, name:"oranges", product_code:"350", inventory:"22", case_cost:29.41, case_size:"38 lbs", promo_price:0, stock:true, produce_Image: oranges_navel, Qty:1,totalBalance:0.00},
    //                         {id:5, name:"lemons", product_code:"266", inventory:"8", case_cost:11.19, case_size:"75 units", promo_price:0, stock:false, produce_Image: lemons, Qty:1,totalBalance:0.00},
    //                         {id:6, name:"limes", product_code:"278", inventory:"65", case_cost:51.49, case_size:"230 units", promo_price:0, stock:true, produce_Image: limes, Qty:1,totalBalance:0.00},
    //                         {id:7, name:"strawberries", product_code:"266", inventory:"100", case_cost:22.99, case_size:"8 units", promo_price:0, stock:true, produce_Image: strawberries, Qty:1,totalBalance:0.00},
    //                         {id:8, name:"bananas", product_code:"142", inventory:"445", case_cost:40.41, case_size:"40 lbs", promo_price:0, stock:true, produce_Image: bananas, Qty:1,totalBalance:0.00},
    //                         {id:9, name:"blueberries", product_code:"166", inventory:"110", case_cost:21.41, case_size:"10 units", promo_price:11.00, stock:true, produce_Image: blueberries, Qty:1,totalBalance:0.00},
    //                         {id:10, name:"cabbage", product_code:"178", inventory:"12", case_cost:16.00, case_size:"45 lbs", promo_price:0, stock:false, produce_Image: cabbage, Qty:1,totalBalance:0.00},
    //                         {id:11, name:"green grapes", product_code:"248", inventory:"55", case_cost:53.49, case_size:"18 lbs", promo_price:0, stock:true, produce_Image: green_grapes, Qty:1,totalBalance:0.00},
    //                         {id:12, name:"raspberries", product_code:"167", inventory:"10", case_cost:25.99, case_size:"10 unit s", promo_price:0, stock:false, produce_Image: raspberries, Qty:1,totalBalance:0.00},
    //                         {id:13, name:"red grapes", product_code:"250", inventory:"50", case_cost:53.49, case_size:"18 lbs", promo_price:0, stock:true, produce_Image: red_grapes, Qty:1,totalBalance:0.00},
    //                         {id:14, name:"roma", product_code:"482", inventory:"100", case_cost:25.49, case_size:"25 lbs", promo_price:15.00, stock:true, produce_Image: roma, Qty:1,totalBalance:0.00},
    //                         {id:15, name:"tomato", product_code:"478", inventory:"40", case_cost:20.49, case_size:"15 lbs", promo_price:0, stock:true, produce_Image: tomato, Qty:1,totalBalance:0.00},
    //                         {id:16, name:"watermelon", product_code:"304", inventory:"40 bins", case_cost:200.15, case_size:"120 units", promo_price:0, stock:true, produce_Image: watermelon, Qty:1,totalBalance:0.00},
    //                       ]);
    // const [userCurrentOrder, setUserCurrentOrder]=useState([])

  console.log("useProduce is ", useProduce())
  
    const { 
      produceListItems,
      updateProduceList,
      userCurrentOrder = [],
      updateUserOrder, 
      updateTotalBalance,
      totalBalance,
      updateQtyTotal,
      qtyTotal,
      getQty,
      clearOrder,
      updateCurrentBalance, 
      currentBalance,
      toggleSubmitButtonClicked, 
      submitButtonClicked,
      inventoryUpdated,
      refreshProduceCatalog,
      isAdmin,
      setAuthMessage,
    } = useProduce();
    const router = useRouter();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
      const checkAuthStatus = async () => {
        try {
          const isAuthenticated = await authService.checkAuth();
          console.log("Authentication check result:", isAuthenticated); // Debug log
          
          if (isAuthenticated && typeof isAuthenticated === 'object') {
            setLoggedIn(true); // Set to boolean true when we have a valid user object
          } else {
            setLoggedIn(false);
            if (router.pathname !== '/login') {
              setAuthMessage('Your session has expired. Please sign in again.');
              router.push('/login');
            }
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          setLoggedIn(false);
          if (router.pathname !== '/login') {
            setAuthMessage('Your session has expired. Please sign in again.');
            router.push('/login');
          }
        }
      };
  
      checkAuthStatus();
    }, [router.pathname, setAuthMessage]);

    // Fresh catalog when opening the order page (picks up inventory edits)
    useEffect(() => {
      if (loggedIn && router.pathname === '/produceorder') {
        refreshProduceCatalog();
      }
    }, [loggedIn, router.pathname, refreshProduceCatalog]);

    const getAuthStatus = async () => {
      let result;
      try {
        result = await authService.checkAuth();
        console.log('Authentication check result:', result);
        setLoggedIn(!!result);
      } catch (error) {
        console.error('Auth check failed:', error);
        setLoggedIn(false);
      }
      return result;
    };

    useEffect(() => {
      getAuthStatus();
    }, []);

    // useEffect(() => {
    //   checkAuthStatus();
    // }, []);
  
    // const checkAuthStatus = async () => {
    //   try {
    //     const result = await authService.checkAuth();
    //     console.log('Authentication check result:', result);
    //     setIsLoggedIn(!!result);
    //   } catch (error) {
    //     console.error('Auth check failed:', error);
    //     setIsLoggedIn(false);
    //   }
    // };
  
    const [getUpdatedProduceList, setGetUpdatedProduceList]=useState(false)
    const [value, setValue]=useState(null);
    const [valueQty, setValueQty]=useState(1);
    const [isSmallScreen, setIsSmallScreen]=useState(false)
    const [isMediumScreen, setIsMediumScreen]=useState(false)
    const [isLargeScreen, setIsLargeScreen]=useState(false)
    // const [currentBalance, setCurrentBalance]=useState([])
    // const [totalBalance,setTotalBalance]=useState(parseFloat(0.00).toFixed(2))
    const [enterButton, setEnterButton]=useState(false)
    const [produceItems, setProduceItems] = useState([])
    const [open, setOpen]=useState(false)
    const [itemExist, setItemExist]=useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [notification, setNotification] = useState({
      open: false,
      message: '',
      severity: 'success' // can be 'error', 'warning', 'info', 'success'
    });


    let quantityItems=[]
    let total_Balance=[]
    let grand_Total=[]
    let total=0.000
    let totalQ=0

    // useEffect(() => {
    //   console.log("Total balance updated: ", totalBalance);
    // }, [totalBalance]);

    console.log("submitButtonClicked is ", submitButtonClicked)
    if(submitButtonClicked===true){
      updateTotalBalance(0)
      toggleSubmitButtonClicked()
    }


    useEffect(()=>{
      const handleResize=()=>{
        setIsSmallScreen(window.innerWidth < 640)
        
      }


      handleResize()

      window.addEventListener('resize',handleResize)

      return()=>{
        window.removeEventListener('resize', handleResize)
      }

    },[])

    // useEffect(()=>{
    //   if(submitButtonClicked){
    //     updateTotalBalance(0.00)
    //     toggleSubmitButtonClicked()
    //   }
    // },[submitButtonClicked])

    useEffect(() => {
      const handleKeyPress = (e) => {
        if (
          e.key === '/' &&
          e.target.tagName !== 'INPUT' &&
          e.target.tagName !== 'TEXTAREA'
        ) {
          e.preventDefault();
          document.getElementById('product-search-input')?.focus();
        }
        if (e.key === 'Escape') {
          setValue(null);
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
          }
        }
      };

      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    const setProduceValue=(newValue)=>{
      console.log(newValue);

      setValue(newValue);
    }

    const toggleSnackBar=()=>{
      setOpen(!open)
    }

    const toggleSnackBarItemExist=()=>{
      setItemExist(!itemExist)
    }

    const searchItem=(itemName)=>{
      let index=0;
      let match=false;

      while (index < userCurrentOrder.length) {
        if (itemName===userCurrentOrder[index].name) {
          match=true;
          index=userCurrentOrder+1;//TO KICK OUT OF THE LOOP
        }

        index++;

      }//end of while loop

      console.log("match is ", match)

      return match;
    }


    const searchItemExist=(value)=>{
      let found=false;

      // console.log(userCurrentOrder)

      if(userCurrentOrder.length===0){
        found=false;
      }else
      {
        found=searchItem(value.name)
      }

      return found;
    }
    const getCurrentProduceValue = () => {
      if (!value) {
        setNotification({ open: true, message: 'Select a product from the list first.', severity: 'warning' });
        return;
      }

      if (!value.stock) {
        setNotification({ open: true, message: 'This item is out of stock and cannot be added to your order.', severity: 'warning' });
        return;
      }

      const itemExists = userCurrentOrder.some(item => item.id === value.id);
      
      if (itemExists) {
        setNotification({ open: true, message: 'This item is already in your order. Use + / − to change quantity.', severity: 'info' });
        return;
      }

      // If we get here, item is valid and not a duplicate, so add it
      const updatedOrder = [...userCurrentOrder, { ...value, Qty: 1 }];
      updateUserOrder(updatedOrder);
      setValue(null); // Clear the autocomplete after adding
    };

    const findProduceItem=(id)=>{
      let index=0;
      let locationFound;

      console.log(userCurrentOrder)

      while (index < userCurrentOrder.length) {
        if(userCurrentOrder[index].id===id){
          // console.log("FOUND THE ID");
          locationFound=index;
          index=userCurrentOrder.length;
        }
        index++;
      }//end of while loop

      console.log("it was found in location ", locationFound)
      return locationFound;
    }

    const findQtyInUserCurrentOrder=(id)=>{
      let index=0;
      let locationFound;

      while (index < userCurrentOrder.length) {
        if(userCurrentOrder[index].id===id){
          // console.log("FOUND THE ID");
          locationFound=index;
          index=userCurrentOrder.length
        }
        index++;
      }//end of while loop

      // console.log("it was found in location ", locationFound)
      return locationFound;
    }

    const toggleEnterButton=()=>{
      setEnterButton(!enterButton)
    }

    const updateCrrntQty = (qty, caseCost, promoPrice, stock, index, id, produceItemLocation) => {
      let amountTotal;
      let Balance = [...currentBalance];

      // Only calculate if item is in stock
      if (stock) {
        // Use promo price if available, otherwise use case cost
        const price = promoPrice > 0 ? promoPrice : caseCost;
        amountTotal = qty * price;
        Balance[produceItemLocation] = amountTotal;
        
        // Debug logs
        console.log(`Calculating total for item at position ${produceItemLocation}`);
        console.log(`Qty: ${qty}, Price: ${price}, Total: ${amountTotal}`);
        console.log(`Balance array before update:`, Balance);
        
        getTotalBalance(Balance);
      }
    }

    const increaseProduceItem=(e,Quantity, id, case_cost, promoPrice,stock,index)=>{
      let produceItemLocation;
      let currentQty;

      produceItemLocation=findProduceItem(id)
      if (produceItemLocation === undefined) return;

      const cartLine = userCurrentOrder[produceItemLocation];
      const catalogItem = produceListItems.find((p) => p.id === id);
      const available = getAvailableQuantity(catalogItem ?? cartLine);
      currentQty = userCurrentOrder[produceItemLocation].Qty;

      if (currentQty + 1 > available) {
        showCheckoutBlocked(
          `Only ${available} case${available === 1 ? '' : 's'} of ${cartLine.name} available.`,
        );
        return;
      }

      currentQty=currentQty+1
      // console.log(currentQty)
      console.log("produceItemLocation is ", produceItemLocation)
      //TODO:Update Quantity
        const updateItems=[...userCurrentOrder];
        console.log(updateItems)
        updateItems[produceItemLocation].Qty=currentQty;
        // setProduceListItems(updateItems);
        const updatedOrder = userCurrentOrder.map(item =>
          item.id === id ? { ...item, Qty: Number(currentQty) } : item
        );
        updateUserOrder(updatedOrder);
        console.log(updateItems)
        console.log("id is ", id)
        console.log(updateItems[produceItemLocation].Qty)
        // getCurrentBalance(updateItems[produceItemLocation].Qty,case_cost,promoPrice,stock,index,id)
        updateCrrntQty(updateItems[produceItemLocation].Qty,case_cost,promoPrice,stock,index,id,produceItemLocation)
        
    }


    /** Remove this line from the cart (any quantity). Keeps currentBalance in sync with order rows. */
    const removeProduceItem = (e, id) => {
      e.preventDefault();
      const produceItemLocation = findProduceItem(id);
      if (produceItemLocation === undefined) return;
      const newOrder = userCurrentOrder.filter((item) => item.id !== id);
      const newBalance = [...currentBalance];
      newBalance.splice(produceItemLocation, 1);
      updateUserOrder(newOrder);
      updateCurrentBalance(newBalance);
      getTotalBalance(newBalance);
    };

    /** Decrease quantity by 1; at 1, removes the line (same as minus stepper). */
    const decreaseProduceItem = (e, id, case_cost, promoPrice, stock, index) => {
      e.preventDefault();
      const produceItemLocation = findProduceItem(id);
      if (produceItemLocation === undefined) return;

      const currentQty = userCurrentOrder[produceItemLocation].Qty;
      const nextQty = currentQty - 1;

      if (nextQty <= 0) {
        const newOrder = userCurrentOrder.filter((item) => item.id !== id);
        const newBalance = [...currentBalance];
        newBalance.splice(produceItemLocation, 1);
        updateUserOrder(newOrder);
        updateCurrentBalance(newBalance);
        getTotalBalance(newBalance);
        return;
      }

      const updateItems = [...userCurrentOrder];
      updateItems[produceItemLocation].Qty = nextQty;
      const updatedOrder = userCurrentOrder.map((item) =>
        item.id === id ? { ...item, Qty: Number(nextQty) } : item
      );
      updateUserOrder(updatedOrder);
      updateCrrntQty(updateItems[produceItemLocation].Qty, case_cost, promoPrice, stock, index, id, produceItemLocation);
    };
  const getTotalBalance = (Balance) => {
    // Calculate sum using reduce for cleaner code
    const total = Balance.reduce((sum, value) => {
      return sum + (value || 0);
    }, 0);

    console.log("Calculated total balance:", total);
    updateTotalBalance(total);
  }

  const getCurrentBalance=(Qty,caseCost,promoPrice,stock,location,id)=>{

    console.log("Quantity is ", Qty)
    console.log("caseCost is ", caseCost)
    console.log("promoPrice is ", promoPrice)
    console.log("stock is ", stock)
    console.log("location is ", location)
    console.log("currentBalance is ", currentBalance)

    let newAmount;
    let qty;
    let cost;
    let currentValue;
    let Balance=[]
    let currentTotalValue;
    let element=userCurrentOrder.length
    let tempUserCurrentOrder=[...userCurrentOrder]
    let value=tempUserCurrentOrder.pop()

    console.log("value is ", value)

    Balance=[...currentBalance]



  //  location=findProduceItem(id)


    if (value.stock===true)
    {
        if(value.promo_price===0)
        {
          //TODO:STEP1-GET THE CASE COST OF THE ITEM
          cost=value.case_cost
          //TODO:STEP2-GET THE QUANTITY OF THE ITEM
            qty=value.Qty
          //TODO:STEP3-MULTIPLY THE CASE_COST WITH QUANTITY
            newAmount=(qty*cost)
          //TODO:STEP4-INSERT THE RESULT OF STEP 3 INTO BALANCE ARRAY
            Balance[element-1]=newAmount
                // setCurrentBalance([...currentBalance, { ...currentBalance, newAmount }])
              
              // setCurrentBalance([...Balance])
              updateCurrentBalance([...Balance])

          //TODO:STEP6-CALCULATE THE TOTAL BALANCE
          getTotalBalance(Balance)

          console.log("the size of userCurrentOrder is ", element)
          console.log("qty is ", qty, ",and cost is ",cost)
            // console.log("using the caseCost value, and Qty is ", Qty)
            // newAmount=(Qty*caseCost);
            // Balance[location]=newAmount
            // // setCurrentBalance(Balance)
            // currentTotalValue=getTotalBalance(Balance)

        }   
        else{
         
            // console.log("Using the Promo value, and Qty is ", Qty)
            // newAmount=(Qty*promoPrice);
            // console.log("newAmount is ", newAmount)
            // Balance[location]=newAmount
            // console.log(Balance)
            // // setCurrentBalance(Balance)
            // console.log(currentBalance);
            // // setTotalBalance(parseFloat(newAmount).toFixed(2)) 
            // currentTotalValue=getTotalBalance(Balance)
          //TODO:STEP1-GET THE CASE COST OF THE ITEM
          cost=value.promo_price
          //TODO:STEP2-GET THE QUANTITY OF THE ITEM
            qty=value.Qty
          //TODO:STEP3-MULTIPLY THE CASE_COST WITH QUANTITY
            newAmount=(qty*cost)
          //TODO:STEP4-INSERT THE RESULT OF STEP 3 INTO BALANCE ARRAY
            Balance[element-1]=newAmount
                // setCurrentBalance([...currentBalance, { ...currentBalance, newAmount }])
              
              // setCurrentBalance([...Balance])
              updateCurrentBalance([...Balance])

            //TODO:STEP6-CALCULATE THE TOTAL BALANCE
            getTotalBalance(Balance)
        }  
    }
    else{
      console.log("THE ITEM IS OUT OF STOCK")
    }
    
    console.log(currentTotalValue)
    updateTotalBalance(currentTotalValue)
    // //TODO:SET ENTER BUTTON TO FALSE
    toggleEnterButton();
    // console.log("currentTotal is ", totalBalance)

  }

  /** Numeric cases available (DB quantity, else parse inventory display string). */
  const getAvailableQuantity = (item) => {
    if (item?.quantity != null && item.quantity !== '') {
      const n = Number(item.quantity);
      if (Number.isFinite(n)) return n;
    }
    const parsed = parseInt(String(item?.inventory ?? '').replace(/[^\d]/g, ''), 10);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const formatCasesAvailable = (item) => {
    const n = getAvailableQuantity(item);
    return `${n} case${n === 1 ? '' : 's'} available`;
  };

  // Keep dropdown selection and cart lines in sync when the catalog refetches
  useEffect(() => {
    if (!produceListItems.length) return;

    if (value?.id) {
      const fresh = produceListItems.find((p) => p.id === value.id);
      if (
        fresh &&
        (fresh.quantity !== value.quantity ||
          fresh.stock !== value.stock ||
          fresh.inventory !== value.inventory)
      ) {
        setValue(fresh);
      }
    }

    if (!userCurrentOrder.length) return;

    let changed = false;
    const synced = userCurrentOrder.map((cartItem) => {
      const fresh = produceListItems.find((p) => p.id === cartItem.id);
      if (!fresh) return cartItem;
      if (
        cartItem.quantity === fresh.quantity &&
        cartItem.inventory === fresh.inventory &&
        cartItem.stock === fresh.stock &&
        cartItem.case_cost === fresh.case_cost &&
        cartItem.promo_price === fresh.promo_price
      ) {
        return cartItem;
      }
      changed = true;
      return {
        ...cartItem,
        quantity: fresh.quantity,
        inventory: fresh.inventory,
        stock: fresh.stock,
        case_cost: fresh.case_cost,
        promo_price: fresh.promo_price,
      };
    });
    if (changed) updateUserOrder(synced);
  }, [produceListItems, value, userCurrentOrder, updateUserOrder]);

  const getInventoryCheckoutErrors = () => {
    const errors = [];
    for (const cartItem of userCurrentOrder) {
      const catalogItem = produceListItems.find((p) => p.id === cartItem.id);
      const source = catalogItem ?? cartItem;
      const available = getAvailableQuantity(source);
      const requested = Number(cartItem.Qty);

      if (!source.stock) {
        errors.push(`${cartItem.name} is out of stock. Remove it to continue.`);
      } else if (requested > available) {
        errors.push(
          `Only ${available} case${available === 1 ? '' : 's'} of ${cartItem.name} available — you're ordering ${requested}.`,
        );
      }
    }
    return errors;
  };

  const showCheckoutBlocked = (message) => {
    setNotification({ open: true, message, severity: 'warning' });
  };

  const handleCheckoutClick = () => {
    if (!userCurrentOrder.length) {
      showCheckoutBlocked('Add at least one item before checkout.');
      return;
    }
    const inventoryErrors = getInventoryCheckoutErrors();
    if (inventoryErrors.length > 0) {
      showCheckoutBlocked(inventoryErrors[0]);
      return;
    }
    setOpenConfirmDialog(true);
  };

  const handleConfirmOrder = () => {
    if (!userCurrentOrder.length) {
      showCheckoutBlocked('Add at least one item before checkout.');
      return;
    }
    const inventoryErrors = getInventoryCheckoutErrors();
    if (inventoryErrors.length > 0) {
      showCheckoutBlocked(inventoryErrors[0]);
      return;
    }
    router.push('/produce-list');
  };

  const toggleOpen=()=>{
    setOpen(!open)
  }

  const handleClose=(e,reason)=>{
    console.log(e)
    console.log(reason)

    if (reason==='clickaway') {
      return
    }

    toggleOpen()
  }

  const handleClose2 = () => {
    setItemExist(false);
  };

  // Add console.log to debug
  console.log('Current total balance:', totalBalance);
  console.log('Current order:', userCurrentOrder);

  const getUnitPrice = (item) =>
    item.promo_price > 0 ? item.promo_price : item.case_cost;

  const getLineTotal = (item) => {
    if (!item.stock) return 0;
    return getUnitPrice(item) * Number(item.Qty);
  };

  const calculateTotal = () => {
    return userCurrentOrder.reduce((sum, item) => {
      if (!item.stock) return sum;
      return sum + getLineTotal(item);
    }, 0).toFixed(2);
  };

  // Replace toast calls with this function
  const notify = (message, severity = 'success') => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  // Add this handler
  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };

  const getQuantity=()=>{
    let index=0;
    let currentQuantity=0;


    while (userCurrentOrder.length > index) {
      if (userCurrentOrder[index].stock !==false) {
          quantityItems[index]=userCurrentOrder[index].Qty;
      }
      else{
        quantityItems[index]=0
      }

      index++;
    }//end of while loop

  }
  const getTotalQuantity=()=>{
    let index=0
    let tempValue1=0
    let tempValue2=0
    let tempTotalQnty=0



    getQuantity();

    while (quantityItems.length > index) {
      tempValue1=parseInt(quantityItems[index])
      tempTotalQnty=tempValue1+tempValue2
      tempValue2=tempTotalQnty

      index++
    }//end of while loop

    totalQ=tempTotalQnty

    return totalQ
  }

  useEffect(() => {
    console.log("Current balance array:", currentBalance);
    console.log("Total balance:", totalBalance);
  }, [currentBalance, totalBalance]);

  // Update this function to filter duplicate items
  const uniqueProduceItems = React.useMemo(() => {
    // First filter by ID
    const seenIds = new Set();
    const idFiltered = produceListItems.filter(item => {
      if (seenIds.has(item.id)) {
        return false; // Skip duplicates
      }
      seenIds.add(item.id);
      return true;
    });
    
    // Then also filter by name to ensure no duplicate names
    const seenNames = new Set();
    return idFiltered.filter(item => {
      if (seenNames.has(item.name?.toLowerCase())) {
        return false; // Skip items with duplicate names
      }
      seenNames.add(item.name?.toLowerCase());
      return true;
    });
  }, [produceListItems]);

  // Add a debug log to verify the filtered items
  useEffect(() => {
    console.log("Filtered unique produce items:", uniqueProduceItems);
  }, [uniqueProduceItems]);

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-green-50 flex items-center justify-center">
        <p className="text-gray-600">Checking sign-in…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-green-50 w-full">
      <header className="w-full bg-white shadow-sm">
        <Navbar title="Produce Order" />
      </header>

      <main id="main-content" className="container mx-auto pt-4" role="main">
        <div className="max-w-3xl mx-auto px-4 py-3 w-full">
          <div className="flex gap-2 bg-white p-4 rounded-lg shadow-sm w-full">
            <Autocomplete 
              size="small"
              fullWidth
              options={uniqueProduceItems}
              getOptionDisabled={(option) => !option.stock}
              getOptionLabel={(option) => option.name || ''}
              onOpen={() => refreshProduceCatalog()}
              renderOption={(props, option) => {
                const available = getAvailableQuantity(option);
                return (
                <li 
                  {...props} 
                  className="flex items-center py-2 hover:bg-emerald-50 transition-colors duration-150"
                >
                  <div className="w-8 h-8 mr-3 flex-shrink-0">
                    <Image
                      src={option.produce_Image}
                      alt={option.name}
                      width={32}
                      height={32}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium capitalize">{option.name}</div>
                    <div className="text-xs text-gray-500">
                      <span className={available > 0 && available < 20 ? 'text-amber-600 font-medium' : ''}>
                        {formatCasesAvailable(option)}
                      </span>
                      {option.promo_price > 0 && (
                        <span className="ml-2 text-green-600 font-medium">
                          Promo: ${option.promo_price}
                        </span>
                      )}
                    </div>
                  </div>
                  {!option.stock && (
                    <div className="text-xs text-red-600 font-medium px-4"><span>Out of Stock</span></div>
                  )}
                </li>
                );
              }}
              renderInput={(params) => (
                <TextField 
                  {...params}
                  label="Search products"
                  size="small"
                  inputProps={{
                    ...params.inputProps,
                    id: 'product-search-input',
                    'aria-describedby': 'product-search-hint',
                  }}
                />
              )}
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              isOptionEqualToValue={(option, value) => 
                option?.id === value?.id
              }
              loading={isLoading}
              loadingText="Searching..."
            />
            <Button
              variant="contained"
              color="primary"
              onClick={getCurrentProduceValue}
              disabled={!value || (value && !value.stock)}
            >
              Add
            </Button>
          </div>
          <p id="product-search-hint" className="text-xs text-gray-500 mt-2 px-1">
            Search by name, then click Add. Press <kbd className="px-1 py-0.5 bg-gray-100 border border-gray-300 rounded text-[10px]">/</kbd> to focus search · <kbd className="px-1 py-0.5 bg-gray-100 border border-gray-300 rounded text-[10px]">Esc</kbd> to clear.
          </p>
        </div>

        <div className="max-w-3xl mx-auto px-4">
          <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-sm divide-y divide-gray-200 border border-gray-200">
            {userCurrentOrder.length === 0 && (
              <div className="w-full p-10 text-center text-gray-500">
                <ShoppingCartIcon sx={{ fontSize: 48, color: '#9ca3af', mb: 1 }} />
                <p className="font-medium text-gray-700">Your order is empty</p>
                <p className="text-sm mt-1">Search for produce above and click Add to start your order.</p>
              </div>
            )}
            {userCurrentOrder.map((item, index) => {
              const unitPrice = getUnitPrice(item);
              const lineTotal = getLineTotal(item);
              const catalogItem = produceListItems.find((p) => p.id === item.id);
              const available = getAvailableQuantity(catalogItem ?? item);

              return (
              <div
                key={item.id}
                className={`w-full px-3 py-3 sm:px-4 hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-b-0 ${
                  !item.stock ? 'opacity-75 bg-gray-50' : ''
                }`}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <div className="flex gap-3 flex-1 min-w-0">
                    <div className="relative shrink-0 w-16 h-16 flex items-center justify-center">
                      <Image
                        src={item.produce_Image}
                        alt=""
                        width={64}
                        height={64}
                        style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-medium capitalize text-gray-900 leading-tight">
                        {item.name}
                      </h3>
                      {!item.stock && (
                        <p className="text-xs text-red-600 font-medium mt-1">
                          Out of stock — remove or wait for restock
                        </p>
                      )}
                      {item.stock && (
                        <p className={`text-xs mt-0.5 ${item.Qty > available ? 'text-amber-700 font-medium' : 'text-gray-500'}`}>
                          {formatCasesAvailable(catalogItem ?? item)}
                          {item.Qty > available &&
                            ` — you're ordering ${item.Qty}`}
                        </p>
                      )}
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="text-gray-500">Case cost</span>{' '}
                        <span className="font-medium text-gray-900">${item.case_cost}</span>
                        <span className="text-gray-300 mx-1.5">·</span>
                        <span className="text-gray-500">Size</span>{' '}
                        <span className="font-medium text-gray-900">{item.case_size}</span>
                      </p>
                      {item.promo_price > 0 && (
                        <p className="text-sm text-green-700 mt-0.5">
                          <span className="text-green-600">Promo</span>{' '}
                          <span className="font-semibold">${item.promo_price}</span>
                          <span className="text-green-600">/case</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 shrink-0 sm:min-w-[200px]">
                    <div className="text-left sm:text-right">
                      <p className="text-base font-semibold text-gray-900 tabular-nums">
                        ${lineTotal.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500 tabular-nums">
                        {item.Qty} × ${Number(unitPrice).toFixed(2)}
                        {item.promo_price > 0 ? ' promo' : ''}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Box
                        role="group"
                        aria-label={`Quantity for ${item.name}`}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          border: '2px solid',
                          borderColor: 'grey.800',
                          borderRadius: '999px',
                          px: 0.5,
                          minHeight: 44,
                        }}
                      >
                        <Button
                          onClick={(e) =>
                            decreaseProduceItem(
                              e,
                              item.id,
                              item.case_cost,
                              item.promo_price,
                              item.stock,
                              index,
                            )
                          }
                          disabled={!item.stock}
                          aria-label="Decrease quantity"
                          sx={{ minWidth: 40, width: 40, height: 40, p: 0 }}
                        >
                          <RemoveIcon sx={{ fontSize: 18 }} />
                        </Button>
                        <Box
                          component="span"
                          aria-label={`Quantity: ${item.Qty}`}
                          sx={{
                            minWidth: 32,
                            textAlign: 'center',
                            fontSize: 15,
                            fontWeight: 700,
                            color: item.stock ? 'text.primary' : 'text.disabled',
                          }}
                        >
                          {item.Qty}
                        </Box>
                        <Button
                          onClick={(e) =>
                            increaseProduceItem(
                              e,
                              item.Qty,
                              item.id,
                              item.case_cost,
                              item.promo_price,
                              item.stock,
                              index,
                            )
                          }
                          disabled={!item.stock}
                          aria-label="Increase quantity"
                          sx={{ minWidth: 40, width: 40, height: 40, p: 0 }}
                        >
                          <AddIcon sx={{ fontSize: 18 }} />
                        </Button>
                      </Box>

                      <Button
                        onClick={(e) => removeProduceItem(e, item.id)}
                        aria-label={`Remove ${item.name} from order`}
                        color="error"
                        variant="outlined"
                        size="small"
                        startIcon={<DeleteIcon />}
                        sx={{
                          minHeight: 44,
                          display: { xs: 'none', sm: 'inline-flex' },
                          textTransform: 'none',
                        }}
                      >
                        Remove
                      </Button>
                      <IconButton
                        onClick={(e) => removeProduceItem(e, item.id)}
                        aria-label={`Remove ${item.name} from order`}
                        color="error"
                        sx={{
                          minWidth: 44,
                          minHeight: 44,
                          display: { xs: 'inline-flex', sm: 'none' },
                          border: '1px solid',
                          borderColor: 'error.light',
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </div>
                </div>
              </div>
            );
            })}
          </div>

          {/* Order Summary */}
          {userCurrentOrder.length > 0 && (
            <div className="mt-4 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex justify-between items-center">
                <div className="text-lg font-medium text-gray-900">
                  Total: ${calculateTotal()}
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCheckoutClick}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </span>
                  ) : 'Checkout'}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Snackbars */}
        <Snackbar
          open={notification.open}
          autoHideDuration={3000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert 
            onClose={handleCloseNotification} 
            severity={notification.severity}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>

        {/* Confirmation Dialog */}
        <Dialog
          open={openConfirmDialog}
          onClose={() => setOpenConfirmDialog(false)}
          PaperProps={{
            className: 'rounded-lg'
          }}
        >
          <DialogTitle className="bg-gray-50 border-b border-gray-200">
            Confirm Order
          </DialogTitle>
          <DialogContent className="mt-4">
            <div className="space-y-4">
              <p className="text-gray-600">Are you sure you want to place this order?</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Total Items:</span>
                  {/* <span>{userCurrentOrder.length}</span> */}
                  <span>{getTotalQuantity()}</span>
                </div>
                <div className="flex justify-between font-medium text-gray-900 mt-2">
                  <span>Total Amount:</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions className="p-4 bg-gray-50">
            <Button 
              onClick={() => setOpenConfirmDialog(false)}
              variant="outlined"
              className="text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 px-4 py-2 rounded-md"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => {
                setOpenConfirmDialog(false);
                handleConfirmOrder();
              }}
              variant="contained"
              color="primary"
            >
              Continue to review
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    </div>
  );
}