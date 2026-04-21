// context/ProduceContext.js
import React, { useState, createContext, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import gala_apple from "../images/gala_apple.png"
import fuji_apple from "../images/FUJIAPPLE.png"
import honey_crisp from "../images/honeycrisp.png"
import granny_smith from "../images/appleGranny.png"
import oranges_navel from "../images/navel_oranges.png"
import lemons from "../images/lemons.png"
import limes from "../images/LIMES.png"
import strawberries from "../images/strawberries.png"
import bananas from "../images/BANANAS.png"
import blueberries from "../images/blueberries.png"
import cabbage from "../images/cabbage.png"
import cauliflower from "../images/cauliflower.png"
import green_grapes from "../images/green_grapes.png"
import raspberries from "../images/raspberries.png"
import red_grapes from "../images/red_grapes.png"
import roma from "../images/roma.png"
import tomato from "../images/tomato.png"
import watermelon from "../images/watermelon.png"
import avocado from "../images/AVOCADO.png"
import broccoli from "../images/BROCOLI2.png"
import cilantro from "../images/CILANTRO2.png"
import garlic from "../images/GARLIC.png"
import russet from "../images/RUSSETPOTATO.png"
import whiteOnion from "../images/WHITE_ONION.png"

const ProduceContext = createContext();

/** Module scope so fetch helper can close over a stable map. */
const imageMapping = {
  'gala_apple.jpg': gala_apple,
  'fuji_apple.jpg': fuji_apple,
  'honey_crisp.jpg': honey_crisp,
  'granny_smith.jpg': granny_smith,
  'oranges_navel.jpg': oranges_navel,
  'lemons.jpg': lemons,
  'limes.jpg': limes,
  'strawberries.jpg': strawberries,
  'bananas.jpg': bananas,
  'blueberries.jpg': blueberries,
  'cabbage.jpg': cabbage,
  'green_grapes.jpg': green_grapes,
  'raspberries.jpg': raspberries,
  'red_grapes.jpg': red_grapes,
  'roma.jpg': roma,
  'tomato.jpg': tomato,
  'watermelon.jpg': watermelon,
  'avocado.jpg': avocado,
  'broccoli.jpg': broccoli,
  'cilantro.jpg': cilantro,
  'garlic.jpg': garlic,
  'russet.jpg': russet,
  'whiteOnion.jpg': whiteOnion,
};

export const useProduce = () => useContext(ProduceContext);

export const ProduceProvider = ({ children }) => {
  const [produceListItems, setProduceListItems] = useState([]);
  const [userCurrentOrder, setUserCurrentOrder] = useState([])
  const [totalBalance, setTotalBalance] = useState(0.00)
  const [qtyTotal, setQtyTotal] = useState()
  const [currentBalance, setCurrentBalance] = useState([])
  const [submitButtonClicked, setSubmitClicked] = useState(false)
  const [loading, setLoading] = useState(true)
  /** Shared across Navbar + inventory page; URL cannot pass setters. */
  const [inventoryUpdated, setInventoryUpdated] = useState(false)

  const fetchProduceItems = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/produce-items');

      console.log('API response:', response.data);
      console.log('Number of items fetched:', response.data.count);
      console.log('Available items:', response.data.debug?.item_names);

      const transformedItems = response.data.items.map(item => ({
        id: item.id,
        name: item.name,
        product_code: item.product_code,
        inventory: item.inventory,
        case_cost: parseFloat(item.case_cost),
        case_size: item.case_size,
        promo_price: parseFloat(item.promo_price),
        stock: item.stock,
        produce_Image: imageMapping[item.produce_image.split('/').pop()] || null,
        Qty: 1,
        totalBalance: 0.00
      }));

      setProduceListItems(transformedItems);
    } catch (error) {
      console.error('Error fetching produce items:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProduceItems();
  }, [fetchProduceItems]);

  useEffect(() => {
    if (!inventoryUpdated) return;
    fetchProduceItems();
    setInventoryUpdated(false);
  }, [inventoryUpdated, fetchProduceItems, setInventoryUpdated]);
  const updateQtyTotal = (newQty) => {
    setQtyTotal(newQty)
  }

  const updateTotalBalance = (newTotalBalance) => {
    console.log("restetting total balance ", newTotalBalance)
    if(newTotalBalance !== undefined) {
      setTotalBalance(parseFloat(newTotalBalance).toFixed(2));
    }
  }
  
  const toggleSubmitButtonClicked = () => {
    console.log("submitButtonClicked is ", submitButtonClicked)
    setSubmitClicked(!submitButtonClicked)
  }

  const updateProduceList = (newList) => {
    setProduceListItems(newList);
  };

  const updateUserOrder = (newOrder) => {
    console.log(newOrder)
    setUserCurrentOrder(newOrder);
  };

  const updateCurrentBalance = (crntBalnce) => {
    console.log(crntBalnce)
    setCurrentBalance(crntBalnce)
  }

  const getQty = (index) => {
    return userCurrentOrder[index].Qty
  }

  const clearOrder = () => {
    setUserCurrentOrder([])
  }

  return (
    <ProduceContext.Provider value={{ 
      produceListItems, 
      updateProduceList, 
      userCurrentOrder, 
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
      loading,
      inventoryUpdated,
      setInventoryUpdated,
    }}>
      {children}
    </ProduceContext.Provider>
  );
};