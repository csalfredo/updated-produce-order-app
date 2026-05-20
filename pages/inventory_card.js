'use client';
import React from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const inventory_card = ({
  inventoryList,
  requestDeleteItem,
  onEditItem,
}) => {
  if (!inventoryList?.length) {
    return (
      <p className="text-center text-gray-500 py-8 w-full">
        No items to display.
      </p>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {inventoryList.map((item) => (
          <article
            key={item.id}
            className="bg-white border border-gray-200 flex flex-col rounded-lg w-full px-4 py-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-full flex flex-row items-start gap-2">
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-semibold leading-snug break-words line-clamp-2 capitalize">
                  {item.name}
                </h2>
              </div>
              <div className="flex shrink-0 gap-0.5">
                <IconButton
                  color="primary"
                  size="medium"
                  aria-label={`Edit ${item.name}`}
                  onClick={() => onEditItem?.(item)}
                  sx={{ minWidth: 44, minHeight: 44 }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  color="error"
                  size="medium"
                  aria-label={`Delete ${item.name}`}
                  onClick={() => requestDeleteItem?.(item)}
                  sx={{ minWidth: 44, minHeight: 44 }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </div>
            </div>
            <dl className="w-full mt-3 flex flex-col gap-2 text-sm">
              <div className="flex justify-between gap-2">
                <dt className="text-gray-500">Quantity</dt>
                <dd className="font-medium text-gray-900 tabular-nums">{item.quantity}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-gray-500">Price</dt>
                <dd className="font-medium text-gray-900 tabular-nums">${item.case_cost}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-gray-500">Promo</dt>
                <dd className="font-semibold text-green-700 tabular-nums">
                  ${item.promo_price}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
};

export default inventory_card;
