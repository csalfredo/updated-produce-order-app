import React, { useEffect, useState, useCallback } from "react";
import { Drawer } from "@mui/material";
import { produceAPI } from "../src/components/api";
import { useProduce } from "../src/components/context/ProduceContext";
import {
    TextField,
    Button,
    IconButton,
    CircularProgress,
    Pagination,
    InputAdornment,
    Snackbar,
    Alert,
    Box,
    Typography,
} from "@mui/material";
import Navbar from "../src/components/Navbar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import InventoryCard from "./inventory_card";
import useInventoryEditor from "./useInventoryEditor";
import AddNewItem from "./add_new_item";
import EditInventoryForm from "./EditInventoryForm";
import InventoryDeleteDialog from "./InventoryDeleteDialog";
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
        requestDeleteItem,
        itemToDelete,
        cancelDeleteItem,
        confirmDeleteItem,
        deleteLoading,
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

    useEffect(() => {
        const onKeyDown = (e) => {
            if (
                e.key === "/" &&
                e.target.tagName !== "INPUT" &&
                e.target.tagName !== "TEXTAREA"
            ) {
                e.preventDefault();
                document.getElementById("inventory-search-input")?.focus();
            }
            if (e.key === "Escape") {
                setSearchTerm("");
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    const inventoryTableColDesc =
        "flex justify-start items-center border-r border-gray-400 p-2 flex-[2] min-w-0 basis-0";
    const inventoryTableColNum =
        "flex justify-end items-center border-r border-gray-400 p-2 flex-1 min-w-[4.5rem] shrink-0";
    const inventoryTableColAction =
        "flex justify-center items-center p-2 w-24 shrink-0 border-l border-gray-400 gap-1";
    const inventoryTableHeaderLabel =
        "text-sm font-medium whitespace-nowrap";
    const inventoryTableCellText =
        "w-full text-sm tabular-nums";

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
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-green-50">
            <div className="hidden md:block">
                {/* TODO: DISPLAYING THE NAVBAR*/}
                <div className="mb-10">
                    <Navbar title="Inventory" />
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
                            id="inventory-search-input"
                            placeholder="Search items..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            size="small"
                            sx={{ width: "300px" }}
                            inputProps={{ "aria-describedby": "inventory-search-hint" }}
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
                            Add item
                        </Button>
                    </div>
                </div>
                <Typography id="inventory-search-hint" variant="caption" color="text.secondary" sx={{ textAlign: "center", display: "block", mb: 2 }}>
                    Press / to focus search · Esc to clear
                </Typography>
                <div className="flex justify-center mb-4 px-4 max-w-6xl mx-auto">
                    <div className="w-full overflow-x-auto border border-gray-300 rounded-lg bg-white shadow-sm">
                        <div className="min-w-[36rem]">
                            <div className="flex flex-row border-b border-black bg-gray-50">
                                <div className={inventoryTableColDesc}>
                                    <p className={inventoryTableHeaderLabel}>
                                        Description
                                    </p>
                                </div>
                                <div className={inventoryTableColNum}>
                                    <p
                                        className={`${inventoryTableHeaderLabel} text-right`}
                                    >
                                        Quantity
                                    </p>
                                </div>
                                <div className={inventoryTableColNum}>
                                    <p
                                        className={`${inventoryTableHeaderLabel} text-right`}
                                    >
                                        Price
                                    </p>
                                </div>
                                <div className={inventoryTableColNum}>
                                    <p
                                        className={`${inventoryTableHeaderLabel} text-right`}
                                    >
                                        Promo Price
                                    </p>
                                </div>
                                <div className={inventoryTableColAction}>
                                    <p className={inventoryTableHeaderLabel}>
                                        Action
                                    </p>
                                </div>
                            </div>
                        {loading && (
                            <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                                <CircularProgress color="primary" />
                            </Box>
                        )}
                        {error && <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>}
                        {!loading && !error && currentItems.length === 0 && (
                            <Typography sx={{ p: 4, textAlign: "center", color: "text.secondary" }}>
                                {searchTerm ? "No items match your search." : "No inventory items yet."}
                            </Typography>
                        )}
                        <div>
                            {currentItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-row border-b border-gray-200 w-full"
                                >
                                    <div className={inventoryTableColDesc}>
                                        <p
                                            className="w-full truncate text-sm text-left"
                                            title={item.name}
                                        >
                                            {item.name}
                                        </p>
                                    </div>
                                    <div className={inventoryTableColNum}>
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
                                            <p className={`${inventoryTableCellText} text-right`}>{item.quantity}</p>
                                        )}
                                    </div>
                                    <div className={inventoryTableColNum}>
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
                                            <p className={`${inventoryTableCellText} text-right`}>${item.case_cost}</p>
                                        )}
                                    </div>
                                    <div className={inventoryTableColNum}>
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
                                            <p className={`${inventoryTableCellText} text-right`}>${item.promo_price}</p>
                                        )}
                                    </div>
                                    <div className={inventoryTableColAction}>
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
                                                <IconButton
                                                    color="error"
                                                    size="small"
                                                    aria-label={`Delete ${item.name}`}
                                                    onClick={() => requestDeleteItem(item)}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
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
            </div>
            <div className="block md:hidden space-y-4 pb-8">
                <div className="mb-10">
                    <Navbar title="Inventory" />
                </div>
                <div className="flex justify-center items-center">
                    <h1 className="text-2xl font-bold text-emerald-900">Inventory</h1>
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
                <div className="px-4 max-w-6xl mx-auto w-full">
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => setAddNewItem(true)}
                        sx={{ mb: 3, py: 1.25, maxWidth: 480, mx: "auto", display: "flex" }}
                    >
                        Add item
                    </Button>
                    <InventoryCard
                        inventoryList={currentItems}
                        requestDeleteItem={requestDeleteItem}
                        onEditItem={handleEdit}
                    />
                    <Drawer
                        anchor="bottom"
                        open={open}
                        onClose={() => setOpen(false)}
                        BackdropProps={{ sx: { backgroundColor: "rgba(0, 0, 0, 0.55)" } }}
                        PaperProps={{ sx: { backgroundColor: "transparent", boxShadow: "none" } }}
                    >
                        <EditInventoryForm
                            item={editingItem}
                            handleClose={() => setOpen(false)}
                            setInventory_Updated={setInventory_Updated}
                            setNotification={(msg) => showInventoryNotification(msg, 'success')}
                        />
                    </Drawer>
                    {totalPages > 1 && (
                        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={(event, page) => setCurrentPage(page)}
                                color="primary"
                                size="small"
                            />
                        </Box>
                    )}
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
                    showInventoryNotification={showInventoryNotification}
                />
            </Drawer>
            <InventoryDeleteDialog
                open={Boolean(itemToDelete)}
                itemName={itemToDelete?.name}
                onCancel={cancelDeleteItem}
                onConfirm={confirmDeleteItem}
                loading={deleteLoading}
            />
            <Snackbar
                open={inventoryNotification.open}
                autoHideDuration={3000}
                onClose={closeInventoryNotification}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={closeInventoryNotification}
                    severity={inventoryNotification.severity}
                    sx={{ width: "100%" }}
                >
                    {inventoryNotification.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default inventory_list;
