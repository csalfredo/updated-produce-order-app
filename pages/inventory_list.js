import React, { useEffect, useState, useCallback } from "react";
import { Drawer } from "@mui/material";
import { produceAPI } from "../src/components/api";
import { useProduce } from "../src/components/context/ProduceContext";
import { useSwitch } from "@nextui-org/react";
import {
    Stack,
    Autocomplete,
    TextField,
    Button,
    IconButton,
    MenuItem,
    Select,
    accordionSummaryClasses,
    CircularProgress,
    Pagination,
    InputAdornment,
    Snackbar,
    Alert,
} from "@mui/material";
import Snackbar1 from "@mui/material/Snackbar";
import queryString from "query-string";
import { Questrial } from "next/font/google";
import QuantitySelector from "./QuantitySelector";
import SendEmail from "./SendEmail";
import axios from "axios";
import Navbar from "../src/components/Navbar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import InventoryCard from "./inventory_card";
import useInventoryEditor from "./useInventoryEditor";
import AddNewItem from "./add_new_item";
/**
 * 


  // Fetch produce items from API
  useEffect(() => {
    const fetchProduceItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/produce-items');
        console.log('Fetched produce items:', response.data);
        setProduceItems(response.data.items || []);
      } catch (error) {
        console.error('Error fetching produce items:', error);
        setError('Failed to load produce items');
      } finally {
        setLoading(false);
      }
    };

    fetchProduceItems();
  }, []);
 */

