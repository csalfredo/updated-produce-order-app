import React from 'react'
import Images from 'next/image'
import { useRouter } from 'next/router';
import {useProduce} from '../src/components/context/ProduceContext'
// import { useProduce } from './context/ProduceContext';
import Responsiveproduceorder from '../src/components/Responsiveproduce'
// import Responsiveproduceorder from '@/components/Responsiveproduceorder'
import { Stack, Autocomplete, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Alert, Snackbar } from "@mui/material"
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
import queryString from 'query-string';
import { COOKIE_NAME_PRERENDER_BYPASS } from 'next/dist/server/api-utils';
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
      userCurrentOrder = [], // Add default value
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
      isAdmin,
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
            // Only redirect if we're not already on the login page
            if (router.pathname !== '/login') {
              router.push('/login');
            }
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          setLoggedIn(false);
          if (router.pathname !== '/login') {
            router.push('/login');
          }
        }
      };
  
      checkAuthStatus();
    }, [router.pathname]); // Add router.pathname as dependency

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
        // Press '/' to focus search
        if (e.key === '/' && e.target.tagName !== 'INPUT') {
          e.preventDefault();
          document.querySelector('input[type="text"]').focus();
        }
        // Press 'Escape' to clear search
        if (e.key === 'Escape') {
          setValue(null);
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
    const getCurrentProduceValue = (event) => {
      // Check if value exists and is a valid selection
      if (!value) {
        setOpen(true);
        return;
      }

      // Check if item already exists in order
      const itemExists = userCurrentOrder.some(item => item.id === value.id);
      
      if (itemExists) {
        setItemExist(true);
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
      
      console.log("value is ", value)

      
      //TODO:First find the produce item by using the id
      produceItemLocation=findProduceItem(id)
      //TODO:Get the current value of the Quantity
      currentQty=userCurrentOrder[produceItemLocation].Qty;
      console.log("For id", id, ", and it's Quantity is ", currentQty)
      //TODO:Increase the value of Quantity
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

  const handleConfirmOrder=()=>{
  

    console.log(userCurrentOrder)
    
    console.log(parseFloat(totalBalance).toFixed(2))


        // Convert the order to a query parameter string
        // const query = encodeURIComponent(JSON.stringify(userCurrentOrder));
        const query={
          order: JSON.stringify(userCurrentOrder),
          prdcItmLst: JSON.stringify(produceListItems)
        }

        //TODO:CONVERT THE QUERY OBJECT TO A QUERY STRING
        const queryStringified=queryString.stringify(query)

        console.log(queryStringified)


        router.push(`/produce-list?${queryStringified}`);
  }

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

  const calculateTotal = () => {
    return userCurrentOrder.reduce((sum, item) => {
      // Skip out-of-stock items in total calculation
      if (!item.stock) return sum;
      
      const price = item.promo_price > 0 ? item.promo_price : item.case_cost;
      return sum + (price * item.Qty);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-green-50 w-full">
            {loggedIn ? console.log("User is logged in:", loggedIn) : console.log("User is not logged in:", loggedIn)}
            {console.log("getAuthStatus is ", getAuthStatus())}
            {console.log("isAdmin is ", isAdmin)}
      <header className="w-full bg-white shadow-sm">
        <Navbar title="PRODUCE ORDER" main="Main" />
      </header>

      <main className="container mx-auto pt-16">
        {console.log("inventoryUpdated is ", inventoryUpdated)}
        {/* Search Section */}
        <div className="max-w-3xl mx-auto px-4 py-3 w-full">
          <div className="flex gap-2 bg-white p-4 rounded-lg shadow-sm w-full">
            <Autocomplete 
              size="small"
              fullWidth
              options={uniqueProduceItems}
              getOptionLabel={(option) => option.name || ''}
              renderOption={(props, option) => (
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
                      Inventory: <span className={option.inventory < 20 ? "text-amber-600 font-medium" : ""}>{option.inventory}</span>
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
              )}
              renderInput={(params) => (
                <TextField 
                  {...params}
                  label="Search Products"
                  size="small"
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
              onClick={getCurrentProduceValue}
              disabled={!value}
              className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
            >
              Add
            </Button>
          </div>
        </div>

        {/* Order List */}
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-sm divide-y divide-gray-200 border border-gray-200">
            {userCurrentOrder.map((item, index) => (
              <div 
                key={item.id} 
                className={`w-full p-4 hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-b-0 ${
                  !item.stock ? 'opacity-75 bg-gray-50' : ''
                }`}
              >
                <div className="flex justify-center items-center flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row">
                  <div className="w-22 h-22 relative flex-shrink-0 overflow-hidden">
                    <Image
                      src={item.produce_Image}
                      alt={item.name}
                      width={68}
                      height={68}
                      style={{ 
                        objectFit: 'contain',
                        maxWidth: '100%',
                        maxHeight: '100%'
                      }}
                    />
                  </div>
                  
                  <div className="w-11/12 py-4">
                    <div className="w-full flex items-center justify-between flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row">
                      <div className="w-full py-3 flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row">
                        <div className="w-full py-4 flex flex-row">
                          <div className="px-4">
                            <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">Item:</label>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium capitalize text-gray-900">{item.name}</h3>
                          </div>
                        </div>
                        <div className="flex justify-start items-center">
                          {!item.stock && (
                            <span className="text-xs text-red-600 font-semibold px-4">
                              Out of Stock
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="w-full text-sm mt-0.5">
                        <div>
                          <div className="py-2 px-4">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">Case Cost:</span>
                            <span className="text-sm font-medium text-gray-900"> ${item.case_cost}</span>
                          </div>
                          <div className="px-4 py-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">Case Size:</span>
                            <span className="text-sm font-medium text-gray-900"> {item.case_size}</span>
                          </div>
                        </div>

                        {item.promo_price > 0 && (
                          <div className="py-4 px-4">
                            <span className="text-xs font-semibold uppercase tracking-wide text-green-600">
                              Promo:
                            </span>
                            <span className="text-sm font-medium text-green-700"> ${item.promo_price}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="w-7/12 flex justify-start items-center">
                        <div className="w-6/12 flex justify-start items-center px-4 py-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">Quantity:</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center rounded-full w-[86px] border-2 border-black h-7 px-1">
                          <Button
                            onClick={(e) => decreaseProduceItem(e, item.id, item.case_cost, item.promo_price, item.stock, index)}
                            className="min-w-0"
                            disabled={!item.stock}
                            aria-label="Decrease quantity"
                            sx={{ minWidth: 22, width: 22, height: 24, p: 0 }}
                          >
                            <RemoveIcon className="text-black" sx={{ fontSize: 16 }}/>
                          </Button>
                          <TextField
                            size="small"
                            value={item.Qty}
                            className="flex items-center text-center"
                            disabled={!item.stock}
                            inputProps={{ 'aria-label': 'Quantity' }}
                            InputProps={{
                              readOnly: !item.stock
                            }}
                            sx={{
                              width: 30,
                              '& .MuiInputBase-root': {
                                height: 20,
                                fontSize: 12,
                                borderRadius: '9999px',
                                backgroundColor: 'white'
                              },
                              '& .MuiInputBase-input': {
                                p: '2px 0',
                                textAlign: 'center',
                                color: 'text.primary'
                              },
                              '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none'
                              }
                            }}
                          />
                          <Button
                            onClick={(e) => increaseProduceItem(e, item.Qty, item.id, item.case_cost, item.promo_price, item.stock, index)}
                            className="min-w-0 bg-black"
                            disabled={!item.stock}
                            aria-label="Increase quantity"
                            sx={{ minWidth: 22, width: 22, height: 24, p: 0 }}
                          >
                            <AddIcon className="text-black" sx={{ fontSize: 16 }} />
                          </Button>
                        </div>

                        {/* <Button
                          onClick={(e) => removeProduceItem(e, item.id)}
                          className="min-w-0 p-1"
                          disabled={!item.stock}
                          aria-label="Remove item from cart"
                        >
                          <DeleteIcon className="w-4 h-4 text-red-500" />
                        </Button> */}
                      </div>
                  </div>
                </div>
              </div>
            ))}
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
                  onClick={() => setOpenConfirmDialog(true)}
                  disabled={isLoading}
                  className="bg-[#166534] hover:bg-[#14532d] text-white shadow-sm px-6"
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
              className="bg-[#166534] hover:bg-[#14532d] text-white px-4 py-2 rounded-md"
            >
              Confirm Order
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    </div>
  );
}