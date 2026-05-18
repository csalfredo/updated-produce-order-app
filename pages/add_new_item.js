import React from "react";
import { TextField, Button } from "@mui/material";

const add_new_item = ({ setAddNewItem }) => {
    return (
        <div className="flex justify-center items-center w-full">
            <div className="flex flex-col items-center justify-center bg-white rounded-lg w-8/12">
                <div className="flex items-center justify-center">
                    <h1 className="text-2xl font-bold">Add New Item</h1>
                </div>

                <form className="w-full flex flex-col items-center justify-center p-2">
                    <div className="flex flex-col items-center justify-center gap-4">
                        <div className="w-full flex flex-col items-start justify-start">
                            <p className="text-xs font-medium text-gray-700">
                                Item Name
                            </p>
                        </div>
                        <TextField variant="outlined" sx={{ width: 240 }} />
                        <div className="w-full flex flex-col items-start justify-start">
                            <p className="text-xs font-medium text-gray-700">
                                Item Price
                            </p>
                        </div>
                        <TextField variant="outlined" sx={{ width: 240 }} />
                        <div className="w-full flex flex-col items-start justify-start">
                            <p className="text-xs font-medium text-gray-700">
                                Item Quantity
                            </p>
                        </div>
                        <div className="w-full flex flex-col items-center justify-between gap-6">
                            <TextField variant="outlined" sx={{ width: 240 }} />
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ width: 240 }}
                            >
                                Add Item
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default add_new_item;