const inventory_list = (props) => {
    const [produceItems, setProduceItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [inventory_Updated, setInventory_Updated] = useState(false);
    const [inventoryNotification, setInventoryNotification] = useState({
        open: false,
        message: "",
        severity: "success",
    });
    const { setInventoryUpdated } = useProduce();
    const [addNewItem, setAddNewItem] = useState(false);

    const showInventoryNotification = (message, severity = "success") => {
        setInventoryNotification({
            open: true,
            message,
            severity,
        });
    };

    const closeInventoryNotification = () => {
        setInventoryNotification((prev) => ({
            ...prev,
            open: false,
        }));
    };
    const loadProduceItems = useCallback(async () => {
        try {
            setLoading(true);
            const items = await produceAPI.getAllItems(); // ✅ API call here!
            setProduceItems(items);
            setFilteredItems(items);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // ✅ Use the API function from api.js
    useEffect(() => {
        loadProduceItems();
    }, [loadProduceItems]);

    useEffect(() => {
        if (inventory_Updated) {
            loadProduceItems();
            setInventory_Updated(false);
        }
    }, [inventory_Updated, loadProduceItems]);

    // Filter items based on search term
    useEffect(() => {
        if (searchTerm === "") {
            setFilteredItems(produceItems);
        } else {
            const filtered = produceItems.filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()),
            );
            setFilteredItems(filtered);
        }
        setCurrentPage(1); // Reset to first page when searching
    }, [searchTerm, produceItems]);

    const {
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
    } = useInventoryEditor({
        produceItems,
        setProduceItems,
        setInventoryUpdated,
        showInventoryNotification,
    });

    // Calculate pagination
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredItems.slice(startIndex, endIndex);

    // const handleEdit = (id) => {
    //   const item = produceItems.find((i) => i.id === id);
    //   if (!item) return;
    //   setEditingId(id);
    //   setEditCaseCost(String(item.case_cost ?? ''));
    //   setEditPromoPrice(String(item.promo_price ?? ''));
    //   setEditQuantity(String(item.quantity ?? ''));
    //   setInventoryUpdated(true);
    // };

    // const resetEditForm = () => {
    //   setEditingId(null);
    //   setEditCaseCost('');
    //   setEditPromoPrice('');
    //   setEditQuantity('');
    // };

    // const handleCancelEdit = () => {
    //   resetEditForm();
    //   setInventoryUpdated(false);
    // };

    // const handleSaveItem = async (item) => {
    //   const cost = parseFloat(editCaseCost);
    //   const promo = parseFloat(editPromoPrice);
    //   const quantity = parseInt(editQuantity);
    //   if (Number.isNaN(cost) || Number.isNaN(promo) || Number.isNaN(quantity)) {
    //     return;
    //   }
    //   setProduceItems((prev) =>
    //     prev.map((i) =>
    //       i.id === item.id ? { ...i, case_cost: cost, promo_price: promo, quantity: quantity } : i
    //     )
    //   );
    //   resetEditForm();

    //   const response = await produceAPI.updateItemById(item.id, {
    //     case_cost: cost,
    //     promo_price: promo,
    //     quantity: quantity
    //   });
    //   console.log('Updated item:', response.data);
    //   setInventoryUpdated(true);
    // };

    return (
        <div>
            <div className="hidden md:block">
                {/* TODO: DISPLAYING THE NAVBAR*/}
                <div className="mb-10">
                    <Navbar title="Inventory List" />
                </div>
                <div className="flex justify-center items-center">
                    {/* TODO: DISPLAYING THE TITLE*/}
                    <div className="">
                        <h1 className="sans-serif text-4xl font-bold">
                            Inventory List
                        </h1>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <div className="w-1/2 p-4 flex justify-between items-center gap-2">
                        <TextField
                            placeholder="Search items..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            size="small"
                            sx={{ width: "300px" }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setAddNewItem(true)}
                            sx={{
                                width: "100%",
                                height: "42px",
                                borderRadius: "10px",
                                backgroundColor: "primary.main",
                                color: "white",
                            }}
                        >
                            Add Inventory
                        </Button>
                    </div>
                </div>
                <div className="flex justify-center items-center mb-4">
                    <div className="border border-gray-200 rounded-md w-1/2">
                        <div className="flex flex-col-5 border border-black w-full">
                            <div className="flex justify-center items-center border-r border-gray-400 p-1 flex-1">
                                <p>Description</p>
                            </div>
                            <div className="flex justify-center items-center border-r border-gray-400 p-1 flex-1">
                                <p>Quantity</p>
                            </div>
                            <div className="flex justify-center items-center border-r border-gray-400 p-1 flex-1">
                                <p>Price</p>
                            </div>
                            <div className="flex justify-center items-center p-1 flex-1">
                                <p>Promo Price</p>
                            </div>
                            <div className="flex justify-center items-center p-1 flex-1 border-l border-gray-400">
                                <p>Action</p>
                            </div>
                        </div>
                        {loading && <CircularProgress />}
                        {error && <div>Error: {error}</div>}
                        <div>
                            {currentItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-row border-b border-gray-200 w-full"
                                >
                                    <div className="flex justify-center items-center border-r border-gray-400 p-2 flex-1">
                                        <p>{item.name}</p>
                                    </div>
                                    <div className="flex justify-center items-center border-r border-gray-400 p-2 flex-1">
                                        {editingId === item.id ? (
                                            <TextField
                                                label="Quantity"
                                                type="number"
                                                size="small"
                                                value={editQuantity}
                                                onChange={(e) =>
                                                    setEditQuantity(
                                                        e.target.value,
                                                    )
                                                }
                                                inputProps={{
                                                    step: "1",
                                                    min: 0,
                                                }}
                                            />
                                        ) : (
                                            <p>{item.quantity}</p>
                                        )}
                                    </div>
                                    <div className="flex justify-center items-center border-r border-gray-400 p-2 flex-1">
                                        {editingId === item.id ? (
                                            <TextField
                                                label="Price"
                                                type="number"
                                                size="small"
                                                value={editCaseCost}
                                                onChange={(e) =>
                                                    setEditCaseCost(
                                                        e.target.value,
                                                    )
                                                }
                                                inputProps={{
                                                    step: "0.01",
                                                    min: 0,
                                                }}
                                            />
                                        ) : (
                                            <p>${item.case_cost}</p>
                                        )}
                                    </div>
                                    <div className="flex justify-center items-center p-2 flex-1">
                                        {editingId === item.id ? (
                                            <TextField
                                                label="Promo"
                                                type="number"
                                                size="small"
                                                value={editPromoPrice}
                                                onChange={(e) =>
                                                    setEditPromoPrice(
                                                        e.target.value,
                                                    )
                                                }
                                                inputProps={{
                                                    step: "0.01",
                                                    min: 0,
                                                }}
                                            />
                                        ) : (
                                            <p>${item.promo_price}</p>
                                        )}
                                    </div>
                                    <div className="flex justify-center items-center p-2 flex-1 border-l border-gray-400 gap-2">
                                        {editingId === item.id ? (
                                            <>
                                                <IconButton
                                                    size="small"
                                                    color="inherit"
                                                    aria-label="Cancel edit"
                                                    onClick={handleCancelEdit}
                                                >
                                                    <CloseIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    color="primary"
                                                    aria-label="Save changes"
                                                    onClick={() =>
                                                        handleSaveItem(item)
                                                    }
                                                >
                                                    <SaveIcon fontSize="small" />
                                                </IconButton>
                                            </>
                                        ) : (
                                            <>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    sx={{
                                                        minWidth: "24px",
                                                        height: "24px",
                                                        padding: "2px",
                                                    }}
                                                    onClick={() =>
                                                        handleEdit(item)
                                                    }
                                                >
                                                    <EditIcon fontSize="small" />
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    sx={{
                                                        minWidth: "24px",
                                                        height: "24px",
                                                        padding: "2px",
                                                    }}
                                                    onClick={() =>
                                                        handleDeleteItem(item)
                                                    }
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Snackbar
                            open={inventoryNotification.open}
                            autoHideDuration={3000}
                            onClose={closeInventoryNotification}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "center",
                            }}
                        >
                            <Alert
                                onClose={closeInventoryNotification}
                                severity={inventoryNotification.severity}
                            >
                                {inventoryNotification.message}
                            </Alert>
                        </Snackbar>
                        <div className="bg-gray-100">
                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center p-2">
                                    <Pagination
                                        count={totalPages}
                                        page={currentPage}
                                        onChange={(event, page) =>
                                            setCurrentPage(page)
                                        }
                                        color="primary"
                                        showFirstButton
                                        showLastButton
                                    />
                                </div>
                            )}

                            {/* Results Summary */}
                            <div className="flex justify-center items-center pb-2">
                                <p className="text-sm text-gray-600">
                                    Showing {startIndex + 1}-
                                    {Math.min(endIndex, filteredItems.length)}{" "}
                                    of {filteredItems.length} items
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="block md:hidden space-y-4 bg-gray-100">
                <div className="mb-10">
                    <Navbar title="Inventory List" />
                </div>
                <div className="flex justify-center items-center">
                    <h1 className="text-2xl font-bold">Inventory List</h1>
                </div>
                <div className="flex justify-center items-center">
                    <TextField
                        placeholder="Search items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        size="small"
                        sx={{ width: "275px" }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div className="flex justify-center items-center w-[275px] mx-auto">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setAddNewItem(true)}
                        sx={{
                            width: "100%",
                            height: "40px",
                            borderRadius: "10px",
                            backgroundColor: "primary.main",
                            color: "white",
                        }}
                    >
                        Add Inventory
                    </Button>
                </div>
                <div className="flex justify-center items-center w-full">
                    <InventoryCard
                        inventoryList={filteredItems}
                        setInventory_Updated={setInventory_Updated}
                    />
                </div>
            </div>
            <Drawer
                anchor="top"
                open={addNewItem}
                onClose={() => setAddNewItem(false)}
                BackdropProps={{
                    sx: { backgroundColor: "rgba(0, 0, 0, 0.55)" },
                }}
                PaperProps={{
                    sx: {
                        backgroundColor: "transparent",
                        boxShadow: "none",
                    },
                }}
            >
                <AddNewItem
                    setAddNewItem={setAddNewItem}
                    setInventory_Updated={setInventory_Updated}
                />
            </Drawer>
        </div>
    );
};

export default inventory_list;
