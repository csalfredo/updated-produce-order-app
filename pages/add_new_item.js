import React, { useState } from "react";
import { TextField, Button, Alert, CircularProgress } from "@mui/material";
import { produceAPI } from "../src/components/api";

const AddNewItem = ({
    setAddNewItem,
    setInventory_Updated,
    showInventoryNotification,
}) => {
    const [name, setName] = useState("");
    const [caseCost, setCaseCost] = useState("");
    const [quantity, setQuantity] = useState("");
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const cost = parseFloat(caseCost);
        const qty = parseInt(quantity, 10);
        if (!name.trim()) {
            setError("Item name is required.");
            return;
        }
        if (Number.isNaN(cost) || cost < 0) {
            setError("Please enter a valid price.");
            return;
        }
        if (Number.isNaN(qty) || qty < 0) {
            setError("Please enter a valid quantity.");
            return;
        }

        const trimmedName = name.trim();

        try {
            setSubmitting(true);

            const existingItems = await produceAPI.getAllItems();
            const alreadyExists = existingItems.some(
                (item) =>
                    (item.name || "").trim().toLowerCase() ===
                    trimmedName.toLowerCase(),
            );

            if (alreadyExists) {
                showInventoryNotification?.(
                    "The item already exist",
                    "warning",
                );
                return;
            }

            const response = await produceAPI.createItem({
                name: trimmedName,
                case_cost: cost,
                quantity: qty,
            });

            if (response.status === 201 && response.data?.item) {
                if (setInventory_Updated) setInventory_Updated(true);
                showInventoryNotification?.(
                    "Item added successfully",
                    "success",
                );
                setAddNewItem(false);
            } else {
                setError("Unexpected response from server.");
            }
        } catch (err) {
            setError(err.message || "Failed to add item.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center w-full">
            <div className="flex flex-col items-center justify-center bg-white rounded-lg w-8/12 p-4">
                <h1 className="text-2xl font-bold mb-4">Add New Item</h1>

                {error && (
                    <Alert severity="error" sx={{ width: 240, mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <form
                    className="w-full flex flex-col items-center gap-4"
                    onSubmit={handleSubmit}
                >
                    <div className="w-full max-w-[240px]">
                        <p className="text-xs font-medium text-gray-700 mb-1">
                            Item Name
                        </p>
                        <TextField
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={submitting}
                        />
                    </div>
                    <div className="w-full max-w-[240px]">
                        <p className="text-xs font-medium text-gray-700 mb-1">
                            Item Price
                        </p>
                        <TextField
                            variant="outlined"
                            type="number"
                            fullWidth
                            value={caseCost}
                            onChange={(e) => setCaseCost(e.target.value)}
                            inputProps={{ step: "0.01", min: 0 }}
                            disabled={submitting}
                        />
                    </div>
                    <div className="w-full max-w-[240px]">
                        <p className="text-xs font-medium text-gray-700 mb-1">
                            Item Quantity
                        </p>
                        <TextField
                            variant="outlined"
                            type="number"
                            fullWidth
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            inputProps={{ step: "1", min: 0 }}
                            disabled={submitting}
                        />
                    </div>
                    <div className="w-full flex justify-center items-center max-w-[240px]">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={submitting}
                            fullWidth
                        >
                            {submitting ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                "Add Item"
                            )}
                        </Button>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default AddNewItem;
